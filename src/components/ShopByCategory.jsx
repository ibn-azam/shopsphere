// components/sections/Categories.js
import Link from "next/link";
import { FaShirt, FaCouch } from "react-icons/fa6";
import { MdSmartphone, MdWatch } from "react-icons/md";
import { GiGymBag } from "react-icons/gi";
import { RiGamepadFill } from "react-icons/ri";
import SectionHeading from "./shared/SectionHeading";

const categories = [
  { name: "Electronics", slug: "electronics", count: 120, icon: MdSmartphone },
  { name: "Fashion", slug: "fashion", count: 340, icon: FaShirt },
  { name: "Home & Living", slug: "home", count: 210, icon: FaCouch },
  { name: "Sports", slug: "sports", count: 95, icon: GiGymBag },
  { name: "Accessories", slug: "accessories", count: 180, icon: MdWatch },
  { name: "Gaming", slug: "gaming", count: 75, icon: RiGamepadFill },
];

export default function ShopByCategory() {
  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Browse"
          title="Shop by Category"
          subtitle="Find exactly what you need, from everyday essentials to the latest trends."
        />

        <ul className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ name, slug, count, icon: Icon }) => (
            <li key={slug}>
              <Link
                href={`/products?category=${slug}`}
                className="group flex h-full flex-col items-center rounded-2xl border border-[#6B7280]/15 bg-white p-6 text-center transition hover:-translate-y-1 hover:border-[#FF6B35] hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1EB] text-[#FF6B35] transition group-hover:bg-[#FF6B35] group-hover:text-[#FAFAFA] group-focus-visible:bg-[#FF6B35] group-focus-visible:text-[#FAFAFA]">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-[#131B3A]">{name}</h3>
                <p className="mt-1 text-sm text-[#6B7280]">{count} items</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}