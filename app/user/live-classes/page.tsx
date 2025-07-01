// app/user/live-classes/page.tsx
import { getLiveClasses } from "@/lib/actions/liveClass.actions";
import Link from "next/link";

const UserLiveClassesPage = async () => {
  const classes = await getLiveClasses();

  return (
    <section className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Upcoming Live Classes</h1>

      {classes.length === 0 && <p>No live classes scheduled yet.</p>}

      {classes.map((cls) => (
        <div
          key={cls.id}
          className="border p-4 rounded-xl shadow-sm space-y-2 bg-white"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{cls.title}</h2>
            <span className="text-sm text-gray-500">
              {new Date(cls.scheduled_time).toLocaleString()}
            </span>
          </div>

          <p className="text-muted-foreground">{cls.topic}</p>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Subject: {cls.subject}</span>
            <span>Duration: {cls.duration} min</span>
          </div>

          <Link
            href={cls.youtube_link}
            target="_blank"
            className="text-blue-600 underline text-sm"
          >
            Join Live Class
          </Link>
        </div>
      ))}
    </section>
  );
};

export default UserLiveClassesPage;
