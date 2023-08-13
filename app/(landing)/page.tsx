import LandingNavbar from "@/components/LandingNavbar";
import LandingPageContent from "@/components/LandingPageContent";
import LandingPageHero from "@/components/LandingPageHero";
import { auth } from "@clerk/nextjs";
export default function LandingPage() {
  const { userId } = auth()
  return (
    <div>
      <LandingNavbar/>
      <LandingPageHero/>
      <LandingPageContent/>
    </div>
  )
}
