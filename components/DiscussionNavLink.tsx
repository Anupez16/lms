// components/DiscussionNavLink.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Companion = {
  id: string;
  name: string;
};

export default function DiscussionNavLink() {
  const [companion, setCompanion] = useState<Companion | null>(null);

  // Fetch the first companion to use in the discussion link
  useEffect(() => {
    const fetchFirstCompanion = async () => {
      const { data, error } = await supabase
        .from("companions")
        .select("id, name")
        .limit(1)
        .single();

      if (!error && data) {
        setCompanion(data);
      } else {
        console.error("⚠️ Error fetching companion:", error);
      }
    };

    fetchFirstCompanion();
  }, []);

  // Return nothing if no companion is loaded yet
  if (!companion) return null;

  return (
    <Link
      href={`/companions/${companion.id}/discussion`}
      className="text-sm font-medium hover:text-primary transition"
    >
      Discussion
    </Link>
  );
}
