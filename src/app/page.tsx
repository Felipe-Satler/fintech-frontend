"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/login");
    } 
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/login");
  };

  return (
    <main className="container mx-auto p-8">
      <header>
        <div className="mb-5 text-end">
          <button
            onClick={handleLogout}
            className="bg-neutral-900 hover:scale-105 hover:text-red-950 hover:bg-neutral-800 duration-150 text-white text-2xl font-bold py-3 px-10 rounded cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </header>
      <div className="text-center py-12">
        <h1 className="text-8xl font-bold text-white mb-4">ControlFlow</h1>
        <p className="text-4xl text-gray-400">Home Page</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {/* Card Usuários */}
        <Link
          href="/users"
          className="bg-transparent border-2 border-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h3 className="text-xl font-bold mb-2 text-gray-300">Usuários</h3>
          <p className="text-gray-600">Gerencie usuários do sistema</p>
        </Link>

        {/* Card Contas */}
        <Link
          href="/contas"
          className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-neutral-800"
        >
          <h3 className="text-xl font-bold mb-2 text-gray-300">Contas</h3>
          <p className="text-gray-600">Administre suas contas bancárias</p>
        </Link>

        {/* Card Receitas */}
        <Link
          href="/receitas"
          className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-neutral-800"
        >
          <h3 className="text-xl font-bold mb-2 text-gray-300">Receitas</h3>
          <p className="text-gray-600">Registre suas receitas</p>
        </Link>

        {/* Card Despesas */}
        <Link
          href="/despesas"
          className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-neutral-800"
        >
          <h3 className="text-xl font-bold mb-2 text-gray-300">Despesas</h3>
          <p className="text-gray-600">Controle suas despesas</p>
        </Link>
      </div>
    </main>
  );
}
