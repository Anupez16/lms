'use client';

import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { createLecture } from '@/lib/actions/lecture.actions';

const AdminLectureUpload = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    title: '',
    description: '',
    youtube_link: '',
    subject: '',
    topic: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      createLecture(form).then(() => {
        router.push('/user/lectures');
      });
    });
  };

  return (
    <section className="max-w-2xl mx-auto mt-10">
      <Card className="p-6 shadow-md rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload Lecture</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="youtube_link">YouTube Link</Label>
            <Input name="youtube_link" value={form.youtube_link} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input name="subject" value={form.subject} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="topic">Topic</Label>
            <Input name="topic" value={form.topic} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea name="description" value={form.description} onChange={handleChange} />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Uploading...' : 'Upload Lecture'}
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default AdminLectureUpload;
