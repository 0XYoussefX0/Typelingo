"use server";

import { revalidateTag } from "next/cache";

export async function invalidateCache(cacheKey: string) {
  revalidateTag(cacheKey);
}
