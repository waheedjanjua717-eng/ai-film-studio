export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/projects" && request.method === "GET") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM projects ORDER BY updated_at DESC"
      ).all();
      return json(results);
    }

    if (url.pathname === "/api/projects" && request.method === "POST") {
      const body = await request.json();
      const id = crypto.randomUUID();
      const now = new Date().toISOString();

      await env.DB.prepare(`
        INSERT INTO projects
        (id,title,language,genre,target_minutes,story_idea,status,created_at,updated_at)
        VALUES (?,?,?,?,?,?,?,?,?)
      `).bind(
        id,
        body.title || "Untitled Movie",
        body.language || "English",
        body.genre || "Cinematic",
        Number(body.target_minutes || 60),
        body.story_idea || "",
        "planning",
        now,
        now
      ).run();

      return json({ ok: true, id });
    }

    const jobMatch = url.pathname.match(/^\/api\/projects\/([^/]+)\/jobs$/);
    if (jobMatch && request.method === "GET") {
      const projectId = jobMatch[1];
      const { results } = await env.DB.prepare(
        "SELECT * FROM jobs WHERE project_id=? ORDER BY created_at ASC"
      ).bind(projectId).all();
      return json(results);
    }

    if (jobMatch && request.method === "POST") {
      const projectId = jobMatch[1];
      const body = await request.json();
      const id = crypto.randomUUID();
      const now = new Date().toISOString();

      await env.DB.prepare(`
        INSERT INTO jobs
        (id,project_id,type,scene_number,status,attempts,payload,result,error,created_at,updated_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
      `).bind(
        id,
        projectId,
        body.type || "scene_plan",
        body.scene_number || null,
        "queued",
        0,
        JSON.stringify(body.payload || {}),
        "{}",
        "",
        now,
        now
      ).run();

      await env.DB.prepare(
        "UPDATE projects SET updated_at=? WHERE id=?"
      ).bind(now, projectId).run();

      return json({ ok: true, id });
    }

    return env.ASSETS.fetch(request);
  }
};

function json(data, status=200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {"content-type":"application/json;charset=UTF-8"}
  });
}
