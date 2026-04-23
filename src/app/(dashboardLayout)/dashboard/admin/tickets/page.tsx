import React from "react";
import { Ticket, Calendar, User, Film } from "lucide-react";
import { purchaseRoute } from "@/src/app/components/service/purchase";

export default async function TicketsPage() {
  const responseData = await purchaseRoute.getPurchase();
  const purchases = Array.isArray(responseData) ? responseData : responseData?.data || [];

  return (
    <div className="w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Ticket className="w-6 h-6 text-[#E50914]" />
            Purchased Tickets
          </h1>
          <p className="text-gray-400 mt-1">View all movie ticket purchases and rentals.</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#2B2B2B] rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#000000] border-b border-[#2B2B2B] text-gray-400 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Movie</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2B2B2B]">
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No tickets found.
                  </td>
                </tr>
              ) : (
                purchases.map((purchase: any) => (
                  <tr key={purchase.id} className="hover:bg-[#000000] transition-colors">
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                      {purchase.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-white">{purchase.user?.name || "Unknown User"}</p>
                          <p className="text-xs text-gray-500">{purchase.user?.email || "No email"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Film className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-white">{purchase.movie?.title || "Unknown Movie"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {purchase.createdAt ? new Date(purchase.createdAt).toLocaleDateString() : "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest ${
                        purchase.purchaseType === 'BUY' ? 'bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30' : 'bg-blue-900/20 text-blue-400 border border-blue-900/30'
                      }`}>
                        {purchase.purchaseType || 'BUY'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-white">
                      ${purchase.price?.toFixed(2) || "0.00"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
