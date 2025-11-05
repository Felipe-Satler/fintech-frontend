
"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Conta } from "@/types";

export default function EditarContaPage() {
  const [nomeConta, setNomeConta] = useState("");
  const [saldoAtual, setSaldoAtual] = useState("");
  const [dataConta, setDataConta] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
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

    fetchConta();
  }, [id, router]);

  async function fetchConta() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contas/${id}`
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar conta");
      }

      const data: Conta = await res.json();

      setIdUsuario(String(data.idUsuario));
      setNomeConta(data.nomeConta);
      setSaldoAtual(String(data.saldoAtual));
      // Converte data para formato yyyy-MM-dd
      setDataConta(new Date(data.dataCriacao).toISOString().split("T")[0]);
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao carregar conta");
      router.push("/contas");
    } finally {
      setLoadingData(false);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const conta = {
        idUsuario: Number(idUsuario),
        nomeConta,
        saldoAtual: Number(saldoAtual),
        dataConta: new Date(dataConta).toISOString()
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contas/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(conta),
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao atualizar conta");
      }

      alert("conta atualizada com sucesso!");
      router.push("/contas");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao atualizar conta. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="container mx-auto p-8 max-w-2xl">
        <p className="text-center">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">Editar conta</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="idUsuario"
            className="block text-gray-700 font-bold mb-2"
          >
            ID da Conta *
          </label>
          <input
            type="number"
            id="idUsuario"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nomeConta"
            className="block text-gray-700 font-bold mb-2"
          >
            Nome da conta *
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
            Valor da conta *
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
            htmlFor="dataConta"
            className="block text-gray-700 font-bold mb-2"
          >
            Data da conta *
          </label>
          <input
            type="date"
            id="dataConta"
            value={dataConta}
            onChange={(e) => setDataConta(e.target.value)}
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
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
          <Link href="/contas" className="text-blue-600 hover:underline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
