import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setMessage(""); // ✅ Clear previous messages

        if (!stripe || !elements) {
        setMessage("Stripe has not loaded yet. Please wait.");
        setIsProcessing(false);
        return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: "https:///voxleads-api-stg-bv7a.uc.r.appspot.com/success",
        },
        redirect: "if_required",
        });

        if (error) {
        setMessage(error.message);
        } else if (paymentIntent.status === "succeeded") {
        setMessage("✅ Payment successful! Redirecting...");
        setTimeout(() => {
            window.location.href = "/admin/dashboard"; // ✅ Redirect after success
        }, 3000);
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
        <PaymentElement />
        <button type="submit" disabled={isProcessing || !stripe}>
            {isProcessing ? "Processing..." : "Pay Now"}
        </button>
        {message && <p>{message}</p>}
        </form>
    );
};

export default CheckoutForm;
