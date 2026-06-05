import HeroSection from './HeroSection'
import KnowledgeSection from './KnowledgeSection'
import UnderstandingSection from './UnderstandingSection'
import UsageSection from './UsageSection'

export default function LandingPage() {
  return (
    <div dir="rtl" className="w-full min-h-screen bg-white">
      <HeroSection />
      <KnowledgeSection />
      <UnderstandingSection />
      <UsageSection />
      <footer
        dir="rtl"
        className="w-full bg-gray-800 text-white py-8 px-6 text-center"
      >
        <p className="text-lg font-bold mb-1">AgePlan</p>
        <p className="text-gray-400">
          כלי ציות תכנוני לסביבת מגורים לעת זקנה — מבוסס על תדריך משרד
          הבינוי והשיכון, 2024
        </p>
      </footer>
    </div>
  )
}
