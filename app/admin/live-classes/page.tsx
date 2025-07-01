'use client';

import { useState, useTransition } from "react";
import { createLiveClass } from "@/lib/actions/liveClass.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const AdminLiveClassForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    title: "",
    youtube_link: "",
    subject: "",
    topic: "", // ✅ Topic field added
    duration: "",
    scheduled_time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      createLiveClass({
        ...form,
        duration: Number(form.duration),
      }).then(() => {
        router.push("/user/live-classes");
      });
    });
  };

  return (
    <section className="max-w-xl mx-auto mt-10">
      <Card className="p-6 shadow-md border rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Live Class</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              placeholder="Class Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube_link">YouTube Link</Label>
            <Input
              name="youtube_link"
              placeholder="https://youtube.com/live/..."
              value={form.youtube_link}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              name="subject"
              placeholder="e.g. Math, Science"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              name="topic"
              placeholder="e.g. Algebra Basics"
              value={form.topic}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (in minutes)</Label>
            <Input
              name="duration"
              type="number"
              placeholder="45"
              value={form.duration}
              onChange={handleChange}
              required
              min={1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduled_time">Scheduled Time</Label>
            <Input
              name="scheduled_time"
              type="datetime-local"
              value={form.scheduled_time}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating..." : "Create Live Class"}
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default AdminLiveClassForm;
