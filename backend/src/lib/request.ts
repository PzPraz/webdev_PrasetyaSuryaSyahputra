import { NextRequest } from "next/server";
import { verifyToken } from "./auth";

export function getBearerToken(req: NextRequest): string | null {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  const [type, token] = auth.split(" ");
  if (type?.toLowerCase() !== "bearer" || !token) return null;
  return token;
}

export function getAuthUserId(req: NextRequest): string | null {
  const token = getBearerToken(req);
  if (!token) return null;
  try {
    const payload = verifyToken(token);
    return payload.userId;
  } catch {
    return null;
  }
}
