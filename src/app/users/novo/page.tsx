"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NovoUserPage() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = {
        nomeUsuario,
        senhaUsuario: password,
        data_nasc: new Date(dataNasc).toISOString(),
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar usuário");
      }

      alert("Usuário cadastrado com sucesso!");
      router.push("/users");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-7xl font-bold mb-6 text-center text-white py-3.5">
        Novo Usuário
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-transparent border-2 border-neutral-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4 text-neutral-500">
          <label
            htmlFor="nomeUsuario"
            className="block font-bold mb-2"
          >
            Nome do Usuário *
          </label>
          <input
            type="text"
            id="nomeUsuario"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4 text-neutral-500">
          <label
            htmlFor="password"
            className="block font-bold mb-2"
          >
            Senha *
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
            minLength={6}
          />
        </div>

        <div className="mb-4 text-neutral-500">
          <label
            htmlFor="dataNasc"
            className="block font-bold mb-2"
          >
            Data de Nascimento *
          </label>
          <input
            type="date"
            id="dataNasc"
            value={dataNasc}
            onChange={(e) => setDataNasc(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="text-xl cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          >
            {loading ? "Cadastrando..." : "Cadastrar Usuário"}
          </button>
          <Link href="/users" className="text-blue-600 mt-6 text-lg hover:underline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
