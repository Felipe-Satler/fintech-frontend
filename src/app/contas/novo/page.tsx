"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NovaContaPage() {
  const [idUsuario, setIdUsuario] = useState("");
  const [nomeConta, setNomeConta] = useState("");
  const [saldoAtual, setSaldoAtual] = useState("");
  const [dataCriacao, setDataCriacao] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const conta = {
    idUsuario: Number(idUsuario),
    nomeConta,
    saldoAtual: Number(saldoAtual),
    dataCriacao: new Date(dataCriacao).toISOString(),
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const conta = {
        nomeConta,
        saldoAtual: Number(saldoAtual),
        dataConta: new Date(dataCriacao).toISOString(),
      };

      const res = await fetch("/api/contas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(conta),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar conta");
      }

      alert("conta cadastrada com sucesso!");
      router.push("/contas");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao cadastrar conta. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">Nova conta</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="nomeConta"
            className="block text-gray-700 font-bold mb-2"
          >
            Nome da Conta *
          </label>
          <input
            type="text"
            id="nomeConta"
            value={nomeConta}
            onChange={(e) => setNomeConta(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="saldoAtual"
            className="block text-gray-700 font-bold mb-2"
          >
            Valor da Receita *
          </label>
          <input
            type="number"
            id="saldoAtual"
            step="0.01"
            value={saldoAtual}
            onChange={(e) => setSaldoAtual(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dataCriacao"
            className="block text-gray-700 font-bold mb-2"
          >
            Data da Conta *
          </label>
          <input
            type="date"
            id="dataCriacao"
            value={dataCriacao}
            onChange={(e) => setDataCriacao(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          >
            {loading ? "Cadastrando..." : "Cadastrar Receita"}
          </button>
          <Link href="/receitas" className="text-blue-600 hover:underline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
