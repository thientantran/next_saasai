import LandingNavbar from "@/components/LandingNavbar";
import LandingPageContent from "@/components/LandingPageContent";
import LandingPageHero from "@/components/LandingPageHero";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
export default function LandingPage() {
  const { userId } = auth()
  return (
    <div>Landing Page
      <div>
        <Link href='/sign-in'>
          <Button>
            Login
          </Button>
        </Link>
        <Link href='/sign-up'>
          <Button>
            Register
          </Button>
        </Link>
      </div>
      <LandingNavbar/>
      <LandingPageHero/>
      <LandingPageContent/>
    </div>
  )
}
