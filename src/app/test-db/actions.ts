import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addUser(formData: FormData) {
  "use server";

  const username = formData.get("username") as string;

  if (!username || username.trim() === "") {
    throw new Error("Username is required");
  }

  await db.insert(users).values({ username: username.trim() });
  revalidatePath("/test-db");
}

export async function deleteUser(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("ID is required");
  }

  await db.delete(users).where(eq(users.id, parseInt(id)));
  revalidatePath("/test-db");
}
