import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { ProjectOverview } from '@/components/ProjectOverview';
import { ProblemSection } from '@/components/ProblemSection';
import { ChallengeSection } from '@/components/ChallengeSection';
import { DesignGoals } from '@/components/DesignGoals';
import { UserFlow } from '@/components/UserFlow';
import { InformationArchitecture } from '@/components/InformationArchitecture';
import { WireframeGallery } from '@/components/WireframeGallery';
import { DesignSystem } from '@/components/DesignSystem';
import { HiFiTransition } from '@/components/HiFiTransition';
import { FlowOpsAppContainer } from '@/components/hifi/FlowOpsAppContainer';
import { ResponsiveShowcase } from '@/components/ResponsiveShowcase';
import { DesignDecisions } from '@/components/DesignDecisions';
import { Outcome } from '@/components/Outcome';
import { Reflection } from '@/components/Reflection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111827]">
      <Navigation />
      <Hero />
      <ProjectOverview />
      <ProblemSection />
      <ChallengeSection />
      <DesignGoals />
      <UserFlow />
      <InformationArchitecture />
      <WireframeGallery />
      <DesignSystem />
      <HiFiTransition />
      
      {/* High-Fidelity Interactive FlowOps Product Workspace */}
      <section className="py-12 bg-gray-900 px-4 sm:px-6 lg:px-8">
        <FlowOpsAppContainer />
      </section>

      <ResponsiveShowcase />
      <DesignDecisions />
      <Outcome />
      <Reflection />
      <Footer />
    </main>
  );
}
