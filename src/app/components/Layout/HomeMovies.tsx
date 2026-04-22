import { moviesRoute } from "../service/movie";
import { MOVIE } from "../types/movies.type";
import MovieCard from "./MovieCard";

export default async function HomeMovies() {
  const responseData = await moviesRoute.getMovies();
  const movies = Array.isArray(responseData) ? responseData : responseData?.data || [];
 
  return (
    <div className="bg-black p-6 md:p-12">
      {/* Heading */}
      <h2 className="text-xl md:text-3xl text-white text-center">Our Top Movies</h2>
      <h1 className="text-2xl text-white font-bold mb-6">All Movies</h1>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4   gap-6">
        {movies?.slice(0, 4).map((m: MOVIE) => (
          <MovieCard key={m.id} m={m} />
        ))}
      </div>
    </div>
  );
}
