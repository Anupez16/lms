import React from "react";
import AdminQuizForm from "@/components/forms/AdminQuizForm"; // 📄 Quiz creation form

const AdminQuizzesPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* 🎯 Admin interface to create a new quiz */}
      <AdminQuizForm />
    </main>
  );
};

export default AdminQuizzesPage;
