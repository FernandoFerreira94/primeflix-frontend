"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { toast } from "sonner";

import { saveAuthToken } from "../../actions/auth";
import { api } from "@/utils/apiBack/api";

export default function Login() {
  const router = useRouter();

  // Função para fazer login
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await api.post("/session", { email, password });
      const { token } = response.data;
      if (!token) {
        return;
      }

      // setando o token no cookie lado do client
      Cookies.set("primeflixToken", token, {
        expires: 7,
        path: "/",
      });

      // setando o token no cookie lado do server
      await saveAuthToken(token);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Email ou senha incorretos");
    }
  }

  return (
    <main className="h-174 w-full container mx-auto flex justify-center items-center">
      <section className="text-white w-3/10 flex flex-col items-center p-4  gap-3 ">
        <h1 className="text-2xl w-full text-center">Faça seu login</h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-3 mt-4 w-full items-center"
        >
          <input
            className="border border-slate-400 p-1 rounded-md bg-zinc-950 w-8/10"
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
            required
          />
          <input
            className="border border-slate-400 p-1 rounded-md bg-zinc-950 w-8/10"
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            required
          />
          <button
            type="submit"
            className="w-8/10 text-center cursor-pointer p-1 bg-slate-950 rounded-md flex items-center justify-center gap-2
            transition duration-500 hover:bg-slate-900
            "
          >
            Login <MdEmail size={25} color="white" />
          </button>
        </form>

        <span>
          Faça seu cadastro{" "}
          <Link
            href="/register"
            className="underline text-blue-500 
          transition duration-500 hover:text-blue-400
          "
          >
            clica aqui
          </Link>{" "}
        </span>
      </section>
    </main>
  );
}
