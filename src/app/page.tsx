
import Categories from "@/components/Categories";
import FeaturedEvents from "@/components/FeaturedEvents";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main>
     <HeroSection></HeroSection>
     <FeaturedEvents></FeaturedEvents>
     <Categories></Categories>
     <HowItWorks></HowItWorks>

    </main>
  );
}