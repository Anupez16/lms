"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import DiscussionNavLink from "./DiscussionNavLink";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

const NavItems = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

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

      {/* ✅ Admin Dashboard */}
      {isAdmin && (
        <Link
          href="/admin/dashboard"
          className={cn(pathname === "/admin/dashboard" && "text-primary font-semibold")}
        >
          Dashboard
        </Link>
      )}

      {/* ✅ Live Class Link */}
      <Link
        href={isAdmin ? "/admin/live-classes" : "/user/live-classes"}
        className={cn(
          pathname.includes("/live-classes") && "text-primary font-semibold"
        )}
      >
        {isAdmin ? "Create Live Class" : "Live Class"}
      </Link>

      {/* ✅ Non-admin only links */}
      {!isAdmin && (
        <>
          <Link
            href="/user/quizzes"
            className={cn(
              pathname.startsWith("/user/quizzes") && "text-primary font-semibold"
            )}
          >
            Take Quiz
          </Link>
          <Link
            href="/user/lectures"
            className={cn(
              pathname.startsWith("/user/lectures") && "text-primary font-semibold"
            )}
          >
            Recorded Lectures
          </Link>
          <Link
            href="/user/notifications"
            className={cn(
              pathname.startsWith("/user/notifications") && "text-primary font-semibold"
            )}
          >
            🔔 Notifications
          </Link>
        </>
      )}

      <DiscussionNavLink />
    </nav>
  );
};

export default NavItems;
