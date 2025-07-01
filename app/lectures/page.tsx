"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Lecture = {
  id: string;
  title: string;
  subject: string;
  youtube_url: string;
  created_at: string;
};

export default function LecturesPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    const fetchLectures = async () => {
      const { data, error } = await supabase
        .from("lectures")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("❌ Error fetching lectures:", error);
      else setLectures(data);
    };

    fetchLectures();
  }, []);

  // Group by subject
  const grouped = lectures.reduce<Record<string, Lecture[]>>((acc, lecture) => {
    if (!acc[lecture.subject]) acc[lecture.subject] = [];
    acc[lecture.subject].push(lecture);
    return acc;
  }, {});

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 gap-6 min-h-[75vh]">
      {/* LEFT SIDE: Video Player */}
      <div className="w-full md:w-2/3">
        {selectedLecture ? (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeID(selectedLecture.youtube_url)}`}
              className="w-full h-full rounded-lg border"
              allowFullScreen
            />
            <h2 className="text-xl font-semibold mt-2">{selectedLecture.title}</h2>
          </div>
        ) : (
          <div className="text-gray-500 text-center border rounded-md p-12 h-full flex items-center justify-center">
            Select a lecture to start watching
          </div>
        )}
      </div>

      {/* RIGHT SIDE: Join Live + Lecture List */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        {/* 🔴 Join Live Class - Small box */}
        <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded">
          <h3 className="font-semibold text-lg mb-1">🔴 Join Live Class</h3>
          <p className="text-sm text-gray-700 mb-2">Next session: Monday @ 5PM</p>
          <a
            href="https://meet.google.com/"
            target="_blank"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            Join Now
          </a>
        </div>

        {/* 📚 Recorded Lectures - Fills remaining space */}
        <div className="bg-white border p-4 rounded shadow-sm flex-1 overflow-y-auto">
          <h3 className="font-semibold text-lg mb-2">📚 Recorded Lectures</h3>

          {Object.entries(grouped).length === 0 ? (
            <p className="text-gray-500 text-sm">No lectures yet. Check back soon!</p>
          ) : (
            Object.entries(grouped).map(([subject, items]) => (
              <div key={subject} className="mb-4">
                <h4 className="text-md font-medium text-gray-800 mb-1">{subject}</h4>
                <ul className="space-y-1">
                  {items.map((lec) => (
                    <li key={lec.id}>
                      <button
                        onClick={() => setSelectedLecture(lec)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {lec.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// 🎯 Extracts YouTube video ID from a full URL
function getYouTubeID(url: string): string {
  try {
    const urlObj = new URL(url);
    const id = urlObj.searchParams.get("v");
    return id || "";
  } catch {
    return "";
  }
}