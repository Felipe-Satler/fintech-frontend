"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Receita } from "@/types";

export default function EditarReceitaPage() {
  const [nomeReceita, setNomeReceita] = useState("");
  const [valorReceita, setValorReceita] = useState("");
  const [dataReceita, setDataReceita] = useState("");
  const [descricaoReceita, setDescricaoReceita] = useState("");
  const [idConta, setIdConta] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchReceita();
  }, [id, router]);

  async function fetchReceita() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/receitas/${id}`
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar receita");
      }

      const data: Receita = await res.json();

      setIdConta(String(data.idConta));
      setNomeReceita(data.nomeReceita);
      setValorReceita(String(data.valorReceita));
      setDataReceita(new Date(data.dataReceita).toISOString().split("T")[0]);
      setDescricaoReceita(data.descricaoReceita || "");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao carregar receita");
      router.push("/receitas");
    } finally {
      setLoadingData(false);
    }
  }

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

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/receitas/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(receita),
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao atualizar receita");
      }

      alert("Receita atualizada com sucesso!");
      router.push("/receitas");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao atualizar receita. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="container mx-auto p-8 max-w-2xl">
        <p className="text-center text-white">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl text-center">
      <h1 className="text-6xl font-bold mb-5 mt-4 text-neutral-100">
        Editar Receita
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-transparent border-2 border-neutral-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="idConta"
            className="block text-neutral-500 font-bold mb-2"
          >
            ID da Conta *
          </label>
          <input
            type="number"
            id="idConta"
            value={idConta}
            onChange={(e) => setIdConta(e.target.value)}
            className="shadow appearance-none border-2 border-neutral-800 rounded w-full py-2 px-3 text-neutral-600 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nomeReceita"
            className="block text-neutral-500 font-bold mb-2"
          >
            Nome da Receita *
          </label>
          <input
            type="text"
            id="nomeReceita"
            value={nomeReceita}
            onChange={(e) => setNomeReceita(e.target.value)}
            className="shadow appearance-none border-2 border-neutral-800 rounded w-full py-2 px-3 text-neutral-600 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="valorReceita"
            className="block text-neutral-500 font-bold mb-2"
          >
            Valor da Receita *
          </label>
          <input
            type="number"
            id="valorReceita"
            step="0.01"
            value={valorReceita}
            onChange={(e) => setValorReceita(e.target.value)}
            className="shadow appearance-none border-2 border-neutral-800 rounded w-full py-2 px-3 text-neutral-600 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dataReceita"
            className="block text-neutral-500 font-bold mb-2"
          >
            Data da Receita *
          </label>
          <input
            type="date"
            id="dataReceita"
            value={dataReceita}
            onChange={(e) => setDataReceita(e.target.value)}
            className="shadow appearance-none border-2 border-neutral-800 rounded w-full py-2 px-3 text-neutral-600 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="descricaoReceita"
            className="block text-neutral-500 font-bold mb-2"
          >
            Descrição (Opcional)
          </label>
          <textarea
            id="descricaoReceita"
            value={descricaoReceita}
            onChange={(e) => setDescricaoReceita(e.target.value)}
            className="shadow appearance-none border-2 border-neutral-800 rounded w-full py-2 px-3 text-neutral-600 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white text-base font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
          <Link href="/receitas" className="text-blue-600 text-base mt-6 hover:underline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}