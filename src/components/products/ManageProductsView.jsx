"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  LuArrowLeft,
  LuPackageOpen,
  LuPencil,
  LuPlus,
  LuSearch,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import { Button } from "@heroui/react";
import { items as baseItems } from "@/data/items";

const STORAGE_KEY = "shopsphere-custom-products";

const iconMap = {
  faHeadphones: "Headphones",
  faTshirt: "Apparel",
  faShoePrints: "Shoes",
  faCouch: "Furniture",
  luLamp: "Lighting",
  mdWatch: "Watch",
  giGymBag: "Fitness",
  riGamepadFill: "Gaming",
};

function loadCustomProducts() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ManageProductsView() {
  const [customProducts, setCustomProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCustomProducts(loadCustomProducts());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const allProducts = useMemo(
    () => [...customProducts, ...baseItems],
    [customProducts],
  );

  const categories = useMemo(() => {
    const set = new Set(allProducts.map((product) => product.category));
    return ["all", ...Array.from(set)];
  }, [allProducts]);

  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();

    return allProducts.filter((product) => {
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      const matchesQuery =
        term.length === 0 ||
        product.title.toLowerCase().includes(term) ||
        (product.description || "").toLowerCase().includes(term);

      return matchesCategory && matchesQuery;
    });
  }, [allProducts, query, categoryFilter]);

  const confirmDelete = () => {
    if (!productToDelete) return;
    const updated = customProducts.filter(
      (product) => product.id !== productToDelete.id,
    );
    setCustomProducts(updated);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage failures.
    } finally {
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
  };

  const removeProduct = (id) => {
    const updated = customProducts.filter((product) => product.id !== id);
    setCustomProducts(updated);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage failures.
    }
  };

  return (
    <section className="min-h-[70vh] bg-[#FAFAFA] py-10 sm:py-14 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 border-b border-[#6B7280]/10 pb-8 sm:flex-row sm:items-center sm:justify-between sm:pb-10">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FF6B35]">
              Product management
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#131B3A] sm:text-4xl lg:text-5xl">
              Manage Products
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B7280] sm:text-base">
              View, search, and remove custom products added from your browser.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
            <Link
              href="/add-product"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-[#FAFAFA] shadow-sm transition hover:bg-[#e85d2a] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            >
              <LuPlus className="h-4 w-4" aria-hidden="true" />
              Add Product
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

        <div className="mt-7 rounded-2xl border border-[#6B7280]/15 bg-white p-4 shadow-sm sm:mt-8 sm:p-5">
          <div className="flex flex-col gap-5">
            <div className="relative w-full">
              <LuSearch
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="h-12 w-full rounded-xl border border-[#6B7280]/20 bg-[#FAFAFA]/70 py-2.5 pl-11 pr-4 text-sm text-[#131B3A] outline-none transition placeholder:text-[#6B7280]/70 hover:border-[#6B7280]/35 focus:border-[#FF6B35] focus:bg-white focus:ring-4 focus:ring-[#FF6B35]/10"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                Filter by category
              </p>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:justify-end sm:overflow-visible sm:px-0 sm:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setCategoryFilter(category)}
                    aria-pressed={categoryFilter === category}
                    className={`min-h-9 shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 ${
                      categoryFilter === category
                        ? "bg-[#131B3A] text-white shadow-sm"
                        : "bg-[#FAFAFA] text-[#6B7280] hover:bg-[#FFF1EB] hover:text-[#FF6B35]"
                    }`}
                  >
                    {category === "all" ? "All categories" : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-[#131B3A]">
            Products
          </h2>
          <p className="text-sm text-[#6B7280]" aria-live="polite">
            Showing{" "}
            <span className="font-semibold text-[#131B3A]">{filtered.length}</span>{" "}
            of{" "}
            <span className="font-semibold text-[#131B3A]">{allProducts.length}</span>
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-[#6B7280]/25 bg-white px-6 py-16 text-center shadow-sm">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1EB] text-[#FF6B35]">
              <LuPackageOpen className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-[#131B3A]">
              No products found
            </h2>
            <p className="mt-2 max-w-sm text-sm text-[#6B7280]">
              Try adjusting your search or filters, or add a new product to get
              started.
            </p>
            <Link
              href="/add-product"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-[#e85d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            >
              <LuPlus className="h-4 w-4" aria-hidden="true" />
              Add Product
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-4 hidden overflow-hidden rounded-2xl border border-[#6B7280]/15 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#6B7280]/10 bg-[#FAFAFA]">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                        Product
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                        Category
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                        Price
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                        Added
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#6B7280]/10">
                    {filtered.map((product) => {
                      const isCustom = customProducts.some(
                        (custom) => custom.id === product.id,
                      );
                      return (
                        <tr key={product.id} className="transition-colors hover:bg-[#FAFAFA]/80">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF1EB] text-[#FF6B35]">
                                <LuPackageOpen className="h-5 w-5" aria-hidden="true" />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate font-semibold text-[#131B3A]">
                                  {product.title}
                                </p>
                                <p className="mt-1 max-w-xl truncate text-xs text-[#6B7280]">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#6B7280]">
                            <span className="inline-flex rounded-full bg-[#FAFAFA] px-3 py-1 text-xs font-medium text-[#6B7280]">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-[#131B3A]">
                            ${Number(product.price).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-[#6B7280]">
                            {product.addedLabel || "-"}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/items/${product.id}`}
                                className="inline-flex min-h-8 items-center rounded-lg px-3 text-xs font-semibold text-[#6B7280] transition-colors hover:bg-[#FFF1EB] hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                              >
                                View
                              </Link>
                              {isCustom ? (
                                <button
                                  type="button"
                                  onClick={() => setProductToDelete(product)}
                                  className="inline-flex min-h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                                >
                                  <LuTrash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                  Delete
                                </button>
                              ) : (
                                <span className="rounded-full bg-[#FAFAFA] px-3 py-1.5 text-[11px] font-medium text-[#6B7280]/70">
                                  Default
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:hidden">
              {filtered.map((product) => {
                const isCustom = customProducts.some(
                  (custom) => custom.id === product.id,
                );
                return (
                  <article
                    key={product.id}
                    className="min-w-0 rounded-2xl border border-[#6B7280]/15 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF1EB] text-[#FF6B35]">
                        <LuPackageOpen className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-[#131B3A]">
                              {product.title}
                            </p>
                            <p className="mt-1">
                              <span className="inline-flex rounded-full bg-[#FAFAFA] px-2.5 py-1 text-[11px] font-medium text-[#6B7280]">
                                {product.category}
                              </span>
                            </p>
                          </div>
                          <p className="shrink-0 rounded-lg bg-[#FAFAFA] px-2.5 py-1 text-sm font-bold text-[#131B3A]">
                            ${Number(product.price).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-2 line-clamp-2 text-xs text-[#6B7280]">
                          {product.description}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#6B7280]/10 pt-3">
                          <p className="text-xs text-[#6B7280]">
                            Added <span className="font-medium text-[#131B3A]">{product.addedLabel || "-"}</span>
                          </p>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/items/${product.id}`}
                              className="inline-flex min-h-8 items-center rounded-lg px-3 text-xs font-semibold text-[#6B7280] transition-colors hover:bg-[#FFF1EB] hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                            >
                              View
                            </Link>
                            {isCustom ? (
                              <button
                                type="button"
                                onClick={() => setProductToDelete(product)}
                                className="inline-flex min-h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                              >
                                <LuTrash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                Delete
                              </button>
                            ) : (
                              <span className="rounded-full bg-[#FAFAFA] px-3 py-1.5 text-[11px] font-medium text-[#6B7280]/70">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>

      {productToDelete ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#131B3A]/40 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl shadow-[#131B3A]/10">
            <div className="flex items-start justify-between gap-4 p-6">
              <div>
                <h2
                  id="delete-modal-title"
                  className="text-lg font-semibold text-[#131B3A]"
                >
                  Delete product
                </h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-[#131B3A]">
                    {productToDelete.title}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
              <button
                type="button"
                onClick={cancelDelete}
                className="rounded-lg p-1.5 text-[#6B7280] transition-colors hover:bg-[#FAFAFA] hover:text-[#131B3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                aria-label="Close delete dialog"
              >
                <LuX className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col gap-2 border-t border-[#6B7280]/10 px-6 py-4 sm:flex-row sm:justify-end">
              <Button
                onPress={cancelDelete}
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#6B7280]/20 bg-white font-medium text-[#131B3A] transition-colors hover:bg-[#FAFAFA]"
              >
                Cancel
              </Button>
              <Button
                onPress={confirmDelete}
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-red-600 font-medium text-white transition-colors hover:bg-red-700"
              >
                <LuTrash2 className="h-4 w-4" aria-hidden="true" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
