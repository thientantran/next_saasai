'use client'

import { Button } from "@/components/ui/button"
import axios from "axios"
import { Zap } from "lucide-react"
import { useState } from "react"

export default function SubscriptionButton({isPro = false}: {isPro: boolean}) {
  const [loading, setLoading] = useState(false)
  const onClick = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/stripe");
      console.log
      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
    }finally{
      setLoading(false)
    }
  }
  return (
    <Button variant={isPro ? "default" : "premium"} disabled={loading} onClick={onClick}>
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
    </Button>
  )
}
