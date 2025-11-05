"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NovaReceitaPage() {
  const [nomeReceita, setNomeReceita] = useState("");
  const [valorReceita, setValorReceita] = useState("");
  const [dataReceita, setDataReceita] = useState("");
  const [descricaoReceita, setDescricaoReceita] = useState("");
  const [idConta, setIdConta] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const receita = {
        idConta: Number(idConta),
        nomeReceita,
        valorReceita: Number(valorReceita),
        dataReceita: new Date(dataReceita).toISOString(),
        descricaoReceita: descricaoReceita || null,
      };

      const res = await fetch("/api/receitas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receita),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar receita");
      }

      alert("Receita cadastrada com sucesso!");
      router.push("/receitas");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao cadastrar receita. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">Nova Receita</h1>

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
            htmlFor="nomeReceita"
            className="block text-gray-700 font-bold mb-2"
          >
            Nome da Receita *
          </label>
          <input
            type="text"
            id="nomeReceita"
            value={nomeReceita}
            onChange={(e) => setNomeReceita(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="valorReceita"
            className="block text-gray-700 font-bold mb-2"
          >
            Valor da Receita *
          </label>
          <input
            type="number"
            id="valorReceita"
            step="0.01"
            value={valorReceita}
            onChange={(e) => setValorReceita(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dataReceita"
            className="block text-gray-700 font-bold mb-2"
          >
            Data da Receita *
          </label>
          <input
            type="date"
            id="dataReceita"
            value={dataReceita}
            onChange={(e) => setDataReceita(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="descricaoReceita"
            className="block text-gray-700 font-bold mb-2"
          >
            Descrição (Opcional)
          </label>
          <textarea
            id="descricaoReceita"
            value={descricaoReceita}
            onChange={(e) => setDescricaoReceita(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
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
