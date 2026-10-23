import { FaHeadphones, FaShoePrints, FaTshirt } from "react-icons/fa";
import { FaCouch } from "react-icons/fa6";
import { GiGymBag } from "react-icons/gi";
import { LuLamp } from "react-icons/lu";
import { MdWatch } from "react-icons/md";
import { RiGamepadFill } from "react-icons/ri";

export const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Sports",
  "Accessories",
  "Gaming",
];

export const items = [
  {
    id: "aurora-headphones",
    title: "Aurora Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    rating: 4.8,
    addedAt: "2026-10-12",
    addedLabel: "Oct 12, 2026",
    icon: FaHeadphones,
    image: "/products/aurora-headphones.svg",
    description:
      "Over-ear noise cancelling headphones with 40 hours of playtime and plush memory-foam cushions.",
    longDescription:
      "The Aurora headphones pair active noise cancellation with a lightweight over-ear frame, so commutes, flights, and focused work sessions stay distraction-free. Memory-foam ear cushions and a 40-hour battery keep you comfortable from the first track to the last. A USB-C fast-charge top-up gives you five extra hours in just ten minutes.",
    specs: [
      { label: "Driver", value: "40 mm dynamic" },
      { label: "Battery life", value: "Up to 40 hours" },
      { label: "Connectivity", value: "Bluetooth 5.3 / USB-C" },
      { label: "Weight", value: "254 g" },
      { label: "Noise control", value: "Active noise cancelling" },
      { label: "Warranty", value: "2 years" },
    ],
  },
  {
    id: "everyday-denim-jacket",
    title: "Everyday Denim Jacket",
    category: "Fashion",
    price: 59,
    rating: 4.5,
    addedAt: "2026-09-28",
    addedLabel: "Sep 28, 2026",
    icon: FaTshirt,
    image: "/products/everyday-denim-jacket.svg",
    description:
      "A mid-wash cotton denim jacket that layers easily over tees and hoodies all year round.",
    longDescription:
      "Cut from mid-weight cotton denim with a soft hand feel, the Everyday Denim Jacket is the layer you reach for from early autumn through late spring. Classic chest pockets, a button front, and a relaxed fit make it easy to wear over tees, knits, or hoodies. It only gets better with age.",
    specs: [
      { label: "Material", value: "100% cotton denim" },
      { label: "Fit", value: "Relaxed" },
      { label: "Closure", value: "Button front" },
      { label: "Pockets", value: "2 chest / 2 side" },
      { label: "Care", value: "Machine wash cold" },
      { label: "Sizes", value: "XS–XXL" },
    ],
  },
  {
    id: "halo-smart-watch",
    title: "Halo Smart Watch",
    category: "Accessories",
    price: 149,
    rating: 4.7,
    addedAt: "2026-10-02",
    addedLabel: "Oct 2, 2026",
    icon: MdWatch,
    image: "/products/halo-smart-watch.svg",
    description:
      "Track workouts, heart rate, and sleep with a bright AMOLED display and seven-day battery.",
    longDescription:
      "Halo keeps your day in view with a bright AMOLED display and all-day health tracking. Monitor heart rate, sleep stages, and workouts, then review your progress in the companion app. The seven-day battery means you can wear it through the week without reaching for a charger.",
    specs: [
      { label: "Display", value: '1.4" AMOLED' },
      { label: "Battery", value: "Up to 7 days" },
      { label: "Water resistance", value: "5 ATM" },
      { label: "Sensors", value: "Heart rate / SpO2 / accelerometer" },
      { label: "Compatibility", value: "iOS 15+ / Android 9+" },
      { label: "Strap", value: "22 mm quick-release" },
    ],
  },
  {
    id: "terra-table-lamp",
    title: "Terra Ceramic Table Lamp",
    category: "Home & Living",
    price: 39.5,
    rating: 4.4,
    addedAt: "2026-08-19",
    addedLabel: "Aug 19, 2026",
    icon: LuLamp,
    image: "/products/terra-table-lamp.svg",
    description:
      "Hand-glazed ceramic lamp with a warm linen shade for a soft, cosy glow in any room.",
    longDescription:
      "The Terra lamp is hand-glazed in small batches, giving every shade a subtly different finish. Its warm linen shade softens the light into a gentle glow that works beautifully on a bedside table, reading nook, or hallway console. A compact footprint makes it easy to place, even in smaller rooms.",
    specs: [
      { label: "Material", value: "Glazed ceramic / linen" },
      { label: "Dimensions", value: "32 cm H × 22 cm W" },
      { label: "Bulb", value: "E27, max 40 W (not included)" },
      { label: "Cable", value: "1.8 m braided" },
      { label: "Switch", value: "Inline" },
      { label: "Care", value: "Wipe clean with a dry cloth" },
    ],
  },
  {
    id: "flexgrip-dumbbell-set",
    title: "FlexGrip Dumbbell Set",
    category: "Sports",
    price: 89,
    rating: 4.6,
    addedAt: "2026-09-05",
    addedLabel: "Sep 5, 2026",
    icon: GiGymBag,
    image: "/products/flexgrip-dumbbell-set.svg",
    description:
      "Adjustable 20 kg dumbbell pair with a quick-lock system for compact home workouts.",
    longDescription:
      "FlexGrip replaces a rack of fixed weights with one compact, adjustable pair. The quick-lock collars swap plates in seconds, while the knurled steel handles stay secure through presses, rows, and squats. A sturdy storage tray keeps plates organised between sessions.",
    specs: [
      { label: "Total weight", value: "20 kg (2 × 10 kg)" },
      { label: "Adjustment", value: "Quick-lock collars" },
      { label: "Material", value: "Steel / ABS" },
      { label: "Handle", value: "Knurled grip" },
      { label: "Footprint", value: "40 × 20 cm" },
      { label: "Included", value: "Storage tray" },
    ],
  },
  {
    id: "pixelpad-controller",
    title: "PixelPad Wireless Controller",
    category: "Gaming",
    price: 64.99,
    rating: 4.9,
    addedAt: "2026-10-15",
    addedLabel: "Oct 15, 2026",
    icon: RiGamepadFill,
    image: "/products/pixelpad-controller.svg",
    description:
      "Low-latency wireless controller with textured grips and responsive hall-effect triggers.",
    longDescription:
      "PixelPad is built for long sessions, with textured grips, precise hall-effect triggers, and a low-latency wireless connection. Pair it with PC, console, or mobile and switch between devices without re-pairing. The rechargeable battery keeps going for up to 30 hours.",
    specs: [
      { label: "Connection", value: "2.4 GHz / Bluetooth" },
      { label: "Battery", value: "Up to 30 hours" },
      { label: "Charging", value: "USB-C" },
      { label: "Compatibility", value: "PC / console / mobile" },
      { label: "Triggers", value: "Hall-effect" },
      { label: "Weight", value: "240 g" },
    ],
  },
  {
    id: "trail-runner-sneakers",
    title: "Trail Runner Sneakers",
    category: "Fashion",
    price: 74.5,
    rating: 4.3,
    addedAt: "2026-07-30",
    addedLabel: "Jul 30, 2026",
    icon: FaShoePrints,
    image: "/products/trail-runner-sneakers.svg",
    description:
      "Lightweight trail sneakers with a grippy outsole and a breathable knit upper.",
    longDescription:
      "Trail Runner pairs a breathable knit upper with a lugged rubber outsole for confident footing on gravel, dirt, and city pavement. A cushioned midsole takes the sting out of longer days, while the reinforced toe cap adds durability where it matters.",
    specs: [
      { label: "Upper", value: "Breathable knit" },
      { label: "Outsole", value: "Lugged rubber" },
      { label: "Midsole", value: "EVA foam" },
      { label: "Drop", value: "8 mm" },
      { label: "Weight", value: "285 g (size 42)" },
      { label: "Sizes", value: "UK 5–12" },
    ],
  },
  {
    id: "linen-throw-blanket",
    title: "Linen Throw Blanket",
    category: "Home & Living",
    price: 44,
    rating: 4.2,
    addedAt: "2026-08-08",
    addedLabel: "Aug 8, 2026",
    icon: FaCouch,
    image: "/products/linen-throw-blanket.svg",
    description:
      "Stonewashed linen throw that stays breathable in summer and cosy in winter.",
    longDescription:
      "Woven from stonewashed linen, this throw gets softer with every wash while staying breathable enough for warmer months. The generous size works as a sofa layer, a picnic blanket, or an extra layer at the end of the bed. Finished with a simple stitched hem for a clean, lived-in look.",
    specs: [
      { label: "Material", value: "100% linen" },
      { label: "Size", value: "130 × 170 cm" },
      { label: "Weight", value: "260 gsm" },
      { label: "Finish", value: "Stonewashed" },
      { label: "Care", value: "Machine wash cold, line dry" },
      { label: "Colours", value: "Oat / Sage / Clay" },
    ],
  },
];
