import AuthGuard from "@/components/auth/AuthGuard";
import AddItemForm from "@/components/items/AddItemForm";

export const metadata = {
  title: "Add Items | ShopSphere",
  description: "Add a new item to the ShopSphere catalog (login required).",
};

export default function AddItemsPage() {
  return (
    <AuthGuard>
      <AddItemForm />
    </AuthGuard>
  );
}
