"use client";

import Link from "next/link";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const linkColumns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "New Arrivals", href: "/products?sort=newest" },
      { label: "Deals", href: "/products?category=deals" },
      { label: "Categories", href: "/categories" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Brand Guidelines", href: "/brand-guideline" },
    ],
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebook },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#6B7280]/10 bg-[#FAFAFA]">
      <div className="container mx-auto px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2.5fr]">
          {/* Logo + tagline */}
          <div className="max-w-xs">
            <Link
              href="/"
              aria-label="ShopSphere Home"
              className="inline-block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            >
              <h2 className="text-2xl font-bold">
                <span className="text-[#0F172A]">Shop</span>
                <span className="text-[#4F46E5]">Sphere</span>
              </h2>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-[#6B7280]">
              Everyday essentials and the latest trends, from trusted brands,
              delivered fast to your door.
            </p>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-10"
          >
            {linkColumns.map((column) => (
              <div key={column.title}>
                <h4 className="mb-4 text-sm font-semibold text-[#131B3A]">
                  {column.title}
                </h4>

                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="rounded text-sm text-[#6B7280] transition-colors hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-6 border-t border-[#6B7280]/10 pt-6 md:flex-row md:justify-between">
          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#131B3A] text-white transition-colors hover:bg-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
                aria-label={label}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Copyright + policies */}
          <div className="flex flex-col items-center gap-2 text-xs text-[#6B7280] sm:flex-row sm:gap-4 md:justify-end">
            <span>
              &copy; {year} ShopSphere. All rights reserved.
            </span>

            <span
              className="hidden h-3 w-px bg-[#6B7280]/20 sm:block"
              aria-hidden="true"
            />

            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="rounded transition-colors hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="rounded transition-colors hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
