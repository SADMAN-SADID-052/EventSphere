
import Categories from "@/components/Categories";
import FeaturedEvents from "@/components/FeaturedEvents";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main>
     <HeroSection></HeroSection>
     <FeaturedEvents></FeaturedEvents>
     <Categories></Categories>

    </main>
  );
}