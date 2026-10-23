import ItemsExplorer from "@/components/items/ItemsExplorer";

export const metadata = {
  title: "All Items | ShopSphere",
  description:
    "Browse the ShopSphere catalog and filter items by category, price, and rating.",
};

export default function ItemsPage() {
  return <ItemsExplorer />;
}
