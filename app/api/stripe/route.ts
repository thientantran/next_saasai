import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
const settingUrl = absoluteUrl("/settings")
// stripe needs absolute url
export async function GET(){
  try {
    const {userId} = auth()
    const user = await currentUser()

    if(!userId || !user){
      return new NextResponse("Unuthorized", {status:401})
    }
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId
      }
    })

    if(userSubscription && userSubscription.stripeCustomerId){
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrl
      })
      return new NextResponse(JSON.stringify({url: stripeSession.url}))
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingUrl,
      cancel_url: settingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data:{
            currency: "USD",
            product_data:{
              name: "Genius Pro",
              description: "Unlimited AI Generations"
            },
            unit_amount:2000,
            // 2000 => 20$
            recurring: {
              interval:'month'
            }
          },
          quantity:1,
        }
      ],
      // cái này rất quan trọng, do những cái ở trên chỉ là để hiện lên cái page thanh toán, sau khi thanh toán thành công thì sẽ tạo 1 cái webhook để cache lại, đọc cái metadata để biết user nào
      metadata: {
        userId
      }
    })
    return new NextResponse(JSON.stringify({url: stripeSession.url}))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error)
    return new NextResponse("Internal error", {status:500})
  }
}