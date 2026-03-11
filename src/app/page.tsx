import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import FeaturedProjects from '@/components/FeaturedProjects';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import SkillsGrid from '@/components/SkillsGrid';
import InfiniteScrollTech from '@/components/InfiniteScrollTech';
import Achievements from '@/components/Achievements';
import ConnectSection from '@/components/ConnectSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <StatsBar />
      <FeaturedProjects />
      <ExperienceTimeline condensed />
      <SkillsGrid condensed />
      <div className="py-8"><InfiniteScrollTech /></div>
      <Achievements />
      <ConnectSection />
      <Footer />
    </div>
  );
}
