"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeOff, LuLoaderCircle, LuLock } from "react-icons/lu";
import { getAuthErrorMessage, useAuth } from "@/context/AuthContext";
import { FIREBASE_NOT_CONFIGURED_MESSAGE } from "@/lib/firebase";

const fieldClasses =
  "block w-full rounded-lg border border-[#6B7280]/20 bg-white px-3.5 py-2.5 text-sm text-[#131B3A] shadow-sm outline-none transition-colors placeholder:text-[#6B7280]/70 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 disabled:cursor-not-allowed disabled:bg-[#FAFAFA]";

const labelClasses = "block text-sm font-medium text-[#131B3A]";

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  disabled,
  showPassword,
  onToggleVisibility,
  hint,
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          name={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
          minLength={6}
          disabled={disabled}
          placeholder="At least 6 characters"
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`${fieldClasses} pr-11`}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-controls={id}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-[#6B7280] transition-colors hover:text-[#131B3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
        >
          {showPassword ? (
            <LuEyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <LuEye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-[#6B7280]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default function AuthForm({ mode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const formId = useId();
  const { user, loading, isConfigured, login, signup, loginWithGoogle } =
    useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  const disabled = submitting || !isConfigured;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!isConfigured) {
      setFormError(FIREBASE_NOT_CONFIGURED_MESSAGE);
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      if (isSignup) {
        await signup({ name, email, password });
      } else {
        await login(email, password);
      }

      router.replace("/");
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setFormError("");

    if (!isConfigured) {
      setFormError(FIREBASE_NOT_CONFIGURED_MESSAGE);
      return;
    }

    setSubmitting(true);

    try {
      await loginWithGoogle();
      router.replace("/");
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (user) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-[#6B7280]/15 bg-white p-10 text-center">
        <LuLoaderCircle
          className="h-7 w-7 animate-spin text-[#FF6B35]"
          aria-hidden="true"
        />
        <p className="mt-4 text-sm text-[#6B7280]">
          You are already signed in. Taking you home…
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#6B7280]/15 bg-white p-6 shadow-sm sm:p-8">
      {!isConfigured ? (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-[#FF6B35]/30 bg-[#FFF1EB] p-4 text-sm text-[#131B3A]"
        >
          <p className="flex items-center gap-2 font-semibold">
            <LuLock className="h-4 w-4 text-[#FF6B35]" aria-hidden="true" />
            Firebase is not configured
          </p>
          <p className="mt-1.5 text-[#6B7280]">
            Add your Firebase web app keys to{" "}
            <code className="rounded bg-white px-1 py-0.5 text-xs">.env.local</code>{" "}
            and restart the dev server. See{" "}
            <code className="rounded bg-white px-1 py-0.5 text-xs">
              .env.local.example
            </code>{" "}
            for the required variables.
          </p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {isSignup ? (
          <div>
            <label htmlFor={`${formId}-name`} className={labelClasses}>
              Full name
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
              disabled={disabled}
              placeholder="Alex Carter"
              className={`mt-1.5 ${fieldClasses}`}
            />
          </div>
        ) : null}

        <div>
          <label htmlFor={`${formId}-email`} className={labelClasses}>
            Email address
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            disabled={disabled}
            placeholder="you@example.com"
            className={`mt-1.5 ${fieldClasses}`}
          />
        </div>

        <PasswordField
          id={`${formId}-password`}
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete={isSignup ? "new-password" : "current-password"}
          disabled={disabled}
          showPassword={showPassword}
          onToggleVisibility={() => setShowPassword((visible) => !visible)}
          hint={isSignup ? "Use at least 6 characters." : undefined}
        />

        {isSignup ? (
          <PasswordField
            id={`${formId}-confirm-password`}
            label="Confirm password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
            disabled={disabled}
            showPassword={showPassword}
            onToggleVisibility={() => setShowPassword((visible) => !visible)}
          />
        ) : null}

        {formError ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {formError}
          </p>
        ) : null}

        <Button
          type="submit"
          isDisabled={disabled}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#FF6B35] font-medium text-[#FAFAFA] transition-colors hover:bg-[#e85d2a]"
        >
          {submitting ? (
            <>
              <LuLoaderCircle
                className="h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              {isSignup ? "Creating account…" : "Signing in…"}
            </>
          ) : isSignup ? (
            "Create account"
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#6B7280]/15" />
        <span className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
          or
        </span>
        <span className="h-px flex-1 bg-[#6B7280]/15" />
      </div>

      <Button
        type="button"
        onPress={handleGoogleLogin}
        isDisabled={disabled}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-[#6B7280]/20 bg-white font-medium text-[#131B3A] transition-colors hover:bg-[#FAFAFA]"
      >
        <FcGoogle className="h-5 w-5" aria-hidden="true" />
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm text-[#6B7280]">
        {isSignup ? "Already have an account?" : "New to ShopSphere?"}{" "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="rounded font-medium text-[#FF6B35] transition-colors hover:text-[#e85d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
        >
          {isSignup ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
