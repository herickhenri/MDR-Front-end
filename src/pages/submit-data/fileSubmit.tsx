import { CheckIcon, CircleNotchIcon, FileArrowUpIcon, FileIcon, UploadSimpleIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { getDataFromSpreadsheet } from "./getDataFromSpreadsheet"
import { changeObjNamesInMDRList } from "./changeObjNamesInMDRList"
import { formatedMDR } from "./formatedMDR"
import type { MDR } from "../../types/MRD"
import { toast } from "react-toastify"
import { api } from "../../lib/axios"

interface FileSubmitProps {
  file: File
}

export function FileSubmit({ file } : FileSubmitProps) {
  const [loadingFile, setLoadingFile] = useState(false)
  const [MDR, setMDR] = useState<MDR[]>()
  const [unidade, setUnidade] = useState('Industrial Imperatriz')
  const [area, setArea] = useState('')
  const [processo, setProcesso] = useState('')
  const sectors = { unidade, area, processo }

  function loadFile() {
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
  }

  async function submitMDR() {
    if(!MDR?.length) return
    try {    
      await api.post(`/MDR/create`, MDR)
      toast.success(`${file.name} enviado com sucesso`)
    } catch (err) {
      console.error(err)
      toast.error(`Erro no upload do arquivo ${file.name}`)
    }
  }

  async function submitSectors() {
    try {
      const sector = {
        sectorUnidade: unidade,
        sectorArea: area,
        sectorProcesso: processo
      }

      await api.post(`/sector/create`, sector)
    
      toast.success(`Setores criados com sucesso`)
    } catch (err) {
      console.error(err)
      toast.error(`Erro ao criar Setor`)
    }
  }

    return (
      <div className="hover:shadow hover:shadow-black/30 rounded transition-all p-2">
       <div className="flex items-center gap-2 text-purple-500" >
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
          <div className="ml-auto">
            <button onClick={loadFile}>
              <FileArrowUpIcon size={24} className="size-10 p-2 rounded text-emerald-500 cursor-pointer hover:bg-emerald-500 hover:text-white transition-colors"/>
            </button>

            <button onClick={submitMDR}>
              <UploadSimpleIcon size={24} className="size-10 p-2 rounded text-emerald-500 cursor-pointer hover:bg-emerald-500 hover:text-white transition-colors"/>
            </button>
          </div>
        </div>

        <div className="flex gap-4 text-yellow-900">
          <input 
            type="text" 
            className="w-full mt-1 block border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 "
            value={unidade}
            onChange={e => setUnidade(e.target.value)}
            placeholder="unidade"
          />
          <input 
            type="text" 
            className="w-full mt-1 block border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 "
            value={area}
            onChange={e => setArea(e.target.value)}
            placeholder="area"
          />
          <input 
            type="text" 
            className="w-full mt-1 block border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 "
            value={processo}
            onChange={e => setProcesso(e.target.value)}
            placeholder="processo"
          />
          <button onClick={submitSectors}>
              <UploadSimpleIcon size={24} className="size-10 p-2 rounded text-yellow-500 cursor-pointer hover:bg-yellow-500 hover:text-white transition-colors"/>
            </button>
        </div>
      </div>
    )
}
