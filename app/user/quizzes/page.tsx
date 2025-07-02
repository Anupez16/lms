'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Quiz {
  id: string;
  title: string;
  subject: string;
  topic: string;
  created_at: string;
}

const UserQuizList = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all quizzes from Supabase on mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase.from('quizzes').select('*');

      if (error) {
        console.error('Error fetching quizzes:', error.message);
      } else {
        setQuizzes(data || []);
      }

      setLoading(false);
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading quizzes...</div>;
  }

  if (quizzes.length === 0) {
    return <div className="text-center mt-10 text-lg">No quizzes available.</div>;
  }

  return (
    <section className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">Available Quizzes</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="p-3 flex flex-col justify-between h-36 rounded-xl shadow-sm hover:shadow-md transition"
          >
            {/* Quiz title and subject/topic */}
            <div className="flex-1">
              <h2 className="text-sm font-semibold truncate">{quiz.title}</h2>
              <p className="text-xs text-muted-foreground truncate">
                {quiz.subject} • {quiz.topic}
              </p>
            </div>

            {/* Link to start the quiz */}
            <Link href={`/user/quizzes/${quiz.id}`} className="mt-2">
              <Button size="sm" className="w-full">
                Start
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default UserQuizList;
