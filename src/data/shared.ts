/*
 * This file is for general functions that involve database reads etc.
 */

import "server-only";
import { auth } from "@clerk/nextjs/server";
import { cache } from "react";

export const checkAuth = cache(async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
});
