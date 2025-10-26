import * as XLSX from 'xlsx'
import type { spreadsheetFieldsType } from '../../schemas/SpreadsheetFieldsShema'

export function getDataFromSpreadsheet(event: ProgressEvent<FileReader>) {
  const data = event.target?.result && new Uint8Array(event.target.result as ArrayBuffer)

  const workbook = XLSX.read(data)
  
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  
  const dataSheet = XLSX.utils.sheet_to_json<spreadsheetFieldsType>(worksheet, {
    raw: true,
  })

  const dataSheetSliced = dataSheet.slice(0, 2000)

  return dataSheetSliced
}