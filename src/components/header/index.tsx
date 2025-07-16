import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

import { api } from "@/utils/apiBack/api";
import { LogoutButton } from "./logoutButton";
import Logo from "@/assests/logoTransparente.png";

export default async function Header() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("primeflixToken")?.value;

  let user = null;

  if (token) {
    try {
      const { data } = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      user = data;
    } catch (error) {
      console.warn("Token inválido ou expirado");
    }
  }

  return (
    <header className="w-full mt-3 bg-transparent flex  justify-center ">
      <nav className="container  flex items-center justify-between  max-sm:px-4">
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo Primeflix"
            quality={100}
            priority={true}
            width={125}
            height={125}
            className="w-auto h-auto"
          />
        </Link>

        {user ? (
          <div
            className="flex gap-5 h-full items-center 
            max-sm:gap-0"
          >
            <span className="text-white max-sm:hidden">
              Seja bem vindo{" "}
              <span className="font-bold text-red-600">{user.name}</span>
            </span>
            <Link
              href="/my-movies"
              className="bg-red-600 rounded-xl px-2 flex justify-center items-center py-1  text-gray-100 text-md font-medium 
             transition duration-500 hover:bg-red-700 cursor-pointer
             max-sm:mr-5"
            >
              Meu filmes
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <button
            className="bg-red-600 rounded-xl w-18 flex justify-center items-center py-1  text-gray-100 text-md font-medium 
            transition duration-500 hover:bg-red-700 cursor-pointer"
          >
            <Link href="/login" className="text-sm">
              Login
            </Link>
          </button>
        )}
      </nav>
    </header>
  );
}
