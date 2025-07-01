'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const markLectureAsWatched = async (lectureId: string) => {
  const { userId } = await auth(); // Clerk user ID
  if (!userId) throw new Error("Unauthorized");

  const supabase = createSupabaseClient();

  // Prevent duplicate entries
  const { data: existing } = await supabase
    .from("video_progress")
    .select("id")
    .eq("user_id", userId)
    .eq("lecture_id", lectureId)
    .single();

  if (existing) {
    return { status: "already_tracked" };
  }

  // Insert new watch record
  const { error } = await supabase.from("video_progress").insert({
    user_id: userId,
    lecture_id: lectureId,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/user/progress");
  return { status: "tracked" };
};

export const getVideoProgress = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("video_progress")
    .select("lecture_id")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data?.map((item) => item.lecture_id) || [];
};

export const getProgressPercentage = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { count: watchedCount } = await supabase
    .from("video_progress")
    .select("lecture_id", { count: "exact" })
    .eq("user_id", userId);

  const { count: totalCount } = await supabase
    .from("video_lectures")
    .select("id", { count: "exact" });

  if (typeof watchedCount !== "number" || typeof totalCount !== "number" || totalCount === 0) {
    return 0;
  }

  return Math.round((watchedCount / totalCount) * 100);
};

export const getQuizAttempts = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { count, error } = await supabase
    .from("quiz_attempts")
    .select("id", { count: "exact" })
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return count || 0;
};
