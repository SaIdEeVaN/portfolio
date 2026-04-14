"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 border-b border-green-500">
      <h1 className="text-xl font-bold">~/portfolio</h1>

      <div className="space-x-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/skills">Skills</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}