import { UserButton } from "@clerk/nextjs";

export default function Dashbord() {
  return (
    <div>
      <p className='text-6xl text-green-500'>Dashboard Page</p>
      <UserButton afterSignOutUrl='/' />
    </div>

  )
}
