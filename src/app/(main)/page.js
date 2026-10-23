import CustomerTestimonials from "@/components/CustomerTestimonials";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ShopByCategory from "@/components/ShopByCategory";
import WhyShopWithUs from "@/components/WhyShopWithUs";

export default function Home() {
  return (
    <div className="min-h-screen">
     <Hero/>
     <ShopByCategory/>
     <FeaturedProducts/>
     <WhyShopWithUs/>
     <CustomerTestimonials/>
    </div>
  );
}
