"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LuLoaderCircle } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [checking, setChecking] = useState(!loading);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    const timer = setTimeout(() => setChecking(false), 0);
    return () => clearTimeout(timer);
  }, [loading, user, router]);

  if (loading || checking) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#FAFAFA] px-4">
        <div className="flex flex-col items-center text-center">
          <LuLoaderCircle
            className="h-7 w-7 animate-spin text-[#FF6B35]"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm text-[#6B7280]">
            Checking your session…
          </p>
        </div>
      </section>
    );
  }

  return children;
}
