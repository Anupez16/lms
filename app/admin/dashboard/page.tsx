'use client';

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Grid3X3, Video, CalendarCheck } from "lucide-react";

const adminSections = [
  {
    title: "Live Classes",
    link: "/admin/live-classes",
    description: "Schedule and manage upcoming sessions with students.",
    icon: <CalendarCheck className="w-6 h-6 text-primary" />,
  },
  {
    title: "Upload Lectures",
    link: "/admin/lectures",
    description: "Upload recorded lectures with YouTube links and subjects.",
    icon: <Video className="w-6 h-6 text-primary" />,
  },
  {
    title: "Create Quizzes",
    link: "/admin/quizzes",
    description: "Create interactive quizzes to evaluate student performance.",
    icon: <Grid3X3 className="w-6 h-6 text-primary" />,
  },
];

export default function AdminDashboardPage() {
  return (
    <section className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => (
          <Link href={section.link} key={section.title}>
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-col items-start gap-2">
                <div className="bg-muted p-2 rounded-lg">
                  {section.icon}
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
