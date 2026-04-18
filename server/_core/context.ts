import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { jwtVerify } from "jose";
import { ENV } from "./env";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

// Synthetic admin user for studio password sessions
const STUDIO_ADMIN_USER: User = {
  id: 0,
  openId: "studio-owner",
  name: "Owner",
  email: null,
  loginMethod: "studio-password",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

async function checkStudioSession(req: CreateExpressContextOptions["req"]): Promise<User | null> {
  try {
    const cookies = req.cookies as Record<string, string>;
    const token = cookies["studio_session"];
    if (!token) return null;
    const secret = new TextEncoder().encode(ENV.cookieSecret || "studio-secret");
    const { payload } = await jwtVerify(token, secret);
    if (payload.studio && payload.role === "admin") {
      return STUDIO_ADMIN_USER;
    }
    return null;
  } catch {
    return null;
  }
}

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  // If no Manus OAuth user, check for studio password session
  if (!user) {
    user = await checkStudioSession(opts.req);
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
