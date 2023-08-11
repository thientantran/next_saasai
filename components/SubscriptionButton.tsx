'use client'

import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { useState } from "react"

export default function SubscriptionButton({isPro = false}: {isPro: boolean}) {
  const [loading, setLoading] = useState(false)
  return (
    <Button variant={isPro ? "default" : "premium"} disabled={loading}>
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
    </Button>
  )
}
