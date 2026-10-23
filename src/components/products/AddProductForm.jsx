"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  LuArrowLeft,
  LuCheck,
  LuImage,
  LuLoaderCircle,
  LuPlus,
} from "react-icons/lu";
import { Button } from "@heroui/react";
import { categories } from "@/data/items";

const fieldClasses =
  "mt-1.5 block w-full rounded-lg border border-[#6B7280]/20 bg-white px-3.5 py-2.5 text-sm text-[#131B3A] shadow-sm outline-none transition-colors placeholder:text-[#6B7280]/70 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 disabled:cursor-not-allowed disabled:bg-[#FAFAFA]";
const labelClasses = "block text-sm font-medium text-[#131B3A]";

const STORAGE_KEY = "shopsphere-custom-products";

const iconOptions = [
  { value: "faHeadphones", label: "Headphones" },
  { value: "faTshirt", label: "Clothing" },
  { value: "faShoePrints", label: "Shoes" },
  { value: "faCouch", label: "Furniture" },
  { value: "luLamp", label: "Lighting" },
  { value: "mdWatch", label: "Watch" },
  { value: "giGymBag", label: "Fitness" },
  { value: "riGamepadFill", label: "Gaming" },
];

function createId(title) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return base.length > 0 ? base : `product-${Date.now()}`;
}

function formatDateLabel(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function AddProductForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("4.5");
  const [image, setImage] = useState("");
  const [description, setDescription] = setDescriptionState(useState(""));
  const [longDescription, setLongDescription] = useState("");
  const [specsText, setSpecsText] = useState("");
  const [icon, setIcon] = useState("faHeadphones");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const today = useMemo(() => new Date(), []);
  const addedLabel = useMemo(() => formatDateLabel(today), [today]);
  const addedAt = useMemo(() => today.toISOString().slice(0, 10), [today]);

  const parseSpecs = useCallback(() => {
    const specs = [];
    const lines = specsText.split("\n");

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.includes(":")) {
        const [label, ...rest] = trimmed.split(":");
        if (label.trim() && rest.join(":").trim()) {
          specs.push({ label: label.trim(), value: rest.join(":").trim() });
        }
        continue;
      }

      if (trimmed.includes("|")) {
        const [label, value] = trimmed.split("|");
        if (label.trim() && value.trim()) {
          specs.push({ label: label.trim(), value: value.trim() });
        }
      }
    }

    return specs;
  }, [specsText]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    const priceValue = Number.parseFloat(price);

    if (Number.isNaN(priceValue) || priceValue < 0) {
      setError("Enter a valid price.");
      return;
    }

    const ratingValue = Number.parseFloat(rating);
    if (Number.isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      setError("Rating must be between 0 and 5.");
      return;
    }

    setSubmitting(true);

    try {
      const product = {
        id: createId(title),
        title: title.trim(),
        category,
        price: Number(priceValue.toFixed(2)),
        rating: Number(ratingValue.toFixed(1)),
        addedAt,
        addedLabel,
        icon,
        image: image.trim() || "",
        description: description.trim(),
        longDescription: longDescription.trim() || description.trim(),
        specs: parseSpecs(),
        createdAt: new Date().toISOString(),
      };

      const existing = window.localStorage.getItem(STORAGE_KEY);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(product);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

      setSuccess(true);
      setTitle("");
      setPrice("");
      setImage("");
      setDescription("");
      setLongDescription("");
      setSpecsText("");
      setRating("4.5");
    } catch (err) {
      setError("Could not save the product. Try again.");
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
              Product management
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#131B3A] sm:text-4xl">
              Add Product
            </h1>
            <p className="mt-3 text-[#6B7280]">
              Create a new product entry for your ShopSphere catalog.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/manage-products"
              className="inline-flex items-center gap-2 self-start rounded text-sm font-medium text-[#6B7280] transition-colors hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 sm:self-auto"
            >
              Manage products
            </Link>
            <Link
              href="/items"
              className="inline-flex items-center gap-2 self-start rounded text-sm font-medium text-[#6B7280] transition-colors hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 sm:self-auto"
            >
              <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to catalog
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
        >
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#6B7280]/15 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-[#131B3A]">
                Product details
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
                  <label htmlFor="rating" className={labelClasses}>
                    Rating (0–5)
                  </label>
                  <input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                    required
                    className={fieldClasses}
                  />
                </div>
                <div>
                  <label htmlFor="icon" className={labelClasses}>
                    Icon
                  </label>
                  <select
                    id="icon"
                    value={icon}
                    onChange={(event) => setIcon(event.target.value)}
                    className={fieldClasses}
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#6B7280]/15 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-[#131B3A]">Media</h2>
              <div className="mt-6">
                <label htmlFor="image" className={labelClasses}>
                  Image URL (optional)
                </label>
                <input
                  id="image"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  placeholder="/products/your-image.svg or https://..."
                  className={fieldClasses}
                />
                <p className="mt-1.5 text-xs text-[#6B7280]">
                  Use a local path from the public folder or an external URL.
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-[#6B7280]/15 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-[#131B3A]">
                Description
              </h2>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="description" className={labelClasses}>
                    Short description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                    rows={3}
                    placeholder="A concise summary for product cards."
                    className={fieldClasses}
                  />
                </div>
                <div>
                  <label htmlFor="longDescription" className={labelClasses}>
                    Full description
                  </label>
                  <textarea
                    id="longDescription"
                    value={longDescription}
                    onChange={(event) => setLongDescription(event.target.value)}
                    rows={6}
                    placeholder="Add more detail for the product details page."
                    className={fieldClasses}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#6B7280]/15 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-[#131B3A]">
                Specifications
              </h2>
              <div className="mt-6">
                <label htmlFor="specs" className={labelClasses}>
                  Key information
                </label>
                <textarea
                  id="specs"
                  value={specsText}
                  onChange={(event) => setSpecsText(event.target.value)}
                  rows={6}
                  placeholder={"Material: 100% cotton\nWeight: 250 g\nWarranty: 1 year"}
                  className={fieldClasses}
                />
                <p className="mt-1.5 text-xs text-[#6B7280]">
                  Add one per line using <code>Label: Value</code> or{" "}
                  <code>Label | Value</code>.
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#6B7280]/15 bg-white p-6">
              <h2 className="text-lg font-semibold text-[#131B3A]">
                Publish
              </h2>
              <p className="mt-2 text-sm text-[#6B7280]">
                {"Products are saved to your browser's local storage for this"}
                session.
              </p>

              {error ? (
                <p
                  role="alert"
                  className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {error}
                </p>
              ) : null}

              {success ? (
                <p
                  role="status"
                  className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
                >
                  <LuCheck className="h-4 w-4" aria-hidden="true" />
                  Product added successfully.
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
                    Saving…
                  </>
                ) : (
                  <>
                    <LuPlus className="h-4 w-4" aria-hidden="true" />
                    Add Product
                  </>
                )}
              </Button>

              <p className="mt-3 text-center text-xs text-[#6B7280]">Added on {addedLabel}</p>
            </div>

            <div className="rounded-2xl border border-[#6B7280]/15 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-[#131B3A]">
                <LuImage className="h-5 w-5 text-[#FF6B35]" aria-hidden="true" />
                Tips
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-[#6B7280]">
                <li>Use a clear title and short description for cards.</li>
                <li>
                  {"Local images go in public/products/."}
                </li>
                <li>Specifications render as a key-value list.</li>
                <li>Manage products from the Manage Products page.</li>
              </ul>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}

function setDescriptionState(value) {
  // Keep parity with the original hook usage pattern.
  return value;
}
