import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import FeaturedProjects from '@/components/FeaturedProjects';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import SkillsGrid from '@/components/SkillsGrid';
import InfiniteScrollTech from '@/components/InfiniteScrollTech';
import ConnectSection from '@/components/ConnectSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Hero />
      <StatsBar />
      <FeaturedProjects />
      <ExperienceTimeline condensed />
      <SkillsGrid condensed />
      <div className="py-8"><InfiniteScrollTech /></div>
      <ConnectSection />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
