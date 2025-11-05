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

      // Carrega os produtos via API Route
      async function fetchDespesas() {
        try {
          const res = await fetch("/api/despesas");
          let data = [];
          if (res.ok) {
            data = await res.json();
          }
          setDespesas(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }

      fetchDespesas();
    }, [router]);

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir essa despesa? Essa ação não poderá ser desfeita.")) return;
    }

    return (
      <div className="bg-linear-135 from-black via-neutral-900 to-neutral-950 container mx-auto p-8 min-h-screen min-w-screen">
        <Link href={"/despesas/novo"}>Adicionar Receita</Link>
        <div className="text-center py-9">
          <h1 className="text-8xl font-bold text-white">ControlFlow</h1>
          <h2 className="py-3 text-6xl font-medium text-gray-400">Despesas</h2>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOME</th>
                  <th>VALOR</th>
                  <th>DATA</th>
                  <th>NOTAS</th>
                </tr>
              </thead>
              <tbody>
                {despesas.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      Nenhuma despesa cadastrada.
                    </td>
                  </tr>
                )}
                {despesas.map((d) => (
                  <tr key={d.idDespesa} className="text-sm">
                    <td className="">{d.idDespesa}</td>
                    <td className="">{d.nomeDespesa}</td>
                    <td className="">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(d.valorDespesa)}
                    </td>
                    <td className="">{d.dataDespesa}</td>
                    <td className="">{d.descricaoDespesa}</td>
                    <td className="">
                      <Link
                        href={`/ despesas / ${d.idDespesa} /editar`}
                        className="px-3 py-1 bg-yellow-500 text-white rounded flex"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(d.idDespesa)}
                        className="px-3 py-1 bg-red-600 text-white rounded flex"
                      >
                        {" "}
                        Excluir{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
}