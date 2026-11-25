export default async function handler(req, res) {
  try {
    const p = req.query.p || "";
    const qs = new URLSearchParams(req.query);
    qs.delete("p");
    const query = qs.toString();
    const target =
      "https://graph.facebook.com/" + p + (query ? "?" + query : "");

    const init = { method: req.method, headers: {} };
    if (req.method !== "GET" && req.method !== "HEAD") {
      init.headers["content-type"] =
        req.headers["content-type"] || "application/x-www-form-urlencoded";
      init.body =
        typeof req.body === "string"
          ? req.body
          : new URLSearchParams(req.body || {}).toString();
    }

    const r = await fetch(target, init);
    const text = await r.text();
    res
      .status(r.status)
      .setHeader("content-type", r.headers.get("content-type") || "application/json")
      .send(text);
  } catch (e) {
    res.status(502).json({ relay_error: String(e) });
  }
}
