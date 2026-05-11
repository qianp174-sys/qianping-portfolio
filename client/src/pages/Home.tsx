// ============================================================
// PAGE: Home — 朱倩萍个人品牌网站主页
// Design: Neo-Constructivist Minimalism
// Sections: Hero → About → Portfolio → SOP → Contact
// ============================================================

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import SOPSection from "@/components/SOPSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#F8F9FA" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <SOPSection />
      <ContactSection />
    </div>
  );
}
