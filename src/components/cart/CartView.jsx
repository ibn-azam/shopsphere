"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  LuArrowLeft,
  LuMinus,
  LuPlus,
  LuShieldCheck,
  LuShoppingCart,
  LuTrash2,
  LuTruck,
} from "react-icons/lu";
import { items } from "@/data/items";
import {
  getCartSnapshot,
  getServerCartSnapshot,
  MAX_QUANTITY,
  subscribeCart,
  updateCart,
  writeCart,
} from "@/lib/cart-store";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FEE = 5.99;

export default function CartView() {
  const cart = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const cartLines = cart
    .map((line) => ({
      ...line,
      item: items.find((item) => item.id === line.id),
    }))
    .filter((line) => line.item);

  const subtotal = cartLines.reduce(
    (sum, line) => sum + line.item.price * line.quantity,
    0,
  );
  const shipping =
    cartLines.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal,
  );

  const updateQuantity = (id, quantity) => {
    setCheckoutMessage("");
    updateCart((current) =>
      current.map((line) =>
        line.id === id
          ? { ...line, quantity: Math.min(MAX_QUANTITY, Math.max(1, quantity)) }
          : line,
      ),
    );
  };

  const removeItem = (id) => {
    setCheckoutMessage("");
    updateCart((current) => current.filter((line) => line.id !== id));
  };

  const clearCart = () => {
    setCheckoutMessage("");
    writeCart([]);
  };

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
              Your bag
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#131B3A] sm:text-4xl">
              Shopping Cart
            </h1>
            <p className="mt-3 text-[#6B7280]">
              Review your items, update quantities, and continue when you are
              ready.
            </p>
          </div>

          <Link
            href="/items"
            className="inline-flex items-center gap-2 self-start rounded text-sm font-medium text-[#6B7280] transition-colors hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 sm:self-auto"
          >
            <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
            Continue shopping
          </Link>
        </div>

        {cartLines.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-[#6B7280]/25 bg-white px-6 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF1EB] text-[#FF6B35]">
              <LuShoppingCart className="h-8 w-8" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-[#131B3A]">
              Your cart is empty
            </h2>
            <p className="mt-2 max-w-sm text-sm text-[#6B7280]">
              Add a few favorites from the catalog and they will show up here.
            </p>
            <Link
              href="/items"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#FF6B35] px-8 font-medium text-[#FAFAFA] transition-colors hover:bg-[#e85d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            >
              Browse Items
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* Cart items */}
            <div>
              <ul className="flex flex-col gap-4">
                {cartLines.map(({ item, quantity }) => {
                  const Icon = item.icon;
                  const lineTotal = item.price * quantity;

                  return (
                    <li
                      key={item.id}
                      className="rounded-2xl border border-[#6B7280]/15 bg-white p-4 sm:p-5"
                    >
                      <div className="flex gap-4">
                        <Link
                          href={`/items/${item.id}`}
                          aria-label={`View ${item.title}`}
                          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#FFF1EB] text-[#FF6B35] transition-colors hover:bg-[#FF6B35] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 sm:h-24 sm:w-24"
                        >
                          <Icon
                            className="h-9 w-9 sm:h-10 sm:w-10"
                            aria-hidden="true"
                          />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <Link
                              href={`/items/${item.id}`}
                              className="rounded font-semibold text-[#131B3A] transition-colors hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
                            >
                              {item.title}
                            </Link>
                            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                              {item.category}
                            </p>
                            <p className="mt-1 text-sm text-[#6B7280]">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                            <div
                              className="inline-flex items-center rounded-lg border border-[#6B7280]/20"
                              role="group"
                              aria-label={`Quantity for ${item.title}`}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, quantity - 1)
                                }
                                disabled={quantity <= 1}
                                aria-label={`Decrease quantity of ${item.title}`}
                                className="flex h-9 w-9 items-center justify-center rounded-l-lg text-[#131B3A] transition-colors hover:bg-[#FFF1EB] hover:text-[#FF6B35] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                              >
                                <LuMinus
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              </button>
                              <span
                                className="w-8 text-center text-sm font-semibold text-[#131B3A]"
                                aria-live="polite"
                              >
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, quantity + 1)
                                }
                                disabled={quantity >= MAX_QUANTITY}
                                aria-label={`Increase quantity of ${item.title}`}
                                className="flex h-9 w-9 items-center justify-center rounded-r-lg text-[#131B3A] transition-colors hover:bg-[#FFF1EB] hover:text-[#FF6B35] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                              >
                                <LuPlus
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-base font-bold text-[#131B3A]">
                                ${lineTotal.toFixed(2)}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                aria-label={`Remove ${item.title} from cart`}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] transition-colors hover:bg-[#FFF1EB] hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
                              >
                                <LuTrash2
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded text-sm font-medium text-[#6B7280] transition-colors hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* Order summary */}
            <aside className="rounded-2xl border border-[#6B7280]/15 bg-white p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-[#131B3A]">
                Order Summary
              </h2>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#6B7280]">
                    Subtotal ({cartLines.length}{" "}
                    {cartLines.length === 1 ? "item" : "items"})
                  </dt>
                  <dd className="font-medium text-[#131B3A]">
                    ${subtotal.toFixed(2)}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#6B7280]">Shipping</dt>
                  <dd className="font-medium text-[#131B3A]">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-[#6B7280]/10 pt-3 text-base">
                  <dt className="font-semibold text-[#131B3A]">Total</dt>
                  <dd className="font-bold text-[#131B3A]">
                    ${total.toFixed(2)}
                  </dd>
                </div>
              </dl>

              {shipping > 0 && (
                <p className="mt-4 rounded-lg bg-[#FFF1EB] px-3 py-2 text-xs text-[#131B3A]">
                  Add ${remainingForFreeShipping.toFixed(2)} more to get free
                  shipping.
                </p>
              )}

              <button
                type="button"
                onClick={() =>
                  setCheckoutMessage(
                    "Checkout is a demo right now — no payment will be taken.",
                  )
                }
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#FF6B35] px-6 font-medium text-[#FAFAFA] transition-colors hover:bg-[#e85d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              >
                Proceed to Checkout
              </button>

              {checkoutMessage && (
                <p
                  role="status"
                  className="mt-3 text-center text-xs text-[#6B7280]"
                >
                  {checkoutMessage}
                </p>
              )}

              <div className="mt-6 space-y-2 border-t border-[#6B7280]/10 pt-4 text-xs text-[#6B7280]">
                <p className="flex items-center gap-2">
                  <LuShieldCheck
                    className="h-4 w-4 shrink-0 text-[#FF6B35]"
                    aria-hidden="true"
                  />
                  Secure checkout and encrypted payment
                </p>
                <p className="flex items-center gap-2">
                  <LuTruck
                    className="h-4 w-4 shrink-0 text-[#FF6B35]"
                    aria-hidden="true"
                  />
                  Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
