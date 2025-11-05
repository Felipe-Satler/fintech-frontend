"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { User } from "@/types";

export default function EditarReceitaPage() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [password, setPassword] = useState("");
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

    fetchReceita();
  }, [id, router]);

  async function fetchReceita() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/despesas/${id}`
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar receita");
      }

      const data: User = await res.json();

      setIdUsuario(String(data.idUsuario));
      setNomeUsuario(data.nomeUsuario);
      setDataNasc(new Date(data.data_nasc).toISOString().split("T")[0]);
      setPassword(data.senhaUsuario);
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao carregar despesas");
      router.push("/despesas");
    } finally {
      setLoadingData(false);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const User = {
        idUsuario: Number(idUsuario),
        nomeUsuario: String(nomeUsuario),
        DataNasc: new Date(dataNasc).toISOString(),
        password: password
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(User),
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao atualizar receita");
      }

      alert("Receita atualizada com sucesso!");
      router.push("/users");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao atualizar usuário. Verifique os dados e tente novamente.");
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
      <h1 className="text-4xl font-bold mb-6">Editar Usuário</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="idUser"
            className="block text-gray-700 font-bold mb-2"
          >
            ID do Usuário *
          </label>
          <input
            type="number"
            id="idUser"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

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
            htmlFor="valorUser"
            className="block text-gray-700 font-bold mb-2"
          >
            Valor da User *
          </label>
          <input
            type="number"
            id="valorUser"
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
            Data da Receita *
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
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
          <Link href="/despesas" className="text-blue-600 hover:underline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
