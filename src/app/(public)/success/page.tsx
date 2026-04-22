"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");

  return (
    <div className="max-w-md p-8 bg-[#141414] border border-[#2B2B2B] rounded-sm shadow-lg">
      <h1 className="text-4xl text-[#E50914] mb-4 font-bold">Payment Successful!</h1>
      <p className="text-gray-300 mb-6">
        Thank you for your purchase. Your transaction was completed successfully.
      </p>
      {paymentIntentId && (
        <p className="text-sm text-gray-500 mb-8 border-t border-[#2B2B2B] pt-4">
          Transaction ID: <br />
          <span className="font-mono text-xs">{paymentIntentId}</span>
        </p>
      )}
      <Link 
        href="/" 
        className="inline-block bg-[#E50914] hover:bg-red-700 text-white px-6 py-3 rounded-sm font-medium transition"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#000000] py-10 text-center border-t-4 border-[#E50914]">
      <Suspense fallback={<div>Loading result...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
