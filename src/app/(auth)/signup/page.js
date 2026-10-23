import AuthShell from "@/components/auth/AuthShell";

export const metadata = {
  title: "Create Account | ShopSphere",
  description: "Create a ShopSphere account with email or Google.",
};

export default function SignupPage() {
  return <AuthShell mode="signup" />;
}
