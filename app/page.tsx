import BgGradient from "@/components/common/bg-gradient";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
export default function Home() {
  return (
    <div className="relative w-full h-full">
      
      <BgGradient />
      <div>
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
      </div>
      
      
      {/* <PricingSection></PricingSection> */}
      {/* <CtaSection></CtaSection>   */}

    </div>
  );
}
