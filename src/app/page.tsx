import BlogSection from "@/components/homepage/BlogSection";
import FAQSection from "@/components/homepage/FAQSection";
import HeroBanner from "@/components/homepage/HeroBanner";
import HowItWorks from "@/components/homepage/HowItWorks";
import Testimonials from "@/components/homepage/Testimonials";

export default function Home() {
  return (
    <>
      <HeroBanner/>
      <HowItWorks/>
      <Testimonials/>
      <FAQSection/>
      <BlogSection/>
    </>
  );
}
