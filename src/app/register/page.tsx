"use client";
import Link from "next/link";
import { api } from "@/utils/apiBack/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  // Função para fazer cadastro
  async function handleRegister(data: FormData) {
    const name = data.get("name")?.toString();
    const email = data.get("email");
    const password = data.get("password");

    // Transforma o primeiro caractere em maiúsculo do name
    const capitalizedName = name
      ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      : "";

    try {
      await api.post("/users", {
        name: capitalizedName,
        email,
        password,
      });

      router.push("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  }

  return (
    <main className="h-174 w-full container mx-auto flex justify-center items-center">
      <section className="text-white font-medium w-3/10 flex flex-col items-center p-4  gap-3 ">
        <h1 className="text-3xl w-full text-center">Cadastrar conta</h1>
        <form
          action={handleRegister}
          className="flex flex-col gap-3 mt-4 w-full items-center"
        >
          <input
            className="border border-slate-400 py-1 px-2 rounded-md bg-zinc-950 w-8/10"
            type="text"
            name="name"
            id="name"
            placeholder="Nome"
            required
          />
          <input
            className="border border-slate-400 py-1 px-2 rounded-md bg-zinc-950 w-8/10"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
          <input
            className="border border-slate-400 py-1 px-2 rounded-md bg-zinc-950 w-8/10"
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            required
          />
          <button
            type="submit"
            className="w-8/10 text-center cursor-pointer p-1 bg-slate-950 rounded-md flex items-center justify-center gap-2
            transition duration-500 hover:bg-slate-900
            "
          >
            Cadastrar
          </button>
        </form>

        <span className="flex gap-2">
          Já tem conta?{" "}
          <Link
            href="/login"
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
