import { UploadFile } from "../../components/uploadFile";
import { useState } from "react";
import { FileSubmit } from "./fileSubmit";

export function SubmitData() {
  const [files, setFiles] = useState<File[]>()

  function changeFile(files: File[]) {
    setFiles(files)
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen py-20">
      <div className="px-8 py-16 shadow-black/60 shadow-lg rounded-lg space-y-6">
        <h1 className="font-semibold text-2xl">Subir planilha de MDR</h1>
        <UploadFile updateFile={changeFile} />
        <div className="px-3 py-3 border divide-y">
          <h2 className="font-semibold text-lg">Planilhas carregadas</h2>
          <div className="py-2">
            {files?.map((file) => (
              <FileSubmit file={file}/>
            ))}
          </div>
        </div>
        
        {
        /*<button 
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-4 py-2 rounded-md transition-colors cursor-pointer"
           onClick={submitMDR}
          >
          Subir planilha
        </button>*/}
      </div>
    </div>
  )
}