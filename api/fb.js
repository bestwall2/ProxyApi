export const config = { runtime: "edge" };

export default async function handler(req) {
  const u = new URL(req.url);
  const path = u.searchParams.get("p") || "";
  u.searchParams.delete("p");
  const target = "https://graph.facebook.com/" + path + (u.search || "");
  const init = { method: req.method, headers: {} };
  const ct = req.headers.get("content-type");
  if (ct) init.headers["content-type"] = ct;
  if (req.method !== "GET" && req.method !== "HEAD") init.body = await req.text();
  return fetch(target, init);
}
