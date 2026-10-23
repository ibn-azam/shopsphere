// components/SectionHeading.js
export default function SectionHeading({ eyebrow, title, subtitle, light = false }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-[#FAFAFA]" : "text-[#131B3A]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg ${light ? "text-[#FAFAFA]/70" : "text-[#6B7280]"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}