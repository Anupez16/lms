"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import DiscussionNavLink from "./DiscussionNavLink";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

const NavItems = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const [isMounted, setIsMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (user?.publicMetadata?.role === "admin") {
      setIsAdmin(true);
    }
  }, [user]);

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

      {/* ✅ Render only after hydration to prevent mismatch */}
      {isMounted && (
        <Link
          href={isAdmin ? "/admin/live-classes" : "/user/live-classes"}
          className={cn(
            (pathname === "/admin/live-classes" || pathname === "/user/live-classes") &&
              "text-primary font-semibold"
          )}
        >
          {isAdmin ? "Create Live Class" : "Live Class"}
        </Link>
      )}

      <DiscussionNavLink />
    </nav>
  );
};

export default NavItems;
