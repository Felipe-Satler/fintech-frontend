"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NovaDespesaPage() {
  const [nomeDespesa, setNomeDespesa] = useState("");
  const [valorDespesa, setValorDespesa] = useState("");
  const [dataDespesa, setDataDespesa] = useState("");
  const [descricaoDespesa, setDescricaoDespesa] = useState("");
  const [idConta, setIdConta] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const despesa = {
        idConta: Number(idConta),
        nomeDespesa,
        valorDespesa: Number(valorDespesa),
        dataDespesa: new Date(dataDespesa).toISOString(),
        descricaoDespesa: descricaoDespesa || null,
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
      <h1 className="text-4xl font-bold mb-6">Nova Despesa</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="idConta"
            className="block text-gray-700 font-bold mb-2"
          >
            ID da Conta *
          </label>
          <input
            type="number"
            id="idConta"
            value={idConta}
            onChange={(e) => setIdConta(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nomeDespesa"
            className="block text-gray-700 font-bold mb-2"
          >
            Nome da Despesa *
          </label>
          <input
            type="text"
            id="nomeDespesa"
            value={nomeDespesa}
            onChange={(e) => setNomeDespesa(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="valorDespesa"
            className="block text-gray-700 font-bold mb-2"
          >
            Valor da Despesa *
          </label>
          <input
            type="number"
            id="valorDespesa"
            step="0.01"
            value={valorDespesa}
            onChange={(e) => setValorDespesa(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dataDespesa"
            className="block text-gray-700 font-bold mb-2"
          >
            Data da Despesa *
          </label>
          <input
            type="date"
            id="dataDespesa"
            value={dataDespesa}
            onChange={(e) => setDataDespesa(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="descricaoDespesa"
            className="block text-gray-700 font-bold mb-2"
          >
            Descrição (Opcional)
          </label>
          <textarea
            id="descricaoDespesa"
            value={descricaoDespesa}
            onChange={(e) => setDescricaoDespesa(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          >
            {loading ? "Cadastrando..." : "Cadastrar Despesa"}
          </button>
          <Link href="/despesas" className="text-blue-600 hover:underline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
