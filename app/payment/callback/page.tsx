import RazorpayLinkHandler from "@/components/razorpay-link-handler";

export default function PaymentCallbackPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Payment Verification</h1>
      <RazorpayLinkHandler />
    </div>
  );
} 