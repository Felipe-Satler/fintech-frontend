import Link from "next/link";

export default function Footer() {
    return (
      <footer className="flex items-center gap-5">
        <div className="mx-auto flex items-center justify-between p-3 text-base text-gray-400">
          {new Date().getFullYear()} Fintech ControlFlow. Todos os direitos
          reservados.
        </div>
        <div className="mx-auto flex items-center justify-between p-3 text-base text-gray-400 cursor-pointer hover:scale-110 duration-150">
          <Link href={'/suporte'}>Contato com o suporte.</Link>
        </div>
      </footer>
    );
}