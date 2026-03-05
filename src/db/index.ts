import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import * as schema from "./schema";

// We create a "global" variable to hold our client
// This is a common pattern to persist the connection across hot-reloads
const globalForDb = globalThis as typeof globalThis & { client?: Client };

// Check if TURSO_DATABASE_URL is present in .env; throw an error if it isn't
const url = process.env.TURSO_DATABASE_URL;
if (!url) {
  throw new Error("TURSO_DATABASE_URL is missing from .env");
}

export const client =
  globalForDb.client ||
  createClient({
    url: url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

// If we aren't in production, save the client to the global object
if (process.env.NODE_ENV !== "production") {
  globalForDb.client = client;
}

export const db = drizzle(client, { schema });
