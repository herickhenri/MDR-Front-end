import { Link, useSearchParams } from "react-router-dom";
import { MDRFilter } from "../../components/MDR-filter";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import type { MDR } from "../../types/MRD";
import { MDRCard } from "../../components/MDR-card";

export function Home() {
  const [searchParams] = useSearchParams()
  const [mdrList, setMdrList] = useState<MDR[]>()

  const unidade = searchParams.get('unidade')
  const area = searchParams.get('area')
  const processo = searchParams.get('processo')


  useEffect(() => {
    if (!unidade || !area || !processo) return

    const queryParams = new URLSearchParams()
    queryParams.append('sectorUnidade', unidade)
    queryParams.append('sectorArea', area)
    queryParams.append('sectorProcesso', processo)

    api.get(`/MDR/all?${queryParams}`).then(response => (
      setMdrList(response.data.mdr)
    ))
  }, [unidade, area, processo])

  const mdrSize = mdrList?.length

  return (
    <div>
      <MDRFilter />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Lista de MDRs</h2>
        <span className="text-sm text-gray-600">Mostrando {mdrSize} MDRs</span>
      </div>

      {unidade && area && processo && mdrList?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mdrList.map((mdr, index) => (
            <Link to={`/details/${mdr.id}`} key={mdr.id}>
              <MDRCard
                unidade={unidade}
                processo={processo}
                area={area}
                mdr={mdr}
                index={index}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <span className="text-gray-600 text-2xl font-semibold">Nenhuma MDR encontrada</span>
        </div>
      )
      }

    </div>
  )
}