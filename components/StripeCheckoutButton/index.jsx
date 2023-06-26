import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY =
  'pk_test_51MyZ7eQqeoZe3f8Bat1uRQ16dIWyOcwo8cyEP7cbLAgwMcas0IffRnjdFC9T9mhYPV83NC3uHlkFw57LwyHjWrI900LeVy2Qqq';
const STRIPE_PRICE_ID = 'price_1NQ7drQqeoZe3f8BWkWHESlm';

const StripeCheckoutButton = () => {
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleClick = async () => {
    const stripe = await stripePromise;
    const currentUrl = window.location.href;
    const successUrl = `${currentUrl}?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${currentUrl}`;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      mode: 'payment',
      successUrl: successUrl,
      cancelUrl: cancelUrl,
    });

    if (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('session_id')) {
      setPaymentStatus('success');
    }
  }, []);

  return (
    <div>
      {paymentStatus === 'success' ? (
        <p>Payment Completed!</p>
      ) : (
        <button onClick={handleClick} disabled={paymentStatus === 'success'}>
          Pay with Stripe
        </button>
      )}
    </div>
  );
};

export default StripeCheckoutButton;
