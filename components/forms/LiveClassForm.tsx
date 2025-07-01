"use client";

import { useState, useTransition } from "react";
import { createLiveClass } from "@/lib/actions/liveclass.actions";
import { useRouter } from "next/navigation";

const LiveClassForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    youtube_url: "",
    scheduled_at: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await createLiveClass(formData);
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
      <input
        type="text"
        placeholder="Session Title"
        required
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="input"
      />
      <input
        type="url"
        placeholder="YouTube Live Link"
        required
        value={formData.youtube_url}
        onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
        className="input"
      />
      <input
        type="datetime-local"
        required
        value={formData.scheduled_at}
        onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
        className="input"
      />
      <textarea
        placeholder="Optional description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="input"
      />
      <button type="submit" className="btn-primary" disabled={isPending}>
        {isPending ? "Scheduling..." : "Schedule Live Class"}
      </button>
    </form>
  );
};

export default LiveClassForm;
