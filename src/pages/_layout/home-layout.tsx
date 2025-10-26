import { Outlet } from "react-router-dom";

export function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 py-4 px-8 text-white shadow-lg md:px-8">
        <div className="mx-auto sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
          <h1 className="text-3xl font-bold mb-2">Matriz de Determinação de risco - MDR</h1>
          <p className="text-blue-100">Relatório de análise de riscos operacionais</p>
        </div>
      </header>

      <div className="mx-auto sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] w-full px-4 md:px-8 py-6 md:py-8 flex-1">
        <Outlet />
      </div>

      <footer className="bg-gray-800 text-white py-4 px-4 md:px-8 mt-8 text-sm text-center">
        2025 Sistema de Gestão de Riscos - Matriz de Determinação de Riscos (MDR)
      </footer>
    </div> 
  )
}