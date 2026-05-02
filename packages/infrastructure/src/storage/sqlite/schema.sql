-- This schema exists to document the persistence shape expected by the SQLite adapter.
-- It is intentionally minimal so the adapter can evolve behind the same repository boundary.
-- Migrations are deferred until a real SQLite driver is introduced.

CREATE TABLE IF NOT EXISTS progress_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  payload JSON NOT NULL,
  timestamp INTEGER NOT NULL
);
