import { FunnelIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { MDRFilterType } from "../types/MRD"
import { getFilterMDR } from "../api/get-filter-mdr"

export function MDRFilter() {

  const [searchParams, setSearchParams] = useSearchParams()

  const [filter, setFilter] = useState<MDRFilterType[]>()
  const [search, setSearch] = useState('')
  const [unidade, setUnidade] = useState(searchParams.get('unidade') || '')
  const [area, setArea] = useState(searchParams.get('area') || '')
  const [processo, setProcesso] = useState(searchParams.get('processo') || '')

  const areaList = filter?.find((item) => item.unidade === unidade)?.area
  const processoList = areaList?.find(({ name }) => name === area)?.processo

  function changeSearchParams() {
    setSearchParams((params) => {
      if (unidade && area && processo) {
        params.set('unidade', unidade)
        params.set('area', area)
        params.set('processo', processo)
      }

      return params
    })
  }

  async function getFilter() {
    const filterData = await getFilterMDR()
    setFilter(filterData)
  }

  useEffect(() => {
    getFilter()
  }, [])

  useEffect(() => {
    if (searchParams.get("area")) return

    if (!areaList?.length) {
      setArea("")
      return
    }
    setArea(areaList[0].name)
  }, [areaList, searchParams])

  useEffect(() => {
    if (!processoList?.length) {
      setProcesso("")
      return
    }
    setProcesso(processoList[0])
  }, [processoList])


  return (
    <div className="flex gap-4 rounded-lg bg-white shadow-md p-4 mb-6 items-end flex-wrap">
      <div className="w-full flex flex-wrap sm:flex-row flex-col sm:items-end gap-4">
        <div className="flex-1 sm:basis-64">
          <label htmlFor="unidade-select" className="text-sm font-medium text-gray-700 mb-1">Unidade</label>
          <select
            id="unidade-select"
            name="Unidade"
            className="w-full mt-1 block border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
            onChange={(e) => setUnidade(e.target.value)}
            defaultValue={unidade}
            value={unidade}
          >
            {filter?.map(({ unidade }) => (
              <option value={unidade} key={unidade}>{unidade}</option>
            ))}
            <option value="" disabled>Selecione</option>
          </select>
        </div>

        <div className="flex-1 sm:basis-64">
          <label htmlFor="area-select" className="text-sm font-medium text-gray-700 mb-1">Area</label>
          <select
            id="area-select"
            name="Area"
            className="w-full mt-1 block border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
            onChange={(e) => setArea(e.target.value)}
            defaultValue={area}
            value={area}
          >
            {areaList?.map(area => (
              <option value={area.name} key={area.name}>{area.name}</option>
            ))}
            <option value="" disabled>Selecione</option>
          </select>
        </div>

        <div className="flex-1 sm:basis-64">
          <label htmlFor="processo-select" className="text-sm font-medium text-gray-700 mb-1">Processo</label>
          <select
            id="processo-select"
            name="Processo"
            className="w-full mt-1 block border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setProcesso(e.target.value)}
            defaultValue={processo}
            value={processo}
          >
            {processoList?.map(processo => (
              <option value={processo} key={processo}>{processo}</option>
            ))}
            <option value="" disabled>Selecione</option>
          </select>
        </div>

        <div className="flex-1 sm:basis-64">
          <label className="text-sm font-medium text-gray-700 mb-1">Pesquisa</label>
          <input
            type="text"
            className="w-full mt-1 block border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Digite o nome da atividade"
          />
        </div>

        <button
          className="h-10 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 rounded-md transition-colors cursor-pointer disabled:hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={changeSearchParams}
          disabled={!unidade || !area || !processo}
        >
          <FunnelIcon size={20} weight="fill" />
          Aplicar Filtros
        </button>
      </div>


    </div>
  )
}