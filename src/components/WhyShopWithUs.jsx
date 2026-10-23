// components/sections/Features.js
import { FaTruck, FaHeadphones } from "react-icons/fa";
import { LuRotateCcw, LuShieldCheck } from "react-icons/lu";
import SectionHeading from "./shared/SectionHeading";

const features = [
  { title: "Free Shipping", text: "Free delivery on all orders over $50, straight to your door.", icon: FaTruck },
  { title: "Easy Returns", text: "Not happy? Return any item within 30 days, no questions asked.", icon: LuRotateCcw },
  { title: "Secure Payment", text: "Your payment details are encrypted and always protected.", icon: LuShieldCheck },
  { title: "24/7 Support", text: "Our team is here around the clock to help with any question.", icon: FaHeadphones },
];

export default function WhyShopWithUs() {
  return (
    <section className="bg-[#131B3A] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          light
          eyebrow="Our promise"
          title="Why Shop With Us"
          subtitle="Shopping should be simple, safe, and stress-free."
        />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, text, icon: Icon }) => (
            <li
              key={title}
              tabIndex={0}
              className="group flex h-full flex-col rounded-2xl border border-[#FAFAFA]/10 bg-[#FAFAFA]/5 p-6 transition hover:-translate-y-1 hover:border-[#FF6B35] hover:bg-[#FAFAFA]/10 focus-visible:-translate-y-1 focus-visible:border-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B35]/15 text-[#FF6B35] transition group-hover:bg-[#FF6B35] group-hover:text-[#FAFAFA]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-[#FAFAFA]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#FAFAFA]/70">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}