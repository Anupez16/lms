'use server';

import { auth } from '@clerk/nextjs/server';
import { createSupabaseClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface CreateQuizParams {
  title: string;
  subject: string;
  topic: string;
  questions: QuizQuestion[];
}

export const createQuiz = async (formData: CreateQuizParams) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('quizzes')
    .insert({
      title: formData.title,
      subject: formData.subject,
      topic: formData.topic,
      created_by: userId,
    })
    .select();

  if (error || !data) {
    throw new Error(error?.message || 'Failed to create quiz');
  }

  const quizId = data[0].id;

  // Insert questions
  const questionsPayload = formData.questions.map((q) => ({
    quiz_id: quizId,
    question: q.question,
    options: q.options,
    correct_answer: q.correctAnswer,
  }));

  const { error: questionsError } = await supabase
    .from('quiz_questions')
    .insert(questionsPayload);

  if (questionsError) {
    throw new Error(questionsError.message);
  }

  revalidatePath('/admin/quizzes');
};
