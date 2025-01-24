"use server";

import { cookies } from "next/headers";

export async function getSessionCookie() {
  const cookieStore = await cookies();
  const SESSION_COOKIE = process.env.SESSION_COOKIE ? process.env.SESSION_COOKIE : "";
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;

  return sessionCookie;
}
