Kalloori Kalai Thiruvizha - College Event Registration Portal
Manbumigu Dr. Puratchi Thalaivar M.G.R. Govt. Arts and Science College, Kattumannarkoil

FILES
  index.html   page structure
  style.css    all styling
  app.js       all logic (events, staff, registration, validation, Local Storage, backend calls)
  config.js    backend address and public key
  logo.png, emblem.png
  supabase/setup.sql   database setup, run once

OPEN THE PROJECT
  Unzip the folder and open index.html in any browser. No install needed.

DATA STORAGE
  With a backend (config.js filled and setup.sql run): registrations are saved in the Supabase
  database, so every student and coordinator sees the same seat counts. View the data in
  Supabase > Table Editor > kkt_registrations.
  Without a backend, or if the database is not set up yet: the page still works and keeps
  registrations in Local Storage on that device only.

BACKEND SETUP (one time)
  1. Supabase dashboard > SQL Editor > New query.
  2. Paste everything from supabase/setup.sql and press Run.
  3. Open the page again. The footer then reads "Your registrations are saved online."

CHANGE EVENTS
  Events are listed at the top of app.js (EVENTS). If you change an event's date, seats or
  cancel rule, change the same event in supabase/setup.sql and run that file again.
