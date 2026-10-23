import { LuPackageCheck, LuShieldCheck, LuTruck } from "react-icons/lu";
import AuthForm from "@/components/auth/AuthForm";

const highlights = [
  {
    icon: LuShieldCheck,
    title: "Secure sign-in",
    text: "Authentication is handled by Firebase, so your password never touches our servers.",
  },
  {
    icon: LuPackageCheck,
    title: "Keep your cart",
    text: "Your bag stays with you across visits, so you can pick up right where you left off.",
  },
  {
    icon: LuTruck,
    title: "Faster checkout",
    text: "Signing in keeps your details together so future orders take fewer steps.",
  },
];

export default function AuthShell({ mode }) {
  const isSignup = mode === "signup";

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          <div className="lg:pt-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
              ShopSphere account
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#131B3A] sm:text-4xl">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6B7280]">
              {isSignup
                ? "Join ShopSphere to save your cart, check out faster, and keep track of the products you love."
                : "Sign in to pick up where you left off, review your bag, and check out in a couple of clicks."}
            </p>

            <ul className="mt-8 space-y-4">
              {highlights.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF1EB] text-[#FF6B35]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-[#131B3A]">{title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[#6B7280]">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-md lg:justify-self-end">
            <h2 className="sr-only">
              {isSignup ? "Sign up form" : "Sign in form"}
            </h2>
            <AuthForm mode={mode} />
          </div>
        </div>
      </div>
    </section>
  );
}
