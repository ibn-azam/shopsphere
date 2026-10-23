import Image from "next/image";
import Link from "next/link";
import {
  LuShieldCheck,
  LuSparkles,
  LuStar,
  LuTruck,
} from "react-icons/lu";

export const metadata = {
  title: "About Us | ShopSphere",
  description:
    "Learn how ShopSphere brings curated products, fair prices, and fast delivery together in one simple shopping experience.",
};

const values = [
  {
    title: "Curated quality",
    text: "Every product is hand-picked by our team, so you spend less time sorting through noise and more time finding things you love.",
    icon: LuSparkles,
  },
  {
    title: "Fair, clear prices",
    text: "No surprise fees or inflated markups. We work directly with trusted brands to keep prices honest and transparent.",
    icon: LuShieldCheck,
  },
  {
    title: "Delivered with care",
    text: "Orders over $50 ship free, and every parcel is packed with care so it arrives ready to use or give.",
    icon: LuTruck,
  },
];

const stats = [
  { value: "500+", label: "Curated products" },
  { value: "12k+", label: "Happy customers" },
  { value: "4.8/5", label: "Average rating" },
];

export default function AboutPage() {
  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Intro */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
              About ShopSphere
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#131B3A] sm:text-4xl lg:text-5xl">
              Thoughtful shopping, made simple.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[#6B7280] sm:text-lg">
              ShopSphere is an online store built around one idea: shopping
              should feel easy. We bring together everyday essentials and the
              latest trends from trusted brands, all in one carefully curated
              place.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
              From electronics and fashion to home, sports, and gaming, every
              item is chosen for its quality, value, and real-world usefulness.
              No endless scrolling required.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/items"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#FF6B35] px-8 font-medium text-[#FAFAFA] transition-colors hover:bg-[#e85d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              >
                Explore the Catalog
              </Link>
              <Link
                href="/cart"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#6B7280]/20 px-8 font-medium text-[#131B3A] transition-colors hover:border-[#FF6B35] hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              >
                View Your Cart
              </Link>
            </div>
          </div>

          {/* Image collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl border border-[#6B7280]/15 bg-white">
              <Image
                src="/products/aurora-headphones.svg"
                alt="Aurora Wireless Headphones product illustration"
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#6B7280]/15 bg-white">
              <Image
                src="/products/terra-table-lamp.svg"
                alt="Terra Ceramic Table Lamp product illustration"
                fill
                unoptimized
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#6B7280]/15 bg-white">
              <Image
                src="/products/trail-runner-sneakers.svg"
                alt="Trail Runner Sneakers product illustration"
                fill
                unoptimized
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-16 grid grid-cols-1 gap-4 rounded-2xl border border-[#6B7280]/15 bg-white p-6 sm:grid-cols-3 sm:p-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse text-center sm:border-r sm:border-[#6B7280]/10 sm:last:border-r-0"
            >
              <dt className="mt-1 text-sm text-[#6B7280]">{stat.label}</dt>
              <dd className="text-2xl font-bold text-[#131B3A] sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Values */}
        <div className="mt-16 md:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
              Our promise
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#131B3A] sm:text-3xl">
              What we stand for
            </h2>
            <p className="mt-4 text-[#6B7280]">
              Three simple commitments shape every decision we make.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ title, text, icon: Icon }) => (
              <li
                key={title}
                className="flex h-full flex-col rounded-2xl border border-[#6B7280]/15 bg-white p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF1EB] text-[#FF6B35]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-[#131B3A]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Story */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-[#131B3A] p-8 sm:p-12 md:mt-24">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
                Our story
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#FAFAFA] sm:text-3xl">
                Built for people who would rather be doing something else.
              </h2>
              <p className="mt-4 leading-relaxed text-[#FAFAFA]/70">
                ShopSphere started with a small team and a shared frustration:
                finding good products online took too long. So we built a store
                that does the narrowing down for you. Today we serve thousands
                of customers while keeping the same focus on quality, fair
                prices, and friendly service.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#FAFAFA]/10 bg-[#FAFAFA]/5 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF6B35]/15 text-[#FF6B35]">
                <LuStar className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-[#FAFAFA]/80">
                Rated <span className="font-semibold text-[#FAFAFA]">4.8/5</span>{" "}
                by verified shoppers across our catalog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
