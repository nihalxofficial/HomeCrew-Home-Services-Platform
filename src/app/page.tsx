import BlogSection from "@/components/homepage/BlogSection";
import FAQSection from "@/components/homepage/FAQSection";
import FeaturedServices from "@/components/homepage/FeaturedService";
import HeroBanner from "@/components/homepage/HeroBanner";
import HowItWorks from "@/components/homepage/HowItWorks";
import Newsletter from "@/components/homepage/Newsletter";
import Testimonials from "@/components/homepage/Testimonials";

export default function Home() {
  return (
    <>
      <HeroBanner/>
      <FeaturedServices/>
      <HowItWorks/>
      <Testimonials/>
      <FAQSection/>
      <BlogSection/>
      <Newsletter/>
    </>
  );
}
