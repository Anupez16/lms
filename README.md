This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Roadmap

### 🚧 Features in Progress

5. **Course Management UI (Admin Only)**
   - Upload recorded YouTube lectures with metadata.
   - Create and manage quizzes.
   - Admin-only dashboard (in development).
   - Supabase RLS being configured.

### 🕒 Upcoming Features

6. **Live Virtual Class Support**
   - Admin/teacher can schedule live sessions (Zoom/Meet/WebRTC).
   - Join button with countdown visible to students.
   - Integration to auto-archive sessions post-recording.

7. **Notification System**
   - In-app bell icon for updates (quizzes, videos, deadlines).
   - Email notifications for reminders and announcements.
   - Admin panel for announcement targeting.

8. **Quiz Feature**
   - Admin can create MCQ, True/False, or Short Answer quizzes.
   - Students can take quizzes with feedback and scoring.
   - Quiz data used in Progress Tracking.
