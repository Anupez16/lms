"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // ✅ Clerk user
import { cn } from "@/lib/utils";
import DiscussionNavLink from "./DiscussionNavLink";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "Lectures", href: "/lectures" },
  { label: "My Journey", href: "/my-journey" },
];

const ADMIN_ID = "user_2zEk2qcpsgZL0dmWEwDEQSmJDsH"; // 🔒 Replace this with your actual Clerk admin user ID

const NavItems = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={cn(pathname === href && "text-primary font-semibold")}
        >
          {label}
        </Link>
      ))}

      {/* ✅ Admin-only link */}
      {user?.id === ADMIN_ID && (
        <Link
          href="/admin/courses"
          className={cn(pathname === "/admin/courses" && "text-primary font-semibold")}
        >
          Manage Courses
        </Link>
      )}

      <DiscussionNavLink />
    </nav>
  );
};

export default NavItems;
