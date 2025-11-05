"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Despesa } from "@/types";

export default function DespesasPage() {
  const [loading, setLoading] = useState(true);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchDespesas();
  }, [router]);

  async function fetchDespesas() {
    try {
      const res = await fetch("/api/despesas");

      if (!res.ok) {
        throw new Error("Erro ao buscar despesas");
      }

      const data = await res.json();
      setDespesas(data);
    } catch (err) {
      console.error("Erro:", err);
      setDespesas([]);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "Tem certeza que deseja excluir essa despesa? Essa ação não poderá ser desfeita."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/despesas/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao excluir despesa");
      }

      setDespesas(despesas.filter((d) => d.idDespesa !== id));
      alert("Despesa excluída com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir despesa. Tente novamente.");
    }
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <div className="mb-4">
        <Link
          href="/despesas/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nova Despesa
        </Link>
      </div>

      <div className="text-center py-9">
        <h1 className="text-8xl font-bold text-white">ControlFlow</h1>
        <h2 className="py-3 text-4xl font-medium text-gray-600">Despesas</h2>
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
              </tr>
            </thead>
            <tbody>
              {despesas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 border">
                    Nenhuma despesa cadastrada.
                  </td>
                </tr>
              ) : (
                despesas.map((d) => (
                  <tr key={d.idDespesa} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border text-center">
                      {d.idDespesa}
                    </td>
                    <td className="px-4 py-2 border">{d.nomeDespesa}</td>
                    <td className="px-4 py-2 border text-right">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(d.valorDespesa)}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {new Date(d.dataDespesa).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-2 border">
                      {d.descricaoDespesa || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2 justify-center">
                        <Link
                          href={`/despesas/${d.idDespesa}/editar`}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(d.idDespesa)}
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
