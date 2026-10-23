"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import {
  LuArrowLeft,
  LuCalendar,
  LuCheck,
  LuImage,
  LuLoaderCircle,
  LuPlus,
  LuTag,
} from "react-icons/lu";
import { categories } from "@/data/items";
import { useToast } from "@/components/shared/ToastProvider";

const fieldClasses =
  "mt-1.5 block w-full rounded-lg border border-[#6B7280]/20 bg-white px-3.5 py-2.5 text-sm text-[#131B3A] shadow-sm outline-none transition-colors placeholder:text-[#6B7280]/70 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20";
const labelClasses = "block text-sm font-medium text-[#131B3A]";

const STORAGE_KEY = "shopsphere-custom-products";

function createId(title) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return base.length > 0 ? base : `item-${Date.now()}`;
}

function formatDateLabel(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function AddItemForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [priority, setPriority] = useState("normal");
  const [category, setCategory] = useState(categories[0]);
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const today = new Date(date);
  const addedLabel = formatDateLabel(today);
  const addedAt = date;

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const priceValue = Number.parseFloat(price);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!shortDescription.trim()) {
      setError("Short description is required.");
      return;
    }
    if (!fullDescription.trim()) {
      setError("Full description is required.");
      return;
    }
    if (Number.isNaN(priceValue) || priceValue < 0) {
      setError("Enter a valid price.");
      return;
    }

    setSubmitting(true);

    try {
      const item = {
        id: createId(title),
        title: title.trim(),
        category,
        price: Number(priceValue.toFixed(2)),
        rating: 4.5,
        addedAt,
        addedLabel,
        date,
        priority,
        image: imageUrl.trim() || "",
        description: shortDescription.trim(),
        longDescription: fullDescription.trim(),
        specs: [],
        createdAt: new Date().toISOString(),
      };

      const existing = window.localStorage.getItem(STORAGE_KEY);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(item);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

      showToast({
        title: "Item added",
        description: `${item.title} was added to your catalog.`,
        type: "success",
      });

      setTimeout(() => router.push("/manage-products"), 600);
    } catch (err) {
      setError("Could not add the item. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
              Protected page
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#131B3A] sm:text-4xl">
              Add Items
            </h1>
            <p className="mt-3 text-[#6B7280]">
              Add a new item to the ShopSphere catalog. Only signed-in users can
              access this page.
            </p>
          </div>

          <Link
            href="/items"
            className="inline-flex items-center gap-2 self-start rounded text-sm font-medium text-[#6B7280] transition-colors hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 sm:self-auto"
          >
            <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Items
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
        >
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#6B7280]/15 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-[#131B3A]">
                Basic information
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="title" className={labelClasses}>
                    Title
                  </label>
                  <input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                    placeholder="e.g. Nova Wireless Earbuds"
                    className={fieldClasses}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="shortDescription" className={labelClasses}>
                    Short description
                  </label>
                  <textarea
                    id="shortDescription"
                    value={shortDescription}
                    onChange={(event) => setShortDescription(event.target.value)}
                    required
                    rows={3}
                    placeholder="A quick summary shown on item cards."
                    className={fieldClasses}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="fullDescription" className={labelClasses}>
                    Full description
                  </label>
                  <textarea
                    id="fullDescription"
                    value={fullDescription}
                    onChange={(event) => setFullDescription(event.target.value)}
                    required
                    rows={6}
                    placeholder="Detailed description shown on the product details page."
                    className={fieldClasses}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#6B7280]/15 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-[#131B3A]">
                Product details
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="price" className={labelClasses}>
                    Price ($)
                  </label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                    placeholder="49.99"
                    className={fieldClasses}
                  />
                </div>
                <div>
                  <label htmlFor="date" className={labelClasses}>
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className={fieldClasses}
                  />
                </div>
                <div>
                  <label htmlFor="priority" className={labelClasses}>
                    Priority / relevance
                  </label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                    className={fieldClasses}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className={labelClasses}>
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className={fieldClasses}
                  >
                    {categories.map((itemCategory) => (
                      <option key={itemCategory} value={itemCategory}>
                        {itemCategory}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#6B7280]/15 bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-[#131B3A]">
                <LuImage className="h-5 w-5 text-[#FF6B35]" aria-hidden="true" />
                Media
              </h2>
              <div className="mt-6">
                <label htmlFor="imageUrl" className={labelClasses}>
                  Optional image URL
                </label>
                <input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  placeholder="/products/your-image.svg or https://..."
                  className={fieldClasses}
                />
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#6B7280]/15 bg-white p-6">
              <h2 className="text-lg font-semibold text-[#131B3A]">Publish</h2>
              <p className="mt-2 text-sm text-[#6B7280]">
                This form is protected and only accessible when logged in.
              </p>

              <div className="mt-4 space-y-2 text-sm text-[#6B7280]">
                <p className="flex items-center gap-2">
                  <LuTag className="h-4 w-4 text-[#FF6B35]" aria-hidden="true" />
                  Category: {category}
                </p>
                <p className="flex items-center gap-2">
                  <LuCalendar className="h-4 w-4 text-[#FF6B35]" aria-hidden="true" />
                  Date: {addedLabel}
                </p>
                <p className="flex items-center gap-2">
                  <LuCheck className="h-4 w-4 text-[#FF6B35]" aria-hidden="true" />
                  Priority: {priority}
                </p>
              </div>

              {error ? (
                <p
                  role="alert"
                  className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                isDisabled={submitting}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#FF6B35] font-medium text-[#FAFAFA] transition-colors hover:bg-[#e85d2a]"
              >
                {submitting ? (
                  <>
                    <LuLoaderCircle
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Submitting…
                  </>
                ) : (
                  <>
                    <LuPlus className="h-4 w-4" aria-hidden="true" />
                    Submit (add)
                  </>
                )}
              </Button>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}
