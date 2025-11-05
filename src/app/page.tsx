import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container mx-auto p-8">
      <header>
        <div>
          <Link href={"/users"}>Usuário</Link>
          <Link href={"/contas"}>Contas</Link>
        </div>
      </header>
      <h2 className="text-4xl font-bold mb-8">ControlFlow</h2>
      <div>
        <h3>Saldo em Conta</h3>
        <p>R$50000</p>
      </div>
      <nav>
        <Link href={"/despesas"}>Despesas</Link>
        <Link href={"/receitas"}>Receitas</Link>
      </nav>
      <nav>
        <Link href={"/despesas/novo"}>Adicionar Despesa</Link>
        <Link href={"/receitas/novo"}>Adicionar Receita</Link>
      </nav>
    </main>
  );
}
