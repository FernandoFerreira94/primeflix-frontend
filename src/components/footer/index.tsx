import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-10 py-10 border-t border-slate-700 bg-slate-900 text-center text-white ">
      <div className="container mx-auto flex flex-col items-center gap-2">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Primeflix — Projeto pessoal desenvolvido
          por Fernando Ferreira.
        </p>
        <p className="text-xs text-slate-500">
          Dados fornecidos pela{" "}
          <Link
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-300"
          >
            TMDB API
          </Link>
        </p>
        <div className="flex gap-4 text-sm text-slate-400">
          <Link
            href="https://github.com/FernandoFerreira94/primeflixnext"
            target="_blank"
            className="transition duration-500 hover:text-slate-300 "
          >
            GitHub
          </Link>
          <Link
            href="https://fernandodev.vercel.app"
            target="_blank"
            className="transition duration-500 hover:text-slate-300 "
          >
            Portfólio
          </Link>
          <Link
            href="https://www.linkedin.com/in/fernando-ferreira-78927b203/"
            className="transition duration-500 hover:text-slate-300 "
          >
            linkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
