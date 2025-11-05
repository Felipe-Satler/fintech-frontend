"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Receita } from "@/types";

export default function ReceitasPage() {
  const [loading, setLoading] = useState(true);
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchReceitas();
  }, [router]);

  async function fetchReceitas() {
    try {
      const res = await fetch("/api/receitas");

      if (!res.ok) {
        throw new Error("Erro ao buscar receitas");
      }

      const data = await res.json();
      setReceitas(data);
    } catch (err) {
      console.error("Erro:", err);
      setReceitas([]);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "Tem certeza que deseja excluir essa receita? Essa ação não poderá ser desfeita."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/receitas/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao excluir receita");
      }

      // Atualiza a lista após exclusão
      setReceitas(receitas.filter((r) => r.idReceita !== id));
      alert("Receita excluída com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir receita. Tente novamente.");
    }
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <div className="mb-4">
        <Link
          href="/receitas/novo"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nova Receita
        </Link>
      </div>

      <div className="text-center py-9">
        <h1 className="text-6xl font-bold">ControlFlow</h1>
        <h2 className="py-3 text-4xl font-medium text-gray-600">Receitas</h2>
      </div>

      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Nome</th>
                <th className="px-4 py-2 border">Valor</th>
                <th className="px-4 py-2 border">Data</th>
                <th className="px-4 py-2 border">Descrição</th>
                <th className="px-4 py-2 border">Ações</th>
              </tr>
            </thead>
            <tbody>
              {receitas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 border">
                    Nenhuma receita cadastrada.
                  </td>
                </tr>
              ) : (
                receitas.map((r) => (
                  <tr key={r.idReceita} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border text-center">
                      {r.idReceita}
                    </td>
                    <td className="px-4 py-2 border">{r.nomeReceita}</td>
                    <td className="px-4 py-2 border text-right">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(r.valorReceita)}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {new Date(r.dataReceita).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-2 border">
                      {r.descricaoReceita || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2 justify-center">
                        <Link
                          href={`/receitas/${r.idReceita}/editar`}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(r.idReceita)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Voltar para Home
        </Link>
      </div>
    </div>
  );
}
