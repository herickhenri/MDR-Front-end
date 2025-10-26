import { z } from "zod"

export const SpreadsheetFieldsSchema = z.object({
  'APROVADORES GERENTE (GESTOR) (10)' : z.string().optional(),
  'CARGOS (16)' : z.string(),
  'Controles Operacionais (19)' : z.string(),
  'Criterio 1.LESÃO (21)' : z.string(),
  'Criterio 3.1.NATUR DO RISC (24)' : z.string(),
  'Criterio 4.1.PROBABILIDADE (26)' : z.string(),
  'Criterio 4.2.SIT CONTROLE (27)' : z.string(),
  'Criterio 4.3.CONCENTRAÇÃO (28)' : z.string(),
  'Criterio 4.4.EXPOSIÇÃO (29)' : z.string(),
  'Criterio 4.SEVERIDADE (25)' : z.string(),
  'CÁLCULO' : z.number(),
  'EDITORES QUEM CONTRIBUI (8)' : z.string().optional(),
  'Fórmula SIGINIFICÂNCIA DO RISCO (30)' : z.string(),
  'GHE (15)' : z.coerce.string().optional(),
  'LINK DA APROVAÇÃO' : z.string().optional(),
  'PROCESSO (9)' : z.string(),
  'Partes Interessadas (18)' : z.string().optional(),
  'Perigo (13)' : z.string(),
  'RESPONSÁVEL QUEM ELABORA (5)' : z.string().optional(),
  'Riscos (14)' : z.string(),
  'Situação Operacional (20)' : z.string(),
  'TAREFA (12)' : z.string(),
  'TÍTULO (2)' : z.string(),
  'UNIDADE (1)' : z.string(),
  'ÁREA (7)': z.string(),
})

export type spreadsheetFieldsType = z.infer<typeof SpreadsheetFieldsSchema>