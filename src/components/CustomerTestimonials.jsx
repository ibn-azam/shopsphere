// components/sections/Testimonials.js
import { FaStar, FaQuoteRight } from "react-icons/fa";
import SectionHeading from "./shared/SectionHeading";

const testimonials = [
  { name: "Sarah Ahmed", role: "Verified buyer", rating: 5, text: "Fast delivery and the quality was even better than the photos. I have already ordered again." },
  { name: "Daniel Roberts", role: "Verified buyer", rating: 5, text: "Checkout was smooth, and support answered my question in minutes. Great experience overall." },
  { name: "Maya Chowdhury", role: "Verified buyer", rating: 4, text: "Good prices and easy returns. I swapped a size with no hassle at all." },
];

export default function CustomerTestimonials() {
  return (
    <section className="bg-[#FFF1EB] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Reviews"
          title="What Our Customers Say"
          subtitle="Thousands of happy shoppers trust ShopSphere."
        />

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure
                tabIndex={0}
                className="flex h-full flex-col rounded-2xl border border-[#6B7280]/15 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              >
                <FaQuoteRight className="h-8 w-8 text-[#FF6B35]/40" aria-hidden="true" />

                <div className="mt-3 flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <FaStar
                      key={n}
                      className={`h-4 w-4 ${
                        n <= t.rating ? "fill-[#FF6B35] text-[#FF6B35]" : "text-[#6B7280]/30"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 leading-relaxed text-[#131B3A]/80">
                  {t.text}
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#6B7280]/10 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35] font-semibold text-[#FAFAFA]">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold text-[#131B3A]">{t.name}</span>
                    <span className="block text-xs text-[#6B7280]">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}