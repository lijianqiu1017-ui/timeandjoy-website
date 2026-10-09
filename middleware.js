export const config = {
  matcher: [
    "/",
    "/index.html",
    "/robots.txt",
    "/sitemap.xml",
    "/(.*)",
  ],
};

const APEX_HOST = "timeandjoy.com";
const WWW_HOST = "www.timeandjoy.com";
const VERIFY_PATHS = new Set(["/", "/index.html", "/robots.txt", "/sitemap.xml"]);

/**
 * Vercel Edge Runtime Middleware (STANDALONE — does NOT require Next.js).
 *
 * Executes BEFORE Vercel's UI-level "Domain Redirect apex → www" rule, so we
 * can short-circuit 307 for the 4 crawler/verifier-critical paths and return
 * the www body DIRECTLY under the apex host with HTTP 200. This lets Baidu /
 * Toutiao HTML-tag verifiers read the static meta tags without following any
 * 3xx redirects (they refuse to follow 3xx and would otherwise fail instantly).
 *
 * All other apex paths (/projects.html, /studio.html, /contact.html,
 * /project-detail.html?slug=..., static assets) still return HTTP 307 → www,
 * so end-users see the canonical www host, and there is zero risk of
 * dual-content SEO ambiguity (only the 4 crawler-only files are co-hosted).
 *
 * @param {Request} req  Standard Fetch API Request (Vercel Edge Runtime)
 * @param {object}  ctx  Vercel Edge execution context (waitUntil / event — unused)
 */
export default async function (req) {
  try {
    const url = new URL(req.url);
    const host = (url.host || "").toLowerCase().split(":")[0];
    const method = (req.method || "GET").toUpperCase();

    // 只拦截 apex (timeandjoy.com) 请求。www 或其它 host 直接走原链路。
    if (host !== APEX_HOST) {
      return fetch(req);
    }

    // 只处理 GET / HEAD。其它方法透传。
    if (method !== "GET" && method !== "HEAD") {
      return fetch(req);
    }

    const pathname = normalizePath(url.pathname);

    if (VERIFY_PATHS.has(pathname)) {
      return proxyFromWww(req, url, pathname);
    }

    // 非验证/爬虫路径：307→www，保持地址栏跳转（SEO 安全，无双内容歧义）
    return redirect307ToWww(url);
  } catch (_err) {
    // 任何异常 → fallback 307→www，不影响用户访问
    try {
      return redirect307ToWww(new URL(req.url));
    } catch (_) {
      return fetch(req);
    }
  }
}

/**
 * 把 apex 的 4 条验证路径请求代理到 www，原样返回 www 的 body（HTTP 200）。
 * 验证器/爬虫收到 200 + 正确 head，直接读到 bytedance/baidu 两个 meta，0 重定向。
 */
async function proxyFromWww(req, apexUrl, pathname) {
  const target = new URL(pathname, `https://${WWW_HOST}`);
  if (apexUrl.search) target.search = apexUrl.search;

  const forwardedHeaders = new Headers();
  const hopByHop = new Set([
    "connection","keep-alive","proxy-authenticate","proxy-authorization",
    "te","trailers","transfer-encoding","upgrade","host","content-length",
  ]);
  for (const [k, v] of req.headers.entries()) {
    if (!hopByHop.has(k.toLowerCase())) forwardedHeaders.set(k, v);
  }
  forwardedHeaders.set("Host", WWW_HOST);
  forwardedHeaders.set("Accept-Encoding", "identity");
  forwardedHeaders.set("Cache-Control", "no-cache,no-store,max-age=0");
  if (!forwardedHeaders.has("User-Agent")) forwardedHeaders.set("User-Agent", "Vercel-Middleware-Verify");

  const upstream = await fetch(target.toString(), {
    method: req.method,
    headers: forwardedHeaders,
    redirect: "manual",
    cf: { cacheTtl: 15, cacheEverything: false },
  });

  if (upstream.status !== 200) {
    return redirect307ToWww(apexUrl);
  }

  const respHeaders = new Headers();
  const passThrough = new Set([
    "content-type","content-length","cache-control","etag","last-modified",
    "vary","x-robots-tag","access-control-allow-origin",
  ]);
  for (const [k, v] of upstream.headers.entries()) {
    if (passThrough.has(k.toLowerCase())) respHeaders.set(k, v);
  }
  respHeaders.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
  respHeaders.set("X-TJ-Verify-Bypass", "apex-200-proxied-via-edge-middleware");

  return new Response(upstream.body, {
    status: 200,
    statusText: "OK",
    headers: respHeaders,
  });
}

function redirect307ToWww(url) {
  const t = new URL(url.pathname, `https://${WWW_HOST}`);
  if (url.search) t.search = url.search;
  if (url.hash) t.hash = url.hash;
  return Response.redirect(t.toString(), 307);
}

/** Vercel sometimes passes "" or undefined pathnames on root; normalize to "/" */
function normalizePath(p) {
  if (!p) return "/";
  if (p === "/index" || p === "") return "/";
  return p;
}
