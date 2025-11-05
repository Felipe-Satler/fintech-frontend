"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { User } from "@/types";

export default function EditarUsuarioPage() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [password, setPassword] = useState("");
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

    fetchUsuario();
  }, [id, router]);

  async function fetchUsuario() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}` 
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar usuário");
      }

      const data: User = await res.json();

      setNomeUsuario(data.nomeUsuario);
      setDataNasc(new Date(data.data_nasc).toISOString().split("T")[0]);
      setPassword(""); 
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao carregar usuário");
      router.push("/users");
    } finally {
      setLoadingData(false);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const usuario = {
        nomeUsuario,
        data_nasc: new Date(dataNasc).toISOString(),
        ...(password && { senhaUsuario: password }) 
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      alert("Usuário atualizado com sucesso!");
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
        <p className="text-center text-white">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl text-center">
      <h1 className="text-6xl font-bold mb-5 mt-4 text-neutral-100">
        Editar Usuário
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-transparent border-2 border-neutral-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="nomeUsuario"
            className="block text-neutral-500 font-bold mb-2"
          >
            Nome do Usuário *
          </label>
          <input
            type="text"
            id="nomeUsuario"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            className="shadow appearance-none border-2 border-neutral-800 rounded w-full py-2 px-3 text-neutral-600 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-neutral-500 font-bold mb-2"
          >
            Nova Senha (deixe em branco para não alterar)
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border-2 border-neutral-800 rounded w-full py-2 px-3 text-neutral-600 leading-tight focus:outline-none focus:shadow-outline"
            minLength={6}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dataNasc"
            className="block text-neutral-500 font-bold mb-2"
          >
            Data de Nascimento *
          </label>
          <input
            type="date"
            id="dataNasc"
            value={dataNasc}
            onChange={(e) => setDataNasc(e.target.value)}
            className="shadow appearance-none border-2 border-neutral-800 rounded w-full py-2 px-3 text-neutral-600 leading-tight focus:outline-none focus:shadow-outline"
            required
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
          <Link href="/users" className="text-blue-600 text-base mt-6 hover:underline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}