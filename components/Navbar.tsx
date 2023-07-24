import MobileSidebar from '@/components/MobileSidebar'
import { UserButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}
