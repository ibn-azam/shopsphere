import AuthGuard from "@/components/auth/AuthGuard";
import ManageProductsView from "@/components/products/ManageProductsView";

export const metadata = {
  title: "Manage Items | ShopSphere",
  description: "Manage items in your ShopSphere catalog (login required).",
};

export default function ManageItemsPage() {
  return (
    <AuthGuard>
      <ManageProductsView />
    </AuthGuard>
  );
}
