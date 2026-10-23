"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { LuChevronDown, LuLogOut, LuPackagePlus, LuSettings } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/cart", label: "Cart" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const userMenuRef = useRef(null);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const displayName = user?.displayName || user?.email || "Account";
  const email = user?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await logout();
      closeMenu();
    } catch {
      // AuthContext surfaces errors; keep the navbar usable either way.
    } finally {
      setIsSigningOut(false);
    }
  };

  useEffect(() => {
    if (!isUserMenuOpen) return undefined;

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isUserMenuOpen]);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#6B7280]/10 bg-[#FAFAFA]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FAFAFA]/80">
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#4F46E5] md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-6 w-6 hover:cursor-pointer"
            fill="none"
            stroke="currentColor"
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
        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          <ul className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[#131B3A] transition-colors hover:text-[#4F46E5]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-5 w-px bg-[#6B7280]/20" />

          {loading ? (
            <span
              className="h-9 w-32 animate-pulse rounded-full bg-[#6B7280]/10"
              aria-hidden="true"
            />
          ) : user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-[#6B7280]/15 bg-white px-2.5 py-1.5 text-sm text-[#131B3A] shadow-sm transition-colors hover:border-[#4F46E5]/40 hover:bg-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/10 text-sm font-semibold text-[#4F46E5]"
                  aria-hidden="true"
                >
                  {initial}
                </span>
                <span className="max-w-[8rem] truncate font-medium lg:max-w-[10rem]">
                  {displayName}
                </span>
                <LuChevronDown
                  className={`h-4 w-4 text-[#6B7280] transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isUserMenuOpen ? (
                <div
                  role="menu"
                  aria-label="User menu"
                  className="absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border border-[#6B7280]/15 bg-white shadow-lg shadow-[#131B3A]/5"
                >
                  <div className="flex items-center gap-3 px-4 py-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/10 text-sm font-semibold text-[#4F46E5]"
                      aria-hidden="true"
                    >
                      {initial}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#131B3A]">
                        {displayName}
                      </p>
                      {email ? (
                        <p className="truncate text-xs text-[#6B7280]">
                          {email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="border-t border-[#6B7280]/10 py-1">
                    <Link
                      href="/add-product"
                      onClick={closeMenu}
                      role="menuitem"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#131B3A] transition-colors hover:bg-[#FAFAFA] hover:text-[#4F46E5]"
                    >
                      <LuPackagePlus className="h-4 w-4" aria-hidden="true" />
                      Add Product
                    </Link>
                    <Link
                      href="/manage-products"
                      onClick={closeMenu}
                      role="menuitem"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#131B3A] transition-colors hover:bg-[#FAFAFA] hover:text-[#4F46E5]"
                    >
                      <LuSettings className="h-4 w-4" aria-hidden="true" />
                      Manage Products
                    </Link>
                  </div>

                  <div className="border-t border-[#6B7280]/10 py-1">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      role="menuitem"
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[#6B7280] transition-colors hover:bg-[#FFF1EB] hover:text-[#FF6B35] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <LuLogOut className="h-4 w-4" aria-hidden="true" />
                      {isSigningOut ? "Signing out…" : "Sign out"}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-[#131B3A] transition-colors hover:text-[#4F46E5]"
              >
                Login
              </Link>
              <Link href="/signup">
                <Button className="bg-[#4F46E5] font-medium text-[#FAFAFA] transition-colors hover:bg-[#4338CA]">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-[#6B7280]/10 bg-[#FAFAFA] px-4 py-4 shadow-sm md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="text-md flex min-h-11 items-center rounded-lg px-3 text-[#131B3A] transition-colors hover:bg-[#4F46E5]/5 hover:text-[#4F46E5]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-col gap-3 border-t border-[#6B7280]/10 pt-4">
            {loading ? (
              <span
                className="h-11 w-full animate-pulse rounded-lg bg-[#6B7280]/10"
                aria-hidden="true"
              />
            ) : user ? (
              <>
                <div className="flex items-center gap-3 px-1">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/10 text-sm font-semibold text-[#4F46E5]"
                    aria-hidden="true"
                  >
                    {initial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#131B3A]">
                      {displayName}
                    </p>
                    {email ? (
                      <p className="truncate text-xs text-[#6B7280]">
                        {email}
                      </p>
                    ) : null}
                  </div>
                </div>
                <Link href="/add-product" onClick={closeMenu}>
                  <Button
                    className="w-full justify-start gap-2 bg-transparent font-medium text-[#131B3A]"
                    variant="ghost"
                  >
                    <LuPackagePlus className="h-4 w-4" aria-hidden="true" />
                    Add Product
                  </Button>
                </Link>
                <Link href="/manage-products" onClick={closeMenu}>
                  <Button
                    className="w-full justify-start gap-2 bg-transparent font-medium text-[#131B3A]"
                    variant="ghost"
                  >
                    <LuSettings className="h-4 w-4" aria-hidden="true" />
                    Manage Products
                  </Button>
                </Link>
                <Button
                  onPress={handleSignOut}
                  isDisabled={isSigningOut}
                  className="w-full justify-start gap-2 bg-[#131B3A] font-medium text-[#FAFAFA]"
                >
                  <LuLogOut className="h-4 w-4" aria-hidden="true" />
                  {isSigningOut ? "Signing out…" : "Sign out"}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={closeMenu}>
                  <Button className="w-full" variant="ghost">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={closeMenu}>
                  <Button className="w-full bg-[#4F46E5] font-medium text-[#FAFAFA]">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
