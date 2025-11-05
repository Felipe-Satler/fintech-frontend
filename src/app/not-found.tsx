export default function notFound() {
    return (
      <div className="container text-center min-h-screen min-w-screen justify-center">
        <div className="flex min-h-screen min-w-screen flex-col items-center justify-center gap-5">
            <h1 className="text-8xl text-neutral-400 font-bold pb-8">ControlFlow</h1>
          <h2 className="text-6xl font-bold text-white">
            Página não encontrada
          </h2>
          <a
            className="text-4xl text-white"
            href="https://youtu.be/dQw4w9WgXcQ?si=SdMYvg6xoUCmvere"
            target="_blank"
          >
            Erro 404. Clique aqui.
          </a>
        </div>
      </div>
    );
}