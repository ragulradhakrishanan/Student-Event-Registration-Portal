-- Kalloori Kalai Thiruvizha event portal: database setup.
-- Run this once in Supabase: Dashboard > SQL Editor > New query > paste > Run.
-- All names start with kkt_ so they do not touch any other tables in the project.

create table if not exists public.kkt_events (
  id text primary key,
  title text not null,
  coordinator text,
  capacity int not null default 0,
  pre_registered int not null default 0,
  starts_at timestamptz not null,
  cancellable boolean not null default true,
  cancel_before_hours int not null default 0
);

create table if not exists public.kkt_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id text not null references public.kkt_events(id) on delete cascade,
  name text not null,
  email text not null,
  roll text not null,
  dept text not null,
  year text not null,
  created_at timestamptz not null default now(),
  unique (event_id, email),
  unique (event_id, roll)
);
create index if not exists kkt_registrations_email_idx on public.kkt_registrations (email);

-- Nobody can read or write the tables directly. The site only uses the functions below.
alter table public.kkt_events enable row level security;
alter table public.kkt_registrations enable row level security;
revoke all on public.kkt_events, public.kkt_registrations from anon, authenticated;

-- Seat counts for every event (no personal data).
create or replace function public.kkt_get_event_counts()
returns table(event_id text, taken int) language sql security definer set search_path = public stable as $$
  select e.id, (e.pre_registered + count(r.id))::int
  from public.kkt_events e left join public.kkt_registrations r on r.event_id = e.id
  group by e.id, e.pre_registered;
$$;

