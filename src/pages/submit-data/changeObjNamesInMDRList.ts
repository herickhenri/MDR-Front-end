import { SpreadsheetFieldsSchema, type spreadsheetFieldsType } from "../../schemas/SpreadsheetFieldsShema";
import type { MDRUnformatted } from "./MDRUnformatted"

function cleanKeys(spreadsheet: spreadsheetFieldsType) {
  return Object.fromEntries(
    Object.entries(spreadsheet).map(([key, value]) => {
      const cleanKey = key
        .replace(/[\r\n\t↵]/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/\u00A0/g, '')
        .trim();
      return [cleanKey, value]
    })
  )
}

export function changeObjNamesInMDRList(dataSheet: spreadsheetFieldsType[]) {
  const MDRUnformated = dataSheet.reduce((acc, row) => {
    try {
      const fieldsFormated = SpreadsheetFieldsSchema.parse(cleanKeys(row))

      const cargosArray = fieldsFormated['CARGOS (16)'].split(/[,;]/)
      const crit1LesaoArray = fieldsFormated['Criterio 1.LESÃO (21)']?.split(/[,;]/)
      const controlOpArray = fieldsFormated['Controles Operacionais (19)'].split(/[,;]/)

      const MDR: MDRUnformatted = {
        aprovadores: fieldsFormated['APROVADORES GERENTE (GESTOR) (10)'],
        cargos: cargosArray,
        controlOp: controlOpArray,
        crit1Lesao: crit1LesaoArray,
        crit31NaturDoRisc: fieldsFormated['Criterio 3.1.NATUR DO RISC (24)'],
        crit41Prob: fieldsFormated['Criterio 4.1.PROBABILIDADE (26)'],
        crit42SitControl: fieldsFormated['Criterio 4.2.SIT CONTROLE (27)'],
        crit42Concentracao: fieldsFormated['Criterio 4.3.CONCENTRAÇÃO (28)'],
        crit44Exposicao: fieldsFormated['Criterio 4.4.EXPOSIÇÃO (29)'],
        crit4Severidade: fieldsFormated['Criterio 4.SEVERIDADE (25)'],
        calculo: fieldsFormated['CÁLCULO'],
        editores: fieldsFormated['EDITORES QUEM CONTRIBUI (8)'],
        significanciaRisco: fieldsFormated['Fórmula SIGINIFICÂNCIA DO RISCO (30)'],
        GHE: fieldsFormated['GHE (15)'],
        linkAprovacao: fieldsFormated['LINK DA APROVAÇÃO'],
        sectorProcesso: fieldsFormated['PROCESSO (9)'],
        partesInteressadas: fieldsFormated['Partes Interessadas (18)'],
        perigo: fieldsFormated['Perigo (13)'],
        responsavel: fieldsFormated['RESPONSÁVEL QUEM ELABORA (5)'],
        risco: fieldsFormated['Riscos (14)'],
        situacaoOp: fieldsFormated['Situação Operacional (20)'],
        tarefa: fieldsFormated['TAREFA (12)'],
        titulo: fieldsFormated['TÍTULO (2)'],
        sectorUnidade: fieldsFormated['UNIDADE (1)'],
        sectorArea: fieldsFormated['ÁREA (7)'],
      }
      
      acc.push(MDR)

      return acc
    } catch (err) {
      console.error(err)
      return acc
    }
  }, [] as MDRUnformatted[])

  return MDRUnformated
}