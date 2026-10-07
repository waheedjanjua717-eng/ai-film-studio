CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'English',
  genre TEXT NOT NULL DEFAULT 'Cinematic',
  target_minutes INTEGER NOT NULL DEFAULT 60,
  story_idea TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'planning',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  type TEXT NOT NULL,
  scene_number INTEGER,
  status TEXT NOT NULL DEFAULT 'queued',
  attempts INTEGER NOT NULL DEFAULT 0,
  payload TEXT NOT NULL DEFAULT '{}',
  result TEXT NOT NULL DEFAULT '{}',
  error TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id)
);

CREATE INDEX IF NOT EXISTS idx_jobs_project_status
ON jobs(project_id, status);

CREATE INDEX IF NOT EXISTS idx_jobs_status
ON jobs(status);
