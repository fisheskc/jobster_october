"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function setUserPassword(userId: string, newPassword: string) {
  try {
    const client = await clerkClient();

    await client.users.updateUser(userId, {
      password: newPassword,
    });

    return { success: true };
  } catch (err: any) {
    console.error("PASSWORD UPDATE ERROR:", err);
    return { success: false, error: err.message };
  }
}
