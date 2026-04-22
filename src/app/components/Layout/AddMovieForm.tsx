'use client'
import { moviesRoute } from "@/src/app/components/service/movie";
import { Clapperboard, Calendar, Users, ListVideo, Link as LinkIcon, DollarSign } from "lucide-react";
import { toast } from "sonner";

export default function AddMovieForm() {


  async function createMovieAction(e : any){
     e.preventDefault();
     const frm = e.target;
     const title = frm.title.value;
     const synopsis = frm.synopsis.value;
     const releaseYear = parseInt(frm.releaseYear.value);
     const director = frm.director.value;
     const cast = frm.cast.value;
    const streamingPlatforms = frm.streamingPlatforms.value
  .split(",")
  .map((item: string) => item.trim())
  .filter(Boolean);
     const pricing = frm.pricing.value;
     const posterUrl = frm.posterUrl.value;
     const trailerUrl = frm.trailerUrl.value;
     const movie = {
      title,
      synopsis,
      releaseYear,
      director,
      cast,
      streamingPlatforms,
      pricing,
      posterUrl,
      trailerUrl,
     };
     console.log(movie);

     try {
      const response = await moviesRoute.createMovies(movie as any);
      console.log(response);
      toast.success("Movie added successfully");
     } catch (error: any) {
      console.error("Add movie error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to add movie");
     }
    //  redirect("/dashboard/admin/all-movies");
  }
  return (
    <div className="bg-[#141414] border border-[#2B2B2B] rounded-sm p-6 sm:p-8 shadow-sm w-full max-w-4xl mx-auto text-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <Clapperboard className="w-6 h-6 text-[#E50914]" />
          Add New Movie
        </h2>
        <p className="text-gray-400">Fill out the details to add a new movie to the CineVerse catalog.</p>
      </div>

      <form onSubmit={createMovieAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Movie Title</label>
            <input 
              name="title"
              required
              placeholder="Inception" 
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm text-lg"
            />
          </div>

          {/* Synopsis */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Synopsis</label>
            <textarea 
              name="synopsis"
              placeholder="A brief description of the movie..." 
              className="w-full bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm p-3 min-h-[100px]"
            />
          </div>

          {/* Release Year */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white" /> Release Year
            </label>
            <input 
              name="releaseYear"
              type="number" 
              placeholder="2010" 
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-white" /> Pricing Model
            </label>
            <select
              name="pricing"
              className="w-full bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm p-2.5 cursor-pointer hover:bg-[#2B2B2B]"
            >
              <option value="FREE">Free Tier</option>
              <option value="PREMIUM">Premium / Paid</option>
            </select>
          </div>

          {/* Director */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-white" /> Director
            </label>
            <input 
              name="director"
              placeholder="Christopher Nolan" 
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm" 
            />
          </div>

          {/* Cast */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-white" /> Cast
            </label>
            <input 
              name="cast"
              placeholder="Leonardo DiCaprio, Joseph Gordon-Levitt..." 
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm" 
            />
          </div>

          {/* Streaming Platforms */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <ListVideo className="w-4 h-4 text-white" /> Streaming Platforms
            </label>
            <input 
              name="streamingPlatforms"
              required
              placeholder="Netflix, Hulu, Amazon Prime (comma separated)" 
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm" 
            />
          </div>

          {/* Poster URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-white" /> Poster Cover URL
            </label>
            <input 
              name="posterUrl"
              placeholder="https://example.com/poster.jpg" 
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm" 
            />
          </div>

          {/* Trailer URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-white" /> Trailer Video URL
            </label>
            <input 
              name="trailerUrl"
              placeholder="https://youtube.com/watch?v=..." 
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm" 
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 mt-8 border-t border-[#2B2B2B]">
          <button 
            type="submit" 
            className="w-full md:w-auto md:px-12 bg-[#E50914] hover:bg-red-700 text-white font-medium py-3 rounded-sm transition-colors flex justify-center items-center ml-auto"
          >
            Add Movie to Catalog
          </button>
        </div>
      </form>
    </div>
  );
}

