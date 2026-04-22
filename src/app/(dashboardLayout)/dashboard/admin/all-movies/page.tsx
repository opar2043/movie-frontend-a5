import React from "react";
import { moviesRoute } from "@/src/app/components/service/movie";
import { Edit, Film, Calendar } from "lucide-react";
import Link from "next/link";
import DeleteMovieButton from "@/src/app/components/Layout/DeleteMovieButton";
import { MOVIE } from "@/src/app/components/types/movies.type";

export default async function AllMoviesPage() {
  const responseData = await moviesRoute.getMovies();
  const movies = Array.isArray(responseData) ? responseData : responseData?.data || [];

  return (
    <div className="w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Film className="w-6 h-6 text-[#E50914]" />
            Movie Catalog
          </h1>
          <p className="text-gray-400 mt-1">Manage and edit your entire movie library.</p>
        </div>
        <Link 
          href="/dashboard/admin/movies" 
          className="bg-[#E50914] hover:bg-red-700 text-white px-4 py-2 rounded-sm font-medium transition-colors text-sm text-center"
        >
          + Add New Movie
        </Link>
      </div>

      <div className="bg-[#141414] border border-[#2B2B2B] rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base whitespace-nowrap">
            <thead className="bg-[#000000] border-b border-[#2B2B2B] text-gray-300 uppercase font-semibold text-sm">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Director</th>
                <th className="px-6 py-4">Release Year</th>
                <th className="px-6 py-4">Pricing</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2B2B2B]">
              {movies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No movies found. Add one to get started!
                  </td>
                </tr>
              ) : (
                movies.map((movie: any) => (
                  <tr key={movie.id} className="hover:bg-[#2B2B2B] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {movie.posterUrl ? (
                          <img src={movie.posterUrl} alt={movie.title} className="w-10 h-10 rounded-sm object-cover border border-[#2B2B2B]" />
                        ) : (
                          <div className="w-10 h-10 rounded-sm bg-[#2B2B2B] flex items-center justify-center border border-[#2B2B2B]">
                            <Film className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <span className="font-medium text-white">{movie.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {movie.director || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {movie.releaseYear || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-sm text-xs font-semibold ${movie.pricing === 'PREMIUM' ? 'bg-[#E50914]/20 text-[#E50914]' : 'bg-[#2B2B2B] text-gray-300'}`}>
                        {movie.pricing || "FREE"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/admin/all-movies/${movie.id}`}
                          className="p-2 text-gray-400 hover:text-white hover:bg-[#2B2B2B] rounded-sm transition-colors"
                          title="Edit Movie"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteMovieButton id={movie.id} movieTitle={movie.title} />
                      </div>
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
