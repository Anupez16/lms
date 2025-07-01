'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
}

const TakeQuizPage = () => {
  const { quizId } = useParams();
  const supabase = createClientComponentClient();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', quizId);

      if (!error && data) {
        setQuestions(data);
      } else {
        console.error('Failed to fetch questions:', error?.message);
      }
    };

    if (quizId) fetchQuestions();
  }, [quizId]);

  const handleOptionChange = (questionId: string, selected: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selected }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) {
        correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);
  };

  return (
    <section className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">Quiz</h1>

      {questions.map((q, index) => (
        <Card key={q.id} className="p-4 rounded-lg">
          <h2 className="font-semibold mb-2">
            {index + 1}. {q.question_text}
          </h2>
          <div className="space-y-2">
            {q.options.map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  disabled={submitted}
                  checked={answers[q.id] === opt}
                  onChange={() => handleOptionChange(q.id, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </Card>
      ))}

      {!submitted && (
        <Button className="w-full" onClick={handleSubmit} disabled={questions.length === 0}>
          Submit Quiz
        </Button>
      )}

      {submitted && (
        <div className="text-center text-xl font-semibold mt-6">
          You scored {score} out of {questions.length}
        </div>
      )}
    </section>
  );
};

export default TakeQuizPage;
