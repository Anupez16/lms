# 🎓 LMS Platform – Learning Management System

A full-stack, modern **Learning Management System** built with **Next.js App Router**, **Supabase**, and **Tailwind CSS**. This platform enables Admins to upload recorded lectures, schedule live classes, create quizzes, and monitor student progress. Students can join classes, watch videos, attempt quizzes, and bookmark content for later.

---

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, ShadCN UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Auth**: Supabase + Clerk (optional)
- **Real-time**: Supabase Realtime & Server Actions
- **Deployment**: Vercel
- **Monitoring**: Sentry (optional)

---

## 🔐 User Roles

- **Admin**:
  - Upload YouTube lecture videos
  - Schedule live classes
  - Create and manage quizzes
  - View analytics dashboard
  - Send announcements & reminders

- **Student/Consumer**:
  - View and join upcoming live classes
  - Watch recorded video lectures
  - Take quizzes and receive instant results
  - Bookmark lectures for later
  - View notifications and progress

---

## 📚 Core Features

| Feature              | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| 🎥 Upload Lectures   | Admin can embed YouTube videos with metadata (title, subject, etc.)         |
| 📅 Live Classes      | Admin can create scheduled live sessions (e.g., Zoom/Meet links)            |
| 📝 Quizzes           | MCQ/True-False quizzes with scoring & feedback                              |
| 🔖 Bookmarks         | Students can save lectures/resources for quick access                       |
| 🔔 Notifications     | In-app announcements + scheduled reminders                                  |
| 📊 Analytics         | Admin view of quiz stats, course activity, attendance (planned)             |
| 📈 Progress Tracking | Track quiz scores, completed lectures, and engagement (in progress)         |

---

## 🗂️ Project Structure (App Router)

\`\`\`
app/
│
├── admin/
│   ├── lectures/         # Upload recorded lectures (YouTube links)
│   ├── live-classes/     # Create and manage live sessions
│   ├── quizzes/          # Create quizzes with questions & answers
│   └── dashboard/        # Admin dashboard with section cards
│
├── user/
│   ├── live-classes/     # View upcoming live sessions (with join button)
│   ├── lectures/         # View and watch YouTube-embedded lectures
│   ├── quizzes/          # Take quizzes and view scores
│   └── bookmarks/        # Saved videos/resources
│
├── api/                 # Optional backend routes
├── components/          # Reusable UI components
├── lib/                 # Supabase clients, helpers
└── app/page.tsx         # Homepage / landing
\`\`\`

---

## 🛠️ Setup Instructions

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/lms-platform.git
cd lms-platform
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Setup environment**
Create a \`.env.local\` file and add:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

4. **Run the project**
\`\`\`bash
npm run dev
\`\`\`

---

## 🧪 Features in Progress

- [x] Lecture Upload & View
- [x] Live Class Management & Join Button
- [x] Quiz System
- [x] Bookmarks Feature
- [ ] Notification System 🔔
- [ ] Analytics Dashboard 📊
- [ ] Progress Tracker 🧭

---

## 📦 Deployment

Easily deploy to **Vercel**:

\`\`\`bash
vercel --prod
\`\`\`

---

## 📜 License

MIT License – free to use and modify.

---

## 🙋‍♂️ Author

Developed by **[Anup](https://github.com/Anupez16)** as part of an internship project.  
If you found this useful or want to collaborate, feel free to connect!
