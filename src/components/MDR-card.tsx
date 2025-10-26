import type { MDR } from "../types/MRD"

interface MDRCardProps {
  mdr: MDR
  index: number
  unidade: string
  processo: string
  area: string
}

export function MDRCard({ 
  mdr, 
  index,
  unidade,
  processo,
  area
}: MDRCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-black/40 shadow-md overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:shadow-xl transition-all h-full flex flex-col">
      <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
        <h3 className="text-blue-800 font-semibold">MDR #{index+1}</h3>
      </div>

      <div className="p-4 flex flex-col gap-2 h-full">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Unidade:</span>
          <span className="text-sm font-semibold">{unidade}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Área:</span>
          <span className="text-sm font-semibold">{area}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Processo:</span>
          <span className="text-sm font-semibold text-end">{processo}</span>
        </div>
        <div className="h-px w-full bg-gray-100 my-2"/>
        <div className="flex justify-between flex-1">
          <span className="text-sm text-gray-500">Atividade:</span>
          <span className="text-sm font-semibold text-end">{mdr.tarefa}</span>
        </div>                    

        <button className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm transition-colors cursor-pointer">Ver detalhes completos</button>
      </div>
    </div>
  )
}