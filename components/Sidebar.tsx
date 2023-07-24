
'use client'

import { cn } from "@/lib/utils"
import { LayoutDashboard } from "lucide-react"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const poppins = Montserrat({ weight: "600", subsets: ['latin'] })
export default function Sidebar() {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full text-white bg-[#111827]">
      <div className="px-3 py-2 flex-1">
        <Link href='/dashboard' className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt='logo' src='/logo.png' />
          </div>
          <h1 className={cn("text-2l font-bold", poppins.className)}>
            {/* kết hợp class để sử dụng font chữ */}
            Genius
          </h1>
        </Link>
        <div className="space-y-1">
          <Link href='/dashboard' className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition')}>
            <LayoutDashboard className="h-5 w-5 mr-3" /> Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
