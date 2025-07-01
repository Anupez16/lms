'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// CREATE: Admin creates live class
export const createLiveClass = async (formData: {
  title: string;
  youtube_link: string;
  subject: string;
  topic: string;
  duration: number;
  scheduled_time?: string; // client field
}) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("live_classes").insert({
    title: formData.title,
    youtube_link: formData.youtube_link,
    subject: formData.subject,
    topic: formData.topic,
    duration: formData.duration,
    scheduled_at: formData.scheduled_time, // ✅ map correctly
    created_by: userId,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/user/live-classes");
  return data;
};
// FETCH: Get all live classes (for user page)
export const getLiveClasses = async () => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("live_classes")
    .select("*")
    .order("scheduled_time", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};
