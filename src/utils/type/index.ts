export interface MoviesProps {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
  genres: GeneroProps[];
  spoken_languages: AudioProps[];
  production_companies: ProductionCompanyProps[];
  homepage: string;
  production_countries: ProductionCountryProps[];
}

interface GeneroProps {
  id: number;
  name: string;
}

interface AudioProps {
  english_name: string;
}

interface ProductionCompanyProps {
  id: number;
  logo_path: string;
  name: string;
}

interface ProductionCountryProps {
  iso_3166_1: string;
  name: string;
}

export interface NewMoviesProps {
  id: string;
  title: string;
  filmeId: string;
  language: string;
  release_data: string;
  genres: GenresProps[];
  user_id: string;
}

interface GenresProps {
  genre: {
    id: number;
    name: string;
  };
}
