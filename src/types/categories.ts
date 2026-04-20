import { Category } from "@/db/schema";

export type CategoryBrief = Pick<Category, "name" | "slug" | "id">;
