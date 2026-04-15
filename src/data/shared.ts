/*
 * This file is for general functions that involve database reads etc.
 */

import "server-only";
import { auth } from "@clerk/nextjs/server";

export async function checkAuth() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}
