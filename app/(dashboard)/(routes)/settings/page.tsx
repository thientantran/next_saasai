import Heading from '@/components/Heading'
import SubscriptionButton from '@/components/SubscriptionButton'
import { checkSubscription } from '@/lib/subscription'
import { Settings } from 'lucide-react'

export default async function SettingPage() {
  const isPro = await checkSubscription()
  return (
    <div>
      <Heading
        title='Settings'
        description='Mange account settings'
        icon={Settings}
        iconColor='text-gray-700'
        bgColor='text-gray-700/10'
      />
      <div className="px-4 space-y-4 lg:px-8">
        <div className="text-muted-foreground text-sm">
        {isPro ? "You are currently on a Pro plan." : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}
