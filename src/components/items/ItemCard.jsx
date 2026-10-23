import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function ItemCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#6B7280]/15 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-[#FFF1EB]">
        <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FF6B35]/15 text-[#FF6B35] transition-colors group-hover:bg-[#FF6B35] group-hover:text-[#FAFAFA]">
          <Icon className="h-10 w-10" aria-hidden="true" />
        </span>

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#131B3A] ring-1 ring-[#6B7280]/10">
          {item.category}
        </span>

        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#131B3A] ring-1 ring-[#6B7280]/10">
          <FaStar className="h-3.5 w-3.5 text-[#FF6B35]" aria-hidden="true" />
          {item.rating}
          <span className="sr-only">out of 5 stars</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-[#131B3A]">{item.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6B7280]">
          {item.description}
        </p>

        <p className="mt-4 text-xl font-bold text-[#131B3A]">
          ${item.price.toFixed(2)}
        </p>

        <Link
          href={`/items/${item.id}`}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#131B3A] px-4 text-sm font-medium text-[#FAFAFA] transition-colors hover:bg-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
