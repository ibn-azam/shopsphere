"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse-startups", label: "Products" },
  { href: "/browse-opportunities", label: "Cart" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-b-[#6B7280]/10 bg-[#FAFAFA]">
      <header className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo - left */}
        <Link href="/" onClick={closeMenu}>
          <h2 className="text-xl font-bold sm:text-2xl">
            <span className="text-[#0F172A]">Shop</span>
            <span className="text-[#4F46E5]">Sphere</span>
          </h2>
        </Link>

        {/* Mobile menu button */}
        <button
          className="text-[#4F46E5] md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-6 w-6 hover:cursor-pointer"
            fill="none"
            stroke="#4F46E5"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop: nav links + actions - right */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-md text-[#131B3A] hover:text-[#3730A3]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-5 w-px bg-[#6B7280]/20" />

          <Link
            href="/login"
            className="text-sm font-medium text-[#131B3A] hover:text-[#3730A3]"
          >
            Login
          </Link>
          <Link href="/signup">
            <Button className="bg-[#4F46E5] font-medium text-[#FAFAFA]">
              SignUp
            </Button>
          </Link>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-b border-[#6B7280]/10 bg-[#FAFAFA] px-4 py-4 shadow-sm md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="text-md flex min-h-11 items-center rounded-lg px-3 text-[#131B3A] hover:bg-[#3730A3]/20 hover:text-[#4F46E5]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-col gap-3 border-t border-[#6B7280]/10 pt-4">
            <Link href="/login" onClick={closeMenu}>
              <Button className="w-full" variant="ghost">
                Login
              </Button>
            </Link>
            <Link href="/signup" onClick={closeMenu}>
              <Button className="w-full bg-[#3730A3] font-medium text-[#FAFAFA]">
                SignUp
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}