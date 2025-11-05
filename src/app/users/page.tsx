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
        "Tem certeza que deseja excluir essa conta? Essa ação não poderá ser desfeita."
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
        throw new Error("Erro ao excluir receita");
      }

      // Atualiza a lista após exclusão
      setUsers(users.filter((i) => i.idUsuario !== id));
      alert("Conta excluída com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir Conta. Tente novamente.");
    }
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <div className="mb-4">
        <Link
          href="/contas/novo"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nova Conta
        </Link>
      </div>

      <div className="text-center py-9">
        <h1 className="text-6xl font-bold">ControlFlow</h1>
        <h2 className="py-3 text-4xl font-medium text-gray-600">Users</h2>
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
                <th className="px-4 py-2 border">Senha</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 border">
                    Nenhum Usuário cadastrado.
                  </td>
                </tr>
              ) : (
                users.map((i) => (
                  <tr key={i.idUsuario} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border text-center">
                      {i.idUsuario}
                    </td>
                    <td className="px-4 py-2 border">{i.nomeUsuario}</td>
                    <td className="px-4 py-2 border">{i.senhaUsuario}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2 justify-center">
                        <Link
                          href={`/users/${i.idUsuario}/editar`}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(i.idUsuario)}
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

      <div className="mt-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Voltar para Home
        </Link>
      </div>
    </div>
  );
}
