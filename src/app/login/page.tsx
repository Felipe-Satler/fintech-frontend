"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState< string | null > (null)
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        try{
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({username, password})
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message)
            }

            localStorage.setItem("admin_token", data.token);
            router.push('/');

        } catch (err) {
            setError((err as Error).message ?? "Erro ao fazer login. Tente novamente.");
        }

    } 

    return (
      <div className="bg-linear-135 from-black via-neutral-900 to-neutral-950 container mx-auto p-8 min-h-screen min-w-screen">
        <div className="text-center py-9">
          <h1 className="text-8xl font-bold text-white">ControlFlow</h1>
          <h2 className="py-3 text-6xl font-medium text-gray-400">Login</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-5 p-8 text-center"
        >
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="text-lg mt-4 mb-5">
            <label htmlFor="userName" className=""></label>
            <input
              value={username}
              type="text"
              id="userName"
              name="user"
              placeholder="Usuário"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border-2 placeholder-white border-neutral-800 px-6 py-3 w-full"
            />
          </div>
          <div className="mt-4 mb-5 text-lg">
            <label htmlFor="password"></label>
            <input
              className="placeholder-white border-2 border-neutral-800 px-6 py-3 w-full"
              value={password}
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-white">
            <a href="" className="font-bold text-base hover:text-neutral-400 duration-100">
              Esqueceu a senha?
            </a>
          </div>
          <button
            type="submit"
            className="bg-black text-2xl text-white border-none items-center content-center py-4 px-18 rounded-lg cursor-pointer font-bold hover:bg-gray-400 hover:text-black duration-200"
          >
            Entrar
          </button>
          <p className="text-white hover:scale-105 duration-75">
            Não tem uma conta? <a href="" className="hover:font-mono" >Cadastre-se!</a>
          </p>
        </form>
      </div>
    );
}