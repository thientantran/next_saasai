import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import React from 'react'

export default async function  DashboardLayyout ({ children }: { children: React.ReactNode }) {
  const apiLimitCount = await getApiLimitCount()
  return (
    <div className='h-full relative'>
      <div className="hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
        {/* chỗ này khi kích thước màn hình lớn hơn md (768px) thì có 2 cái display: none và display flex thì flex sẽ ghi đè none của hidden, nhưng khi nhỏ hơn 768px thì cái flex mất, thì cái hidden có hiệu lực, do đó display none */}
          <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className='md:pl-72'>
        <Navbar />
        {children}
      </main>
    </div>
  )
}
