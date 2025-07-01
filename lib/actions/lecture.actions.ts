'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const createLecture = async ({
  title,
  youtube_link,
  subject,
  topic,
  description,
}: {
  title: string;
  youtube_link: string;
  subject: string;
  topic: string;
  description: string;
}) => {
  const { userId } = await auth(); // Clerk user ID is text like 'user_abc'
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("video_lectures").insert({
    title,
    youtube_link,
    subject,
    topic,
    description,
    created_by: userId?.toString() || '',
  });

  if (error) {
    console.error("❌ Supabase insert error:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/user/lectures");
  return data;
};
