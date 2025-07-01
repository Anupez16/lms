'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase-browser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const subjects = ['maths', 'science', 'history', 'economics', 'language', 'coding'];

export default function ManageCourses() {
  const { user } = useUser();
  const [form, setForm] = useState({
    title: '',
    subject: '',
    youtube_url: '',
    description: '',
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    setMessage('');
    setUploading(true);

    const { data: { user: supaUser }, error: userError } = await supabase.auth.getUser();

    if (userError || !supaUser?.id) {
      setMessage('❌ Failed to get Supabase user.');
      setUploading(false);
      return;
    }

    const { title, subject, youtube_url } = form;
    if (!title || !subject || !youtube_url) {
      setMessage('❌ All fields except description are required.');
      setUploading(false);
      return;
    }

    const { error } = await supabase.from('videos').insert([
      {
        ...form,
        uploaded_by: supaUser.id, // Use Supabase UID
      },
    ]);

    setUploading(false);

    if (error) {
      setMessage(`❌ Upload failed: ${error.message}`);
    } else {
      setMessage('✅ Video uploaded successfully!');
      setForm({ title: '', subject: '', youtube_url: '', description: '' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>

      <div className="space-y-4">
        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Course Title"
        />

        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select Subject</option>
          {subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj.charAt(0).toUpperCase() + subj.slice(1)}
            </option>
          ))}
        </select>

        <Input
          name="youtube_url"
          value={form.youtube_url}
          onChange={handleChange}
          placeholder="YouTube Video Link"
        />

        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
        />

        <Button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Video'}
        </Button>

        {message && <p className="mt-2 text-sm">{message}</p>}
      </div>
    </div>
  );
}
