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
      const despesa = {
        nomeUsuario,
        password: (password),
        dataNasc: new Date(dataNasc).toISOString(),
      };

      const res = await fetch("/api/despesas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(despesa),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar despesa");
      }

      alert("Despesa cadastrada com sucesso!");
      router.push("/despesas");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao cadastrar despesa. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">Novo User</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="nomeUsuario"
            className="block text-gray-700 font-bold mb-2"
          >
            Nome da User *
          </label>
          <input
            type="text"
            id="nomeUsuario"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Senha do Usuário *
          </label>
          <input
            type="number"
            id="password"
            step="0.01"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dataUser"
            className="block text-gray-700 font-bold mb-2"
          >
            Data do Usuário *
          </label>
          <input
            type="date"
            id="dataUser"
            value={dataNasc}
            onChange={(e) => setDataNasc(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          >
            {loading ? "Cadastrando..." : "Cadastrar User"}
          </button>
          <Link href="/despesas" className="text-blue-600 hover:underline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
