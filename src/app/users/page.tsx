"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@/types";

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchUsers();
  }, [router]);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");

      if (!res.ok) {
        throw new Error("Erro ao buscar users");
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Erro:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "Tem certeza que deseja excluir esse usuário? Essa ação não poderá ser desfeita."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao excluir usuário");
      }

      setUsers(users.filter((i) => i.idUsuario !== id));
      alert("Usuário excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir usuário. Tente novamente.");
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
            href="/users/novo"
            className="cursor-pointer hover:font-medium rounded-lg border-2 border-neutral-800 text-2xl text-neutral-400 px-4 py-2"
          >
            + Novo Usuário
          </Link>
        </div>
      </div>

      <div className="text-center py-9">
        <h1 className="text-8xl font-bold text-white">ControlFlow</h1>
        <h2 className="py-3 text-4xl font-medium text-gray-600">Usuários</h2>
      </div>

      {loading ? (
        <p className="text-center text-white">Carregando...</p>
      ) : (
        <div className="overflow-x-auto text-white">
          <table className="min-w-full border text-center">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Nome</th>
                <th className="px-4 py-2 border">Data de Nascimento</th>
                <th className="px-4 py-2 border">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 border">
                    Nenhum usuário cadastrado.
                  </td>
                </tr>
              ) : (
                users.map((i) => (
                  <tr key={i.idUsuario}>
                    <td className="px-4 py-2 border">{i.idUsuario}</td>
                    <td className="px-4 py-2 border">{i.nomeUsuario}</td>
                    <td className="px-4 py-2 border text-center">
                      {new Date(i.data_nasc).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-5 justify-center">
                        <Link
                          href={`/users/${i.idUsuario}/editar`}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(i.idUsuario)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-amber-800 cursor-pointer"
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