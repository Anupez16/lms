'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const createNotification = async ({
  title,
  message,
  target_user_id,
}: {
  title: string;
  message: string;
  target_user_id?: string | null;
}) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { error } = await supabase.from("notifications").insert({
    title,
    message,
    target_user_id: target_user_id || null,
    created_by: userId,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/user/notifications");
};
