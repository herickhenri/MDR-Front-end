import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { postLogError } from "../../api/post-log-error";

export function ErrorPage() {
  const error = useRouteError()
  console.log({ error })
  useEffect(() => {
    if (error instanceof Error) {
      postLogError({
        error: error.name,
        info: error.message,
        userAgent: navigator.userAgent,
        url: window.location.href,
        stack: error.stack,
      })
    }
  }, [error])

  return (
    <div className="p-6 text-center text-red-600">
      <h1 className="text-xl font-bold">Erro inesperado 😢</h1>
      <p>{error instanceof Error ? error.message : "Ocorreu um erro desconhecido."}</p>
      <button onClick={() => window.location.reload()} className="mt-4 underline">
        Recarregar página
      </button>
    </div>
  )
}