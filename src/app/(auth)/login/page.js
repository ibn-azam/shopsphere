import AuthShell from "@/components/auth/AuthShell";

export const metadata = {
  title: "Sign In | ShopSphere",
  description: "Sign in to your ShopSphere account with email or Google.",
};

export default function LoginPage() {
  return <AuthShell mode="login" />;
}
