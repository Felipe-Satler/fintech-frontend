"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Conta } from "@/types";

export default function ContasPage() {
  const [loading, setLoading] = useState(true);
  const [contas, setContas] = useState<Conta[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchContas();
  }, [router]);

  async function fetchContas() {
    try {
      const res = await fetch("/api/contas");

      if (!res.ok) {
        throw new Error("Erro ao buscar contas");
      }

      const data = await res.json();
      setContas(data);
    } catch (err) {
      console.error("Erro:", err);
      setContas([]);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "Tem certeza que deseja excluir essa conta? Essa ação não poderá ser desfeita."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contas/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao excluir receita");
      }

      // Atualiza a lista após exclusão
      setContas(contas.filter((c) => c.idConta !== id));
      alert("Conta excluída com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir Conta. Tente novamente.");
    }
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <div className="flex mb-4 justify-between">
        <div className="">
          <Link href="/" className="text-neutral-400 text-2xl rounded-lg border-2 border-neutral-800 hover:font-medium px-5 py-3">
            ← Voltar para Home
          </Link>
        </div>
        <div>
          <Link
            href="/contas/novo"
            className="cursor-pointer hover:font-medium rounded-lg border-2 border-neutral-800 text-2xl text-neutral-400 px-4 py-2"
          >
            + Nova Conta
          </Link>
        </div>
      </div>

      <div className="text-center py-9">
        <h1 className="text-8xl font-bold text-white">ControlFlow</h1>
        <h2 className="py-3 text-4xl font-medium text-gray-600">Contas</h2>
      </div>

      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent text-white border text-center">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Nome</th>
                <th className="px-4 py-2 border">Saldo Atual</th>
                <th className="px-4 py-2 border">Data de Criação</th>
                <th className="px-4 py-2 border">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 border">
                    Nenhuma Conta cadastrada.
                  </td>
                </tr>
              ) : (
                contas.map((c) => (
                  <tr key={c.idConta}>
                    <td className="px-4 py-2 border">
                      {c.idConta}
                    </td>
                    <td className="px-4 py-2 border">{c.nomeConta}</td>
                    <td className="px-4 py-2 border">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(c.saldoAtual)}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {new Date(c.dataCriacao).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-5 justify-center">
                        <Link
                          href={`/contas/${c.idConta}/editar`}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(c.idConta)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
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
    </div>
  );
}
