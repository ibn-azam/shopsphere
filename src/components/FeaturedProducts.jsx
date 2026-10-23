// components/sections/FeaturedProducts.js
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import SectionHeading from "./shared/SectionHeading";

// Replace with real data from your API / products.json
const defaultProducts = [
  { id: "1", name: "Wireless Headphones", category: "Electronics", price: 79.99, oldPrice: 109.99, rating: 4.7, image: "/products/headphones.jpg" },
  { id: "2", name: "Classic Denim Jacket", category: "Fashion", price: 59.0, rating: 4.5, image: "/products/jacket.jpg" },
  { id: "3", name: "Smart Fitness Watch", category: "Accessories", price: 129.0, oldPrice: 159.0, rating: 4.8, image: "/products/watch.jpg" },
  { id: "4", name: "Ceramic Table Lamp", category: "Home & Living", price: 39.5, rating: 4.4, image: "/products/lamp.jpg" },
];

export default function FeaturedProducts({ products = defaultProducts }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Trending now"
          title="Featured Products"
          subtitle="Hand-picked favorites our customers keep coming back for."
        />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                href={`/products/${p.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#6B7280]/15 bg-[#FAFAFA] transition hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#6B7280]/10">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  {p.oldPrice && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#FF6B35] px-3 py-1 text-xs font-semibold text-[#FAFAFA]">
                      Sale
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                    {p.category}
                  </p>
                  <h3 className="mt-1 line-clamp-1 font-semibold text-[#131B3A] group-hover:text-[#FF6B35]">
                    {p.name}
                  </h3>

                  <p className="mt-2 flex items-center gap-1 text-sm text-[#6B7280]">
                    <FaStar className="h-4 w-4 fill-[#FF6B35] text-[#FF6B35]" aria-hidden="true" />
                    <span className="sr-only">Rating:</span>
                    {p.rating}
                  </p>

                  <div className="mt-auto flex items-baseline gap-2 pt-4">
                    <span className="text-lg font-bold text-[#131B3A]">${p.price.toFixed(2)}</span>
                    {p.oldPrice && (
                      <span className="text-sm text-[#6B7280] line-through">
                        ${p.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#FF6B35] px-8 font-medium text-[#FAFAFA] hover:bg-[#e85d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}