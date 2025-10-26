import { ArrowLeftIcon, ArrowRightIcon, BuildingIcon, CheckIcon, InfoIcon, WarningIcon } from "@phosphor-icons/react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import type { MDR } from "../../types/MRD"

export function MDRDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [mdr, setMdr] = useState<MDR>()


  useEffect(() => {
    api.get(`/MDR/${id}`)
      .then(response => {

      setMdr(response.data.mdr)
    })
      .catch(err => {
        console.error(err)
      })
  },[id])  

  if(!mdr) {
    return <h1>Carregando</h1>
  }

  function toBack() {
    if(mdr) {
      const queryParams = new URLSearchParams()
      queryParams.append('unidade', mdr.sectorUnidade)
      queryParams.append('area', mdr.sectorArea)
      queryParams.append('processo', mdr.sectorProcesso)
      navigate(`/?${queryParams}`)

      return
    }

    navigate('/')
  }
    
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <button 
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex gap-2 items-center"
          onClick={toBack}
        >
          <ArrowLeftIcon size={16} weight="bold"/>
          <span>Voltar</span>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Detalhes da MDR</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
          <h3 className="text-blue-800 font-semibold">MDR - {mdr.tarefa}</h3>
        </div>
        <div className="p-6 pb-0 space-y-2">
          <div className="flex gap-4 items-center">
            <BuildingIcon size={20} weight={"fill"} className="text-blue-600"/>
            <h3 className="text-gray-700 font-semibold">Informações Gerais</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <span className="text-sm text-gray-500 block">Unidade</span>
              <span className="font-medium">{mdr.sectorUnidade}</span>
            </div>
            <div className="">
              <span className="text-sm text-gray-500 block">Área</span>
              <span className="font-medium">{mdr.sectorArea}</span>
            </div>
            <div className="">
              <span className="text-sm text-gray-500 block">Processo</span>
              <span className="font-medium">{mdr.sectorProcesso}</span>
            </div>
            <div className="">
              <span className="text-sm text-gray-500 block">Atividade</span>
              <span className="font-medium">{mdr.tarefa}</span>
            </div> 
            <div className="">
              <span className="text-sm text-gray-500 block">Situação Operacional</span>
              <span className="font-medium">{mdr.situacaoOp}</span>
            </div> 
            <div className="">
              <span className="text-sm text-gray-500 block">Cargos</span>
              <div className="divide-gray-500 divide-x">
                {mdr.cargos.map(cargo => (
                  <span className="font-medium px-1" key={cargo}>{cargo}</span>
                ))}
              </div>
            </div>                                                  
          </div>
        </div>

        <div className="p-6 pb-0 space-y-2">
          <div className="flex gap-4 items-center">
            <InfoIcon size={20} weight={"fill"} className="text-blue-600"/>
            <h3 className="text-gray-700 font-semibold">Informações Adicionais</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <span className="text-sm text-gray-500 block">GHE</span>
              <span className="font-medium">{mdr.GHE}</span>
            </div>
            <div className="">
              <span className="text-sm text-gray-500 block">Exposição</span>
              <span className="font-medium">{mdr.crit44Exposicao}</span>
            </div>
            <div className="">
              <span className="text-sm text-gray-500 block">Responsável</span>
              <span className="font-medium">{mdr.responsavel}</span>
            </div>
            <div className="">
              <span className="text-sm text-gray-500 block">Editores</span>
              <span className="font-medium">{mdr.editores}</span>
            </div>   
            <div className="">
              <span className="text-sm text-gray-500 block">Aprovadores</span>
              <span className="font-medium">{mdr.aprovadores}</span>
            </div>                                                                  
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <WarningIcon size={20} weight="fill" className="text-red-500"/>
            <h3 className="text-gray-700 font-semibold">Perigos Identificados e Riscos Associados</h3>
          </div>

          {mdr.perigos.map((perigo) => (
            <div className="rounded-lg overflow-hidden border border-gray-200" key={perigo.tipo}>
              <div className="flex items-center gap-4 px-4 py-3 bg-red-50 border-b border-red-100">
                <WarningIcon size={20} weight="fill" className="text-red-800"/>
                <h4 className="text-red-800 font-semibold">Perigo: {perigo.tipo}</h4>
              </div>
              {perigo.riscos.map((risco) => (
                <div className="p-4 border-b border-gray-100 last:border-b-0" key={risco.tipo}>
                  <div className="font-medium text-gray-800 flex items-center gap-4 mb-3">
                    <ArrowRightIcon size={20} className="text-gray-400"/>
                    <h5>Risco: {risco.tipo}</h5>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-md text-sm">
                      <h6 className="font-medium text-gray-700 mb-2">Classificação do risco</h6>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Probabilidade:</span>
                        <span className="text-red-600 font-medium">{risco.crit41Prob}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Severidade: </span>
                        <span className="text-red-600 font-medium text-end">{risco.crit4Severidade}</span>
                      </div>
                      <div className="h-px w-full bg-gray-200 my-1"/>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Significância:</span>
                        <span className="text-red-600 font-medium text-end">{risco.significanciaRisco}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md text-sm">
                      <h6 className="font-medium text-gray-700 mb-2">Detalhes</h6>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Concentração:</span>
                        <span className="font-medium">{risco.crit42Concentracao}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-600">Lesão: </span>
                        <div className="divide-gray-600 divide-x flex flex-wrap justify-end">
                          {risco.crit1Lesao.map(lesao => (
                            <span className="font-medium px-1" key={lesao}>{lesao}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-md text-xs">
                      <h6 className="font-medium text-gray-700 text-sm mb-2">Controles Operacionais</h6>
                      <ul className="space-y-1">
                        {risco.controlOp.map(controlOp => (
                          <li className="flex items-top gap-1" key={controlOp}>
                            <CheckIcon size={14} className="text-green-600"/>
                            <span className="flex-1">{controlOp}</span>
                          </li>         
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}