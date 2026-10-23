"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LuPlus, LuSearch, LuSearchX, LuX } from "react-icons/lu";
import ItemCard from "./ItemCard";
import { categories, items } from "@/data/items";

const priceRanges = [
  { value: "all", label: "All prices", test: () => true },
  { value: "under-50", label: "Under $50", test: (price) => price < 50 },
  {
    value: "50-100",
    label: "$50 – $100",
    test: (price) => price >= 50 && price <= 100,
  },
  { value: "over-100", label: "Over $100", test: (price) => price > 100 },
];

const ratingOptions = [
  { value: "all", label: "All ratings" },
  { value: "4", label: "4.0 & up" },
  { value: "4.5", label: "4.5 & up" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating-desc", label: "Highest rated" },
];

const controlClass =
  "h-11 w-full rounded-lg border border-[#6B7280]/20 bg-white px-3 text-sm text-[#131B3A] transition-colors focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30";

export default function ItemsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState("featured");

  const hasActiveFilters =
    query.trim() !== "" ||
    category !== "all" ||
    price !== "all" ||
    rating !== "all" ||
    sort !== "featured";

  const filteredItems = useMemo(() => {
    const search = query.trim().toLowerCase();
    const priceRange =
      priceRanges.find((option) => option.value === price) ?? priceRanges[0];
    const minRating = rating === "all" ? 0 : Number(rating);

    return items
      .filter((item) => category === "all" || item.category === category)
      .filter((item) => priceRange.test(item.price))
      .filter((item) => item.rating >= minRating)
      .filter((item) =>
        search === ""
          ? true
          : `${item.title} ${item.description} ${item.category}`
              .toLowerCase()
              .includes(search),
      )
      .sort((a, b) => {
        if (sort === "newest") return b.addedAt.localeCompare(a.addedAt);
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "rating-desc") return b.rating - a.rating;
        return 0;
      });
  }, [query, category, price, rating, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setPrice("all");
    setRating("all");
    setSort("featured");
  };

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
            Shop catalog
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#131B3A] sm:text-4xl">
            All Items
          </h1>
          <p className="mt-4 text-base text-[#6B7280] sm:text-lg">
            Browse our full collection and filter by category, price, and rating
            to find exactly what you need.
          </p>
        </div>

        {/* Search + filters */}
        <div className="rounded-2xl border border-[#6B7280]/15 bg-white p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="items-search"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6B7280]"
              >
                Search
              </label>
              <div className="relative">
                <LuSearch
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                  aria-hidden="true"
                />
                <input
                  id="items-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, category, or description"
                  className={`${controlClass} pl-9`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="items-category"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6B7280]"
              >
                Category
              </label>
              <select
                id="items-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={controlClass}
              >
                <option value="all">All categories</option>
                {categories.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="items-price"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6B7280]"
              >
                Price
              </label>
              <select
                id="items-price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className={controlClass}
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="items-rating"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6B7280]"
              >
                Rating
              </label>
              <select
                id="items-rating"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                className={controlClass}
              >
                {ratingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="items-sort"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6B7280]"
              >
                Sort by
              </label>
              <select
                id="items-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className={controlClass}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#6B7280]/10 pt-4">
            <p className="text-sm text-[#6B7280]" aria-live="polite">
              Showing{" "}
              <span className="font-semibold text-[#131B3A]">
                {filteredItems.length}
              </span>{" "}
              of {items.length} items
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-[#FF6B35] transition-colors hover:text-[#e85d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              >
                <LuX className="h-4 w-4" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280]">
            {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/items/add"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF6B35] px-4 py-2 text-sm font-medium text-[#FAFAFA] transition-colors hover:bg-[#e85d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            >
              <LuPlus className="h-4 w-4" aria-hidden="true" />
              Add Items
            </Link>
            <Link
              href="/items/manage"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#6B7280]/20 px-4 py-2 text-sm font-medium text-[#131B3A] transition-colors hover:border-[#FF6B35] hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            >
              Manage Products
            </Link>
          </div>
        </div>

        {/* Results */}
        {filteredItems.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <li key={item.id}>
                <ItemCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-[#6B7280]/25 bg-white px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1EB] text-[#FF6B35]">
              <LuSearchX className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-[#131B3A]">
              No items match your filters
            </h2>
            <p className="mt-2 max-w-sm text-sm text-[#6B7280]">
              Try a different search term or widen your category, price, or
              rating selection.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#FF6B35] px-6 text-sm font-medium text-[#FAFAFA] transition-colors hover:bg-[#e85d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
