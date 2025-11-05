"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ContasPage() {
  const [loading, setLoading] = useState(true);
  const [contas, setContas] = useState<Contas[]>([]);
  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "Tem certeza que deseja excluir essa conta? Essa ação não poderá ser desfeita."
      )
    )
      return;
  };
  

  return (
    <div className="bg-linear-135 from-black via-neutral-900 to-neutral-950 container mx-auto p-8 min-h-screen min-w-screen">
      <Link href={"/contas/novo"}>Adicionar Conta</Link>
      <div className="text-center py-9">
        <h1 className="text-8xl font-bold text-white">{`${user.nome}`}</h1>
        <h2 className="py-3 text-6xl font-medium text-gray-400">Contas</h2>
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
                <th>DATA DE CRIAÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {contas.length === 0 && (
                <tr>
                  <td colSpan={5} className="">
                    Nenhuma despesa cadastrada.
                  </td>
                </tr>
              )}
              {contas.map((c) => (
                <tr key={c.id} className="text-sm">
                  <td className="">{c.idConta}</td>
                  <td className="">{c.nomeConta}</td>
                  <td className="">{c.dataDeCriacao}</td>
                  <td className="">
                    <Link
                      href={`/ contas / ${c.id} /editar`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded flex"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(c.id)}
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
