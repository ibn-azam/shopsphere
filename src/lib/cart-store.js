import { items } from "@/data/items";

export const CART_STORAGE_KEY = "shopsphere-cart";
export const MAX_QUANTITY = 10;

const validIds = new Set(items.map((item) => item.id));

const defaultCart = [
  { id: "aurora-headphones", quantity: 1 },
  { id: "halo-smart-watch", quantity: 1 },
  { id: "terra-table-lamp", quantity: 2 },
];

let cachedRaw;
let cachedCart;

function sanitizeCart(value) {
  if (!Array.isArray(value)) return null;

  const quantities = new Map();

  for (const line of value) {
    if (
      !line ||
      !validIds.has(line.id) ||
      !Number.isInteger(line.quantity) ||
      line.quantity <= 0
    ) {
      continue;
    }

    const current = quantities.get(line.id) ?? 0;
    quantities.set(line.id, Math.min(MAX_QUANTITY, current + line.quantity));
  }

  return [...quantities].map(([id, quantity]) => ({ id, quantity }));
}

function readRawCart() {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(CART_STORAGE_KEY);
  } catch {
    return null;
  }
}

function parseCart(raw) {
  if (raw === null) return defaultCart;

  try {
    return sanitizeCart(JSON.parse(raw)) ?? defaultCart;
  } catch {
    return defaultCart;
  }
}

export function getCartSnapshot() {
  const raw = readRawCart();

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedCart = parseCart(raw);
  }

  return cachedCart;
}

export function getServerCartSnapshot() {
  return defaultCart;
}

const listeners = new Set();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeCart(listener) {
  listeners.add(listener);

  const onStorage = (event) => {
    if (event.key !== CART_STORAGE_KEY) return;

    cachedRaw = undefined;
    cachedCart = undefined;
    listener();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function writeCart(cart) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Storage can be unavailable (private mode); keep the in-memory value.
  }

  cachedRaw = undefined;
  cachedCart = undefined;
  emit();
}

export function updateCart(updater) {
  writeCart(updater(getCartSnapshot()));
}
