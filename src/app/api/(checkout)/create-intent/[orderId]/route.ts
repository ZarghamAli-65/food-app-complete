import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: Request, { params }: { params: Promise<{ orderId: string }> }) => {

    const { orderId } = await params;

    const order = await prisma.order.findUnique({
        where: {
            id: orderId,

        }
    })

    if (order) {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100 * 100,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            }
        });

        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                intent_id: paymentIntent.id
            }
        })

        return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 })


    } else {
        return new NextResponse(JSON.stringify({ message: "Order Not Found" }), { status: 404 })
    }
}