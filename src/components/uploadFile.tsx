import { useDropzone } from "react-dropzone"
import { FileXlsIcon } from '@phosphor-icons/react'

interface UploadFileProps {
  updateFile: (files: File[]) => void
}

export function UploadFile({ updateFile } : UploadFileProps) {
  const {getInputProps, getRootProps} = useDropzone({
    onDrop: (files) => updateFile(files),
    maxFiles: 30,
  })
  
  return (
    <div {...getRootProps()} className="flex h-16 w-80 cursor-pointer items-center justify-center gap-2 rounded border-2 border-dashed border-green-600 text-lg font-medium text-green-600 transition-colors hover:border-green-500 hover:text-green-500">
      <input {...getInputProps()}/>
        <FileXlsIcon size={32} />  
        Subir arquivos em excel
    </div>
  )
}