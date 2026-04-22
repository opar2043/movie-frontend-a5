import React from "react";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-[#2B2B2B] pb-4">
        <Heart className="w-8 h-8 text-[#E50914]" />
        <h1 className="text-3xl font-bold text-white">My Favorites</h1>
      </div>

      <div className="bg-[#000000] border border-[#2B2B2B] rounded-lg p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <Heart className="w-16 h-16 text-[#E50914]/20 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">No Favorites Yet</h2>
        <p className="text-gray-400 max-w-md">
          You haven't added any movies to your favorites list yet. 
          Browse the movie catalog and click the heart icon to add them here.
        </p>
      </div>
    </div>
  );
}
