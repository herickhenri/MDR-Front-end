export type MDR = {
  id: string,
  sectorUnidade: string,
  sectorArea: string,
  sectorProcesso: string,
  titulo: string,
  tarefa: string,
  situacaoOp: string,
  cargos: string[],
  GHE: string | null,
  crit44Exposicao: string,
  perigos: {
    tipo: string,
    riscos: {
      tipo: string,
      crit1Lesao: string[],
      crit31NaturDoRisc: string,
      crit41Prob: string,
      crit42SitControl: string,
      crit42Concentracao: string,
      crit4Severidade: string,
      controlOp: string[],
      calculo: number,
      significanciaRisco: string,  
    }[],
  }[],
  partesInteressadas: string | null,
  responsavel: string | null,
  editores: string | null,
  aprovadores: string | null,
  linkAprovacao: string | null,
}

export type MDRList = {
  id: string,
  unidade: string,
  area: string,
  processo: string,
  MDRs: MDR[],
}

export type areaList = {
  name: string,
  processo: string[]
}

export type MDRFilterType = {
  unidade: string,
  area: {
    name: string,
    processo: string[]
  }[],
}