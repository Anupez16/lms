// app/admin/analytics/page.tsx
import { createSupabaseClient } from "@/lib/supabase";

type Stats = {
  totalUsers: number;
  totalLectures: number;
  totalLectureViews: number;
  totalQuizzes: number;
  totalQuizAttempts: number;
};

const fetchAnalytics = async (): Promise<Stats> => {
  const supabase = createSupabaseClient();

  // Total users count
  const { count: totalUsers } = await supabase
    .from("users") // replace with your users table name if different
    .select("id", { count: "exact", head: true });

  // Total lectures count
  const { count: totalLectures } = await supabase
    .from("video_lectures")
    .select("id", { count: "exact", head: true });

  // Total lecture views count
  const { count: totalLectureViews } = await supabase
    .from("video_progress")
    .select("id", { count: "exact", head: true });

  // Total quizzes count
  const { count: totalQuizzes } = await supabase
    .from("quizzes")
    .select("id", { count: "exact", head: true });

  // Total quiz attempts count
  const { count: totalQuizAttempts } = await supabase
    .from("quiz_attempts")
    .select("id", { count: "exact", head: true });

  return {
    totalUsers: totalUsers ?? 0,
    totalLectures: totalLectures ?? 0,
    totalLectureViews: totalLectureViews ?? 0,
    totalQuizzes: totalQuizzes ?? 0,
    totalQuizAttempts: totalQuizAttempts ?? 0,
  };
};

export default async function AdminAnalyticsPage() {
  const stats = await fetchAnalytics();

  return (
    <main className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Admin Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="border rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Total Lectures</h2>
          <p className="text-3xl font-bold">{stats.totalLectures}</p>
        </div>

        <div className="border rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Total Lecture Views</h2>
          <p className="text-3xl font-bold">{stats.totalLectureViews}</p>
        </div>

        <div className="border rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Total Quizzes</h2>
          <p className="text-3xl font-bold">{stats.totalQuizzes}</p>
        </div>

        <div className="border rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Total Quiz Attempts</h2>
          <p className="text-3xl font-bold">{stats.totalQuizAttempts}</p>
        </div>
      </div>
    </main>
  );
}
