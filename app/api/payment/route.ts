import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { NextRequest, NextResponse } from 'next/server';
import db from '@/utils/db';


export async function GET(req: NextRequest) {
    return NextResponse.json({ message: 'Hello, world!' });
  } 
export async function POST(req: NextRequest){

  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get('origin');
  const { propertyId } = await req.json();

  const property = await db.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) {
    return NextResponse.json(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }
  const {
    name,
  } = property;

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { propertyIdQuery: property.id },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',

            product_data: {
              name: `${name}`,
              description: `Stay in this wonderful place. Enjoy your stay!`,
            },
            unit_amount: 200 * 100,
          },
        },
      ],
      mode: 'payment',
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    return NextResponse.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};