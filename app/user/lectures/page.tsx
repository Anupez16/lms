"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Lecture = {
  id: string;
  title: string;
  youtube_link: string;
  subject: string;
  topic: string;
  description: string;
};

const LecturesPage = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase
        .from("video_lectures")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching lectures:", error.message);
      } else {
        setLectures(data || []);
        if (data && data.length > 0) {
          setSelectedLecture(data[0]);
        }
      }
      setLoading(false);
    };

    fetchLectures();
  }, []);

  const extractYouTubeId = (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([\w-]{11})/
    );
    return match ? match[1] : "";
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!selectedLecture) {
    return <div className="text-center mt-10 text-lg">No lectures available.</div>;
  }

  const currentVideoId = extractYouTubeId(selectedLecture.youtube_link);

  return (
    <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      {/* 📺 Video Section */}
      <div className="md:col-span-2 space-y-4">
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${currentVideoId}`}
            title={selectedLecture.title}
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        </div>

        <div className="px-2">
          <h2 className="text-2xl font-bold">{selectedLecture.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedLecture.subject} • {selectedLecture.topic}
          </p>
          <p className="mt-3 text-gray-700">{selectedLecture.description}</p>
        </div>
      </div>

      {/* 📚 Lecture List */}
      <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1 custom-scrollbar">
        <h3 className="text-lg font-semibold px-1">All Lectures</h3>
        {lectures.map((lecture) => (
          <Card
            key={lecture.id}
            onClick={() => setSelectedLecture(lecture)}
            className={`p-3 border cursor-pointer transition-all rounded-xl shadow-sm hover:shadow-md ${
              selectedLecture.id === lecture.id
                ? "bg-primary/10 border-primary"
                : "bg-white"
            }`}
          >
            <p className="font-medium text-sm">{lecture.title}</p>
            <p className="text-xs text-muted-foreground">{lecture.subject}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LecturesPage;
