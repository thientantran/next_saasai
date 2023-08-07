import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
export default function LandingPage() {
  const { userId } = auth()
  if(userId){
    redirect("/dashboard")
  }
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
    </div>
  )
}
