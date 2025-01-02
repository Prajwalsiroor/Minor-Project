import { NextRequest, NextResponse } from "next/server";

// Initialize Stripe with your secret key from environment variables
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await req.json();
    const { items, email } = body;

    if (!items || !email) {
      return NextResponse.json({ error: 'Items and email are required' }, { status: 400 });
    }

    // Prepare line items for Stripe Checkout
    const orangedItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: Math.floor(item.price * 79), // Ensure price is in cents (multiply by 100 for USD)
      },
      quantity: item.quantity, // Use the actual quantity from the cart
    }));

    // Create a Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA'],
      },
      line_items: orangedItems,
      mode: 'payment',
      success_url: `${process.env.HOST}/success?session_id={CHECKOUT_SESSION_ID}`, // Use dynamic session ID in success URL
      cancel_url: `${process.env.HOST}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item: any) => item.image)),
      },
    });
    // Return the session ID to the frontend for redirection
    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return NextResponse.json({ error: 'Something went wrong, please try again' }, { status: 500 });
  }
}