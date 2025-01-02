import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import axios from 'axios';
import { supabase } from '@/lib/supabase/products';
import { useAppSelector } from '@/lib/supabase/hooks/redux';
import { getCart } from '@/redux/cartSlice';

// Stripe Promise Initialization
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const OrderSummary = ({ totalPrice }: { totalPrice: number }) => {
  const [loading, setLoading] = useState(false);  // Add loading state
  const cart = useAppSelector(getCart);

  const createStripeSession = async () => {
    try {
      setLoading(true); // Set loading state to true

      const { data: { user } } = await supabase.auth.getUser();

      // Check if Stripe is loaded
      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe is not loaded.");
        setLoading(false); // Set loading state to false in case of error
        return;
      }

      // Create Checkout Session with backend
      const checkoutSession = await axios.post("/api/checkout-sessions", {
        items: cart,
        email: user?.email,
      });

      if (!checkoutSession?.data?.id) {
        console.error("Checkout session ID not returned");
        setLoading(false); // Set loading state to false in case of error
        return;
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result?.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    } finally {
      setLoading(false); // Set loading state to false after completion
    }
  };

  return (
    <div className="border border-gray p-4 mt-5 h-fit text-black">
      <div>
        <h1 className="font-bold text-xl mb-5">Order Summary</h1>
        <div className="text-xs">
          <div className="flex items-center justify-between">
            <p>Items</p>
            <p>₹749.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Delivery:</p>
            <p>₹40.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Total:</p>
            <p>₹789.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Promotion Applied:</p>
            <p>-₹40.00</p>
          </div>
          <div className="flex justify-between text-2xl font-bold text-[#B12704] py-2 border-t border-b border-gray-300 my-1">
            <h1>Order Total:</h1>
            <h1>{`₹${totalPrice}`}</h1>
          </div>
        </div>

        {/* Conditional Button Rendering */}
        <button
          onClick={createStripeSession}
          className="bg-[#FFD814] w-full rounded-md px-4 py-1 my-3"
          disabled={loading}  // Disable the button while loading
        >
          {loading ? "Processing..." : "Place Your Order Now"} {/* Show loading text */}
        </button>
      </div>
    </div>
  );
};
export default OrderSummary;
