// components/Hero.js
import Link from "next/link";
import Image from "next/image";

const perks = ["Free shipping over $50", "30-day easy returns", "Secure payment"];

export default function Hero({ backgroundImage = null }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#131B3A]">
      {/* Optional background */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          {/* dark overlay keeps the text readable */}
          <div className="absolute inset-0 -z-10 bg-[#131B3A]/75" />
        </>
      ) : (
        <>
          {/* default: soft orange glow + dot pattern */}
          <div
            className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-[#FF6B35]/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#FAFAFA 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="container mx-auto px-4 py-20 text-center sm:px-6 md:py-28 lg:py-36">
        <p className="mx-auto mb-6 inline-block rounded-full border border-[#FF6B35]/40 bg-[#FF6B35]/10 px-4 py-1 text-sm font-medium text-[#FF6B35]">
          New season sale: up to 40% off
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-[#FAFAFA] sm:text-5xl lg:text-6xl">
          Everything you love, <span className="text-[#FF6B35]">delivered</span> to your door
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#FAFAFA]/75 sm:text-lg">
          Shop electronics, fashion, home essentials, and more from trusted
          brands at prices you will love, with fast delivery on every order.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#FF6B35] px-8 text-base font-medium text-[#FAFAFA] hover:bg-[#e85d2a] sm:w-auto"
          >
            Shop Now
          </Link>
          <Link
            href="/products?category=deals"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-[#FAFAFA]/30 px-8 text-base font-medium text-[#FAFAFA] hover:bg-[#FAFAFA]/10 sm:w-auto"
          >
            View Deals
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-[#FAFAFA]/70">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" aria-hidden="true" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}