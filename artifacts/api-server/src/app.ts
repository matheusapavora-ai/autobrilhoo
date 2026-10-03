import express, {
  type ErrorRequestHandler,
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 120;
const MAX_TRACKED_CLIENTS = 5000;
const requestWindows = new Map<string, { count: number; resetAt: number }>();
const mutatingMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);
let lastRateLimitSweep = 0;

const app: Express = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use((_req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; base-uri 'none'; object-src 'none'; form-action 'none'; frame-ancestors 'none'",
  );
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

function pruneRequestWindows(now: number) {
  for (const [client, window] of requestWindows) {
    if (window.resetAt <= now) requestWindows.delete(client);
  }
  while (requestWindows.size >= MAX_TRACKED_CLIENTS) {
    const oldestClient = requestWindows.keys().next().value;
    if (oldestClient === undefined) break;
    requestWindows.delete(oldestClient);
  }
  lastRateLimitSweep = now;
}

function rateLimitApi(req: Request, res: Response, next: NextFunction) {
  if (req.path === "/healthz" || req.method === "OPTIONS") {
    next();
    return;
  }

  const now = Date.now();
  if (now - lastRateLimitSweep >= 60_000) {
    pruneRequestWindows(now);
  }

  const client = req.ip || req.socket.remoteAddress || "unknown";
  let window = requestWindows.get(client);

  if (!window || window.resetAt <= now) {
    if (!window && requestWindows.size >= MAX_TRACKED_CLIENTS) {
      pruneRequestWindows(now);
    }
    window = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    requestWindows.set(client, window);
  }

  window.count += 1;
  const resetInSeconds = Math.max(1, Math.ceil((window.resetAt - now) / 1000));
  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - window.count);
  res.setHeader("RateLimit-Policy", `${RATE_LIMIT_MAX_REQUESTS};w=900`);
  res.setHeader("RateLimit-Limit", RATE_LIMIT_MAX_REQUESTS);
  res.setHeader("RateLimit-Remaining", remaining);
  res.setHeader("RateLimit-Reset", resetInSeconds);

  if (window.count > RATE_LIMIT_MAX_REQUESTS) {
    res.setHeader("Retry-After", resetInSeconds);
    req.log.warn({ path: req.path }, "API request rate limit exceeded");
    res.status(429).json({ error: "Muitas solicitações. Tente novamente em alguns minutos." });
    return;
  }

  next();
}

function getRequestOrigin(req: Request): string | undefined {
  const source = req.get("origin") ?? req.get("referer");
  if (!source) return undefined;
  try {
    return new URL(source).origin;
  } catch {
    return undefined;
  }
}

function requireSameOriginForMutations(req: Request, res: Response, next: NextFunction) {
  if (!mutatingMethods.has(req.method)) {
    next();
    return;
  }

  const requestOrigin = getRequestOrigin(req);
  const expectedOrigin = `${req.protocol}://${req.get("host")}`;
  if (!requestOrigin || requestOrigin !== expectedOrigin) {
    req.log.warn({ method: req.method, path: req.path }, "Cross-origin API mutation rejected");
    res.status(403).json({ error: "Requisição de outra origem bloqueada." });
    return;
  }

  next();
}

app.use("/api", rateLimitApi);
app.use("/api", requireSameOriginForMutations);
app.use("/api", express.json({ limit: "16kb", strict: true }));
app.use(
  "/api",
  express.urlencoded({ extended: false, limit: "16kb", parameterLimit: 50 }),
);

// Artifact-routed clients use the same origin; cross-origin API access is not enabled.
app.use("/api", router);
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

const apiErrorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  const errorWithStatus = error as { status?: unknown; statusCode?: unknown };
  const candidateStatus = Number(errorWithStatus?.status ?? errorWithStatus?.statusCode);
  const statusCode =
    candidateStatus === 400 || candidateStatus === 413 ? candidateStatus : 500;
  req.log.error({ path: req.path, statusCode }, "API request failed");
  const message =
    statusCode === 413
      ? "Payload too large"
      : statusCode === 400
        ? "Invalid request"
        : "Internal server error";
  res.status(statusCode).json({ error: message });
};
app.use(apiErrorHandler);

export default app;