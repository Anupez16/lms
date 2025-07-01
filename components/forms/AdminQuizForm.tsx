'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { createQuiz } from '@/lib/actions/quiz.actions';

const AdminQuizForm = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    subject: '',
    topic: '',
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionIndex: number | null = null,
    optionIndex: number | null = null
  ) => {
    const { name, value } = e.target;

    if (questionIndex !== null && optionIndex === null) {
      const updatedQuestions = [...form.questions];
      (updatedQuestions[questionIndex] as any)[name] = value;
      setForm((prev) => ({ ...prev, questions: updatedQuestions }));
    } else if (questionIndex !== null && optionIndex !== null) {
      const updatedQuestions = [...form.questions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      setForm((prev) => ({ ...prev, questions: updatedQuestions }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addQuestion = () => {
    setForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuiz(form);
    router.push('/admin/dashboard');
  };

  return (
    <section className="max-w-4xl mx-auto mt-10">
      <Card className="p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Quiz</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input name="subject" value={form.subject} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input name="topic" value={form.topic} onChange={handleChange} required />
          </div>

          {form.questions.map((q, index) => (
            <CardContent key={index} className="border-t pt-4">
              <div className="space-y-2">
                <Label>Question {index + 1}</Label>
                <Textarea
                  name="question"
                  value={q.question}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Type the question here"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, i) => (
                    <Input
                      key={i}
                      name={`option-${i}`}
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => handleChange(e, index, i)}
                      required
                    />
                  ))}
                </div>
                <Input
                  name="correctAnswer"
                  placeholder="Correct answer (must match one of the options)"
                  value={q.correctAnswer}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </div>
            </CardContent>
          ))}

          <Button type="button" onClick={addQuestion} variant="outline">
            + Add Question
          </Button>

          <Button type="submit" className="w-full">
            Create Quiz
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default AdminQuizForm;
