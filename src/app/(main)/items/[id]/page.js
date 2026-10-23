import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaStar } from "react-icons/fa";
import {
  LuArrowLeft,
  LuCheck,
  LuShoppingCart,
  LuTruck,
} from "react-icons/lu";
import ItemCard from "@/components/items/ItemCard";
import { items } from "@/data/items";

function getItem(id) {
  return items.find((item) => item.id === id);
}

function getRelatedItems(item) {
  const sameCategory = items.filter(
    (candidate) =>
      candidate.id !== item.id && candidate.category === item.category,
  );
  const otherItems = items
    .filter(
      (candidate) =>
        candidate.id !== item.id && candidate.category !== item.category,
    )
    .sort((a, b) => b.rating - a.rating);

  return [...sameCategory, ...otherItems].slice(0, 4);
}

export function generateStaticParams() {
  return items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = getItem(id);

  if (!item) {
    return { title: "Item not found | ShopSphere" };
  }

  return {
    title: `${item.title} | ShopSphere`,
    description: item.description,
  };
}

export default async function ItemDetailsPage({ params }) {
  const { id } = await params;
  const item = getItem(id);

  if (!item) {
    notFound();
  }

  const relatedItems = getRelatedItems(item);

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <Link
          href="/items"
          className="inline-flex items-center gap-2 rounded text-sm font-medium text-[#6B7280] transition-colors hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
        >
          <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to all items
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-[#6B7280]/15 bg-white">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#131B3A]">
              <Image
                src={item.image}
                alt={`${item.title} product image`}
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />

              <span className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#131B3A] ring-1 ring-[#6B7280]/10 backdrop-blur">
                {item.category}
              </span>

              <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#131B3A] ring-1 ring-[#6B7280]/10 backdrop-blur">
                <FaStar
                  className="h-3.5 w-3.5 text-[#FF6B35]"
                  aria-hidden="true"
                />
                {item.rating}
                <span className="sr-only">out of 5 stars</span>
              </span>
            </div>

            {/* Details */}
            <div className="p-6 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
                {item.category}
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#131B3A] sm:text-4xl">
                {item.title}
              </h1>

              <p className="mt-3 flex items-center gap-1.5 text-sm text-[#6B7280]">
                <FaStar
                  className="h-4 w-4 text-[#FF6B35]"
                  aria-hidden="true"
                />
                <span className="font-semibold text-[#131B3A]">
                  {item.rating}
                </span>
                out of 5 stars
              </p>

              <p className="mt-6 text-3xl font-bold text-[#131B3A]">
                ${item.price.toFixed(2)}
              </p>
              <p className="mt-1 text-xs text-[#6B7280]">
                Tax included. Shipping calculated at checkout.
              </p>

              <p className="mt-4 leading-relaxed text-[#6B7280]">
                {item.description}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-[#6B7280]/10 pt-6 text-sm">
                <div>
                  <dt className="text-[#6B7280]">Category</dt>
                  <dd className="mt-1 font-medium text-[#131B3A]">
                    {item.category}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#6B7280]">Added</dt>
                  <dd className="mt-1 font-medium text-[#131B3A]">
                    {item.addedLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#6B7280]">Availability</dt>
                  <dd className="mt-1 flex items-center gap-1.5 font-medium text-[#131B3A]">
                    <LuCheck
                      className="h-4 w-4 text-[#FF6B35]"
                      aria-hidden="true"
                    />
                    In stock
                  </dd>
                </div>
                <div>
                  <dt className="text-[#6B7280]">Shipping</dt>
                  <dd className="mt-1 flex items-center gap-1.5 font-medium text-[#131B3A]">
                    <LuTruck
                      className="h-4 w-4 text-[#FF6B35]"
                      aria-hidden="true"
                    />
                    Free over $50
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/items"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#FF6B35] px-8 font-medium text-[#FAFAFA] transition-colors hover:bg-[#e85d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
                >
                  Back to Items
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#6B7280]/20 px-8 font-medium text-[#131B3A] transition-colors hover:border-[#FF6B35] hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
                >
                  <LuShoppingCart className="h-4 w-4" aria-hidden="true" />
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full description + specifications */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <section
            aria-labelledby="description-heading"
            className="rounded-2xl border border-[#6B7280]/15 bg-white p-6 sm:p-8"
          >
            <h2
              id="description-heading"
              className="text-xl font-semibold text-[#131B3A]"
            >
              Full description
            </h2>
            <p className="mt-4 leading-relaxed text-[#6B7280]">
              {item.longDescription}
            </p>
          </section>

          <section
            aria-labelledby="specifications-heading"
            className="rounded-2xl border border-[#6B7280]/15 bg-white p-6 sm:p-8"
          >
            <h2
              id="specifications-heading"
              className="text-xl font-semibold text-[#131B3A]"
            >
              Key information
            </h2>

            <dl className="mt-4 divide-y divide-[#6B7280]/10 text-sm">
              {item.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-start justify-between gap-6 py-3"
                >
                  <dt className="text-[#6B7280]">{spec.label}</dt>
                  <dd className="text-right font-medium text-[#131B3A]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* Related items */}
        <section aria-labelledby="related-heading" className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="related-heading"
              className="text-2xl font-bold tracking-tight text-[#131B3A]"
            >
              Related items
            </h2>
            <Link
              href="/items"
              className="rounded text-sm font-medium text-[#FF6B35] transition-colors hover:text-[#e85d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            >
              View all items
            </Link>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedItems.map((relatedItem) => (
              <li key={relatedItem.id}>
                <ItemCard item={relatedItem} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
