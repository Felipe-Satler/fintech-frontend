"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ReceitasPage() {
  const [loading, setLoading] = useState(true);
  const [receitas, setReceitas] = useState<Receitas[]>([]);
  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "Tem certeza que deseja excluir essa Receita? Essa ação não poderá ser desfeita."
      )
    )
      return;
  };

  return (
    <div className="bg-linear-135 from-black via-neutral-900 to-neutral-950 container mx-auto p-8 min-h-screen min-w-screen">
      <Link href={"/receitas/novo"}>Adicionar Receita</Link>
      <div className="text-center py-9">
        <h1 className="text-8xl font-bold text-white">ControlFlow</h1>
        <h2 className="py-3 text-6xl font-medium text-gray-400">receitas</h2>
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
              {receitas.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Nenhuma receita cadastrada.
                  </td>
                </tr>
              )}
              {receitas.map((r) => (
                <tr key={r.idReceita} className="text-sm">
                  <td className="">{r.idReceita}</td>
                  <td className="">{r.nomeReceita}</td>
                  <td className="">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(r.valorReceitas)}
                  </td>
                  <td className="">{r.dataReceita}</td>
                  <td className="">{r.descricaoReceita}</td>
                  <td className="">
                    <Link
                      href={`/ receitas / ${r.id} /editar`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded flex"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(r.id)}
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
