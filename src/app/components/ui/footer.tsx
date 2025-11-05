export default function Footer() {
    return (
        <footer className="flex items-center gap-5">
            <div className="mx-auto flex items-center justify-between p-3 text-sm">
                {new Date().getFullYear()} Fintech ControlFlow. Todos os direitos reservados.
            </div>
            <div className="mx-auto flex items-center justify-between p-3 text-sm">
                Contato com o suporte.
            </div>
        </footer>
    );
}