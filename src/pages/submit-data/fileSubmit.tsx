import { CheckIcon, CircleNotchIcon, FileArrowUpIcon, FileIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { getDataFromSpreadsheet } from "./getDataFromSpreadsheet"
import { changeObjNamesInMDRList } from "./changeObjNamesInMDRList"
import { formatedMDR } from "./formatedMDR"
import type { MDR } from "../../types/MRD"
import { toast } from "react-toastify"
import { api } from "../../lib/axios"

interface FileSubmitProps {
  file: File
  sectors?: {
    unidade: string
    area: string
    processo: string
  }
}

export function FileSubmit({ file, sectors } : FileSubmitProps) {
  const [loadingFile, setLoadingFile] = useState(false)
  const [MDR, setMDR] = useState<MDR[]>()
  
  useEffect(() => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const dataSheet = getDataFromSpreadsheet(e)
      const MDRUnformated = changeObjNamesInMDRList(dataSheet)
      const MDRsFormatted = formatedMDR(MDRUnformated, sectors)

      setMDR(MDRsFormatted)
    }

    reader.readAsArrayBuffer(file)
    reader.onloadstart = () => setLoadingFile(true)
    reader.onloadend = () => setLoadingFile(false)
  }, [file, sectors])

    async function submitMDR() {
      if(!MDR?.length) return
      try {
        const sector = {
          sectorUnidade: MDR[0].sectorUnidade,
          sectorArea: MDR[0].sectorArea,
          sectorProcesso: MDR[0].sectorProcesso
        }

        await api.post(`/sector/create`, sector)
      
        await api.post(`/MDR/create`, MDR)
        toast.success(`${file.name} enviado com sucesso`)
      } catch (err) {
        console.error(err)
        toast.error(`Erro no upload do arquivo ${file.name}`)
      }
    }

    return (
      <div className="flex items-center gap-2 text-purple-500 px-2 py-2 cursor-pointer hover:shadow hover:shadow-black/30 rounded transition-all" key={file.name}>
       <FileIcon size={24} weight="fill"/>
        <span>{file.name}</span>
        {loadingFile ? (
          <span className="animate-spin">
            <CircleNotchIcon size={24}/>
          </span>
        ) : (
          <span>
            <CheckIcon size={24} weight="bold"/>
          </span>
        )}
        {MDR?.length && (
          <span>MDRs: {MDR.length}</span>
        )}

        <button onClick={submitMDR}>
          <FileArrowUpIcon size={24} className="size-10 p-2 rounded text-emerald-500 cursor-pointer hover:bg-emerald-500 hover:text-white transition-colors"/>
        </button>
      </div>
    )
}
