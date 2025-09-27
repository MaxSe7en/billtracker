"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-background dark:bg-darkBackground sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-primary">
        BillTracker
      </Link>

      <nav className="flex gap-4 text-sm">
        <Link href="/federal" className="hover:text-accent">
          Federal
        </Link>
        <Link href="/states" className="hover:text-accent">
          States
        </Link>
        <Link href="/about" className="hover:text-accent">
          About
        </Link>
      </nav>

      <div className="flex gap-2">
        <button className="px-3 py-1 rounded bg-primary text-white">
          Login
        </button>
      </div>
    </header>
  );
}
