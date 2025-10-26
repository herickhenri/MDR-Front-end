import type { MDR } from "../../types/MRD"
import type { MDRUnformatted } from "./MDRUnformatted"

type sectors = {
  unidade: string
  area: string
  processo: string
}

export function formatedMDR(MDRUnformatted: MDRUnformatted[], sectors?: sectors) {
  const MDRsFormatted: MDR[] = []

  MDRUnformatted.forEach(mdr => {
    const mrdIndex = MDRsFormatted.findIndex(({tarefa}) => tarefa === mdr.tarefa)
    const {
      GHE,
      aprovadores,
      calculo,
      cargos,
      controlOp,
      crit1Lesao,
      crit31NaturDoRisc,
      crit41Prob,
      crit42Concentracao,
      crit42SitControl,
      crit44Exposicao,crit4Severidade,
      editores,
      linkAprovacao,
      partesInteressadas,
      responsavel,
      significanciaRisco,
      situacaoOp,
      tarefa,
      titulo,
      sectorArea,
      sectorProcesso,
      sectorUnidade,
    } = mdr


    if(mrdIndex === -1) {
      MDRsFormatted.push({
        id: '',
        sectorArea: sectors?.area || sectorArea,
        sectorProcesso: sectors?.processo || sectorProcesso,
        sectorUnidade: sectors?.unidade || sectorUnidade,
        aprovadores: aprovadores || null,
        cargos,
        crit44Exposicao,
        editores: editores || null,
        GHE: GHE || null,
        linkAprovacao: linkAprovacao || null,
        partesInteressadas: partesInteressadas || null,
        responsavel: responsavel || null,
        situacaoOp,
        tarefa,
        titulo,
        perigos: [{
          tipo: mdr.perigo,
          riscos: [{
            tipo: mdr.risco,
            calculo,
            controlOp,
            crit1Lesao,
            crit31NaturDoRisc,
            crit41Prob,
            crit42Concentracao,
            crit42SitControl,
            crit4Severidade,
            significanciaRisco,
          }],
        }]
      })

      return
    }

    const perigoIndex = MDRsFormatted[mrdIndex].perigos.findIndex(({tipo}) => tipo === mdr.perigo)

    if(perigoIndex === -1) {
      MDRsFormatted[mrdIndex] = {
        ...MDRsFormatted[mrdIndex],
        perigos: [
          ...MDRsFormatted[mrdIndex].perigos,
          {
            tipo: mdr.perigo,
            riscos: [{
              tipo: mdr.risco,
              calculo,
              controlOp,
              crit1Lesao,
              crit31NaturDoRisc,
              crit41Prob,
              crit42Concentracao,
              crit42SitControl,
              crit4Severidade,
              significanciaRisco,
            }]
          }
        ]
      }

      return
    }

    const riscoIndex = MDRsFormatted[mrdIndex].perigos[perigoIndex].riscos.findIndex(({tipo}) => tipo === mdr.risco)

    if(riscoIndex === -1) {
      MDRsFormatted[mrdIndex].perigos[perigoIndex] = {   
        tipo: mdr.perigo,
        riscos: [
          ...MDRsFormatted[mrdIndex].perigos[perigoIndex].riscos,
          {
            tipo: mdr.risco,
            calculo,
            controlOp,
            crit1Lesao,
            crit31NaturDoRisc,
            crit41Prob,
            crit42Concentracao,
            crit42SitControl,
            crit4Severidade,
            significanciaRisco,
          }
        ]      
      }
    }
  })

  return MDRsFormatted
}