-- Register a student. Checks the details, duplicates, the 3 event limit and the seat limit.
create or replace function public.kkt_register_event(p_event_id text, p_name text, p_email text, p_roll text, p_dept text, p_year text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  ev public.kkt_events;
  v_email text := lower(trim(coalesce(p_email, '')));
  v_roll text := upper(trim(coalesce(p_roll, '')));
  v_name text := trim(coalesce(p_name, ''));
  taken int;
  v_id uuid;
begin
  if length(v_name) < 2 or length(v_name) > 80 then return jsonb_build_object('ok', false, 'error', 'invalid_name'); end if;
  if v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$' or length(v_email) > 120 then return jsonb_build_object('ok', false, 'error', 'invalid_email'); end if;
  if length(v_roll) < 1 or length(v_roll) > 30 then return jsonb_build_object('ok', false, 'error', 'invalid_roll'); end if;
  if length(trim(coalesce(p_dept, ''))) = 0 or length(trim(coalesce(p_year, ''))) = 0 then return jsonb_build_object('ok', false, 'error', 'invalid_fields'); end if;
  select * into ev from public.kkt_events where id = p_event_id for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_event'); end if;
  if ev.starts_at <= now() then return jsonb_build_object('ok', false, 'error', 'closed'); end if;
  if exists (select 1 from public.kkt_registrations where event_id = p_event_id and (email = v_email or roll = v_roll)) then
    return jsonb_build_object('ok', false, 'error', 'duplicate');
  end if;
  if (select count(*) from public.kkt_registrations where email = v_email) >= 3 then
    return jsonb_build_object('ok', false, 'error', 'limit');
  end if;
  if ev.capacity > 0 then
    select count(*) into taken from public.kkt_registrations where event_id = p_event_id;
    if ev.pre_registered + taken >= ev.capacity then return jsonb_build_object('ok', false, 'error', 'full'); end if;
  end if;
  insert into public.kkt_registrations(event_id, name, email, roll, dept, year)
  values (p_event_id, v_name, v_email, v_roll, trim(p_dept), trim(p_year)) returning id into v_id;
  return jsonb_build_object('ok', true, 'id', v_id);
end $$;

-- The registrations of one email address (for the My registrations tab).
create or replace function public.kkt_my_registrations(p_email text)
returns table(id uuid, event_id text, name text, roll text, dept text, year text, created_at timestamptz)
language sql security definer set search_path = public stable as $$
  select r.id, r.event_id, r.name, r.roll, r.dept, r.year, r.created_at
  from public.kkt_registrations r
  where r.email = lower(trim(coalesce(p_email, ''))) order by r.created_at;
$$;

-- Cancel a registration, only if the event allows it and the deadline has not passed.
create or replace function public.kkt_cancel_registration(p_id uuid, p_email text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare ev public.kkt_events; reg public.kkt_registrations;
begin
  select * into reg from public.kkt_registrations where id = p_id and email = lower(trim(coalesce(p_email, '')));
  if not found then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  select * into ev from public.kkt_events where id = reg.event_id;
  if not ev.cancellable then return jsonb_build_object('ok', false, 'error', 'not_allowed'); end if;
  if now() >= ev.starts_at - make_interval(hours => ev.cancel_before_hours) then return jsonb_build_object('ok', false, 'error', 'too_late'); end if;
  delete from public.kkt_registrations where id = p_id;
  return jsonb_build_object('ok', true);
end $$;

revoke all on function public.kkt_get_event_counts(), public.kkt_register_event(text,text,text,text,text,text), public.kkt_my_registrations(text), public.kkt_cancel_registration(uuid,text) from public;
grant execute on function public.kkt_get_event_counts(), public.kkt_register_event(text,text,text,text,text,text), public.kkt_my_registrations(text), public.kkt_cancel_registration(uuid,text) to anon, authenticated;

-- The 18 events (same ids as in app.js). Safe to run again: existing rows are updated.
insert into public.kkt_events(id, title, coordinator, capacity, pre_registered, starts_at, cancellable, cancel_before_hours) values
('k1','Painting and Drawing','Mrs. K. Yogalakshmi',30,0,'2026-11-02 10:00:00+05:30',true,24),
('k2','Lyrics Writing with Tune','Dr. K. Chitrarasu',20,0,'2026-11-02 14:00:00+05:30',true,24),
('k3','Poetry Writing','Dr. K. Chitrarasu',40,0,'2026-11-03 10:00:00+05:30',true,24),
('k4','Short Story Writing','Dr. K. Chitrarasu',40,0,'2026-11-03 11:30:00+05:30',true,24),
('k5','Essay Writing','Dr. R. Saravanan',40,0,'2026-11-03 14:00:00+05:30',true,12),
('k6','Solo Singing','Mr. B. Nagarajan',25,0,'2026-11-04 10:00:00+05:30',true,24),
('k7','Instrumental Music','Mr. R. Ramachandran',15,0,'2026-11-04 13:30:00+05:30',true,24),
('k8','Group Music: Western and Traditional','Dr. N. Rajkumar',12,0,'2026-11-04 15:00:00+05:30',true,24),
('k9','Folk Dance and Traditional Arts','Dr. G. Jothi',30,0,'2026-11-05 10:00:00+05:30',true,24),
('k10','Drama','Dr. S. Subbulakshmi',20,0,'2026-11-05 14:00:00+05:30',true,24),
('k11','Oratorical Contest','Dr. K. Chitrarasu',40,0,'2026-11-06 10:00:00+05:30',true,12),
('k12','Budget Battle','Dr. M. Devanathan',24,0,'2026-11-06 13:00:00+05:30',true,24),
('k13','Stand-up Comedy','Dr. N. Subalakshmi',15,0,'2026-11-06 15:00:00+05:30',true,12),
('k14','Monologue','Dr. R. Saravanan',15,0,'2026-11-06 16:00:00+05:30',true,12),
('k15','Eco Creative Project Display','Dr. J. Boobalan',20,0,'2026-11-07 10:00:00+05:30',true,24),
('k16','Treasure Hunt','Mr. D. Chenthil Kumar',60,0,'2026-11-07 11:00:00+05:30',true,12),
('k17','Tech-Creative Showcase','Mr. D. Chenthil Kumar',25,0,'2026-11-07 13:00:00+05:30',true,24),
('k18','Silambam and Martial Arts Show','Dr. R. Saravanan',12,0,'2026-11-07 15:00:00+05:30',true,12)
on conflict (id) do update set
  title = excluded.title, coordinator = excluded.coordinator, capacity = excluded.capacity,
  pre_registered = excluded.pre_registered, starts_at = excluded.starts_at,
  cancellable = excluded.cancellable, cancel_before_hours = excluded.cancel_before_hours;
