"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, description, type = "success", duration = 4000 }) => {
      const id = ++toastId;
      setToasts((current) => [...current, { id, title, description, type }]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }

      return id;
    },
    [removeToast],
  );

  const value = useMemo(() => ({ showToast, removeToast }), [showToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2 sm:bottom-6 sm:right-6">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-2xl border border-[#6B7280]/15 bg-white p-4 shadow-lg shadow-[#131B3A]/5 sm:w-auto"
          >
            <span
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                toast.type === "error"
                  ? "bg-red-50 text-red-600"
                  : "bg-[#FFF1EB] text-[#FF6B35]"
              }`}
            >
              {toast.type === "error" ? (
                <LuX className="h-4 w-4" aria-hidden="true" />
              ) : (
                <LuCheck className="h-4 w-4" aria-hidden="true" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              {toast.title ? (
                <p className="text-sm font-semibold text-[#131B3A]">
                  {toast.title}
                </p>
              ) : null}
              {toast.description ? (
                <p className="mt-1 text-sm text-[#6B7280]">{toast.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="rounded-lg p-1.5 text-[#6B7280] transition-colors hover:bg-[#FAFAFA] hover:text-[#131B3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
              aria-label="Dismiss notification"
            >
              <LuX className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside a ToastProvider");
  }
  return context;
}
