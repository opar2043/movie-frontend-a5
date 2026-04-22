import ReviewModal from "@/src/app/components/Layout/ReviewModal";
import ReviewSlider from "@/src/app/components/Layout/ReviewSlider";
import { moviesRoute } from "@/src/app/components/service/movie";
import Image from "next/image";
import Link from "next/link";
import { Clapperboard, Star, Video, Ticket, User, Calendar } from "lucide-react";

export default async function ViewMovie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieData = await moviesRoute.getSingleMovies(id);
  const movie = movieData.data;
  return (
    <div className="min-h-screen bg-[#000000] pb-20">

      {/* Hero */}
      <div className="bg-[#141414] border-b border-[#2B2B2B]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">

          {/* Poster */}
          <div className="w-full md:w-72 shrink-0">
            <div className="aspect-[2/3] bg-[#2B2B2B] rounded-sm overflow-hidden border border-[#2B2B2B]">
              {movie.posterUrl ? (
                <Image
                  width={400}
                  height={600}
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-2">
                  <Clapperboard className="w-12 h-12" />
                  <p className="text-sm font-medium">No poster available</p>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5 grow">

            {/* Access badge + title */}
            <div className="flex flex-col gap-2">
              <span
                className={`w-fit px-3 py-1 rounded-sm text-[10px] font-semibold tracking-widest uppercase ${
                  movie.pricing === "FREE"
                    ? "bg-[#2B2B2B] text-gray-300 border border-[#2B2B2B]"
                    : "bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/20"
                }`}
              >
                {movie.pricing} Access
              </span>
              <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
                {movie.title}
              </h1>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-7 h-7 rounded-sm bg-[#2B2B2B] flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <span>Dir. <span className="font-medium text-white">{movie.director}</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-7 h-7 rounded-sm bg-[#2B2B2B] flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <span className="font-medium text-white">{movie.releaseYear}</span>
              </div>
            </div>

            {/* Synopsis */}
            <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
              {movie.synopsis || "No description available for this title."}
            </p>

            {/* Platforms */}
            {movie.streamingPlatforms?.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Streaming on</p>
                <div className="flex flex-wrap gap-2">
                  {movie.streamingPlatforms.map((platform: string, i: number) => (
                    <span
                      key={i}
                      className="bg-[#2B2B2B] border border-[#2B2B2B] text-gray-300 px-3 py-1 rounded-sm text-xs font-medium hover:border-[#E50914] hover:text-[#E50914] transition-colors cursor-default"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-[#2B2B2B] mt-auto">
              <Link href={`/checkout?movie=${id}`} className="inline-flex items-center gap-2 bg-[#E50914] hover:bg-red-700 text-white px-6 py-2.5 rounded-sm text-base font-semibold transition-all active:scale-95">
                <Ticket className="w-5 h-5" />
                Book ticket
              </Link>
              <ReviewModal movieId={id} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 space-y-14">

        {/* Trailer */}
        {movie.trailerUrl && (
          <section className="">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#E50914] rounded-sm flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Official trailer</h2>
                <p className="text-sm text-gray-400">Experience the thrill before watching</p>
              </div>
            </div>
            <div className="rounded-sm overflow-hidden border border-[#2B2B2B] bg-[#141414] aspect-video">
              <iframe
                src={movie.trailerUrl}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Reviews */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-[#141414] border border-[#2B2B2B] rounded-sm flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Audience reviews</h2>
              <p className="text-sm text-gray-400">What other movie enthusiasts are saying</p>
            </div>
          </div>
          <ReviewSlider movieId={id} />
        </section>

      </div>
    </div>
  );
}