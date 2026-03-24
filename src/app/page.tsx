
import Categories from "@/components/Categories";
import Faq from "@/components/Faq";
import FeaturedEvents from "@/components/FeaturedEvents";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
     <HeroSection></HeroSection>
     <FeaturedEvents></FeaturedEvents>
     <Categories></Categories>
     <HowItWorks></HowItWorks>
     <StatsSection></StatsSection>
     <Testimonials></Testimonials>
     <Faq></Faq>

    </main>
  );
}