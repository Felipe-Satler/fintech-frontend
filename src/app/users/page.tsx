"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function UsersPage() {
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
            const res = await fetch('', {
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
        <form onSubmit={handleSubmit} className="bg-blue-200 max-w-md mx-auto space-y-5 p-8">
            {error && <div className="text-red-500 mb-4">{error}</div>}
          <div>
            <label htmlFor="userName"></label>
            <input
              value={username}
              type="text"
              id="userName"
              name="user"
              placeholder="Usuário"
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              value={password}
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="">Esqueceu a senha?</a>
          </div>
          <button
            type="submit"
            className="bg-black text-3xl text-white border-none items-center content-center py-4 px-18 rounded-lg cursor-pointer font-bold hover:bg-gray-400 hover:text-black duration-200"
          >
            Entrar
          </button>
          <p>
            Não tem uma conta? <a href="">Cadastre-se!</a>
          </p>
        </form>
      </div>
    );
}