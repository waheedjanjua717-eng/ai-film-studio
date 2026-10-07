# AI Film Studio v1 — Mobile-First

This is the Phase 1 starter for a persistent, zero-budget-first AI movie production system.

Architecture:
- Cloudflare Worker = browser dashboard + API
- D1 = persistent project/job state
- OpenRouter = optional text/Director worker
- GitHub Actions = optional scheduled worker later
- Video/voice workers are intentionally separated and will be added in Phase 2.

Important:
This starter does NOT generate video yet. It establishes the persistent production brain so a movie can resume across days without losing progress.

## Setup
1. Create a free Cloudflare account.
2. Create a Worker project using the files in `src/`.
3. Create a D1 database and run `schema.sql`.
4. Add the D1 binding named `DB`.
5. Deploy the Worker.
6. Open the Worker URL on your phone.
7. Create a movie project and add jobs.

OpenRouter is optional in v1. Its current free plan has free models but a daily request limit, so the system treats AI generation as a replaceable worker rather than a dependency.

Never put API keys in frontend JavaScript.
