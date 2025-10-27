import { api } from "../lib/axios";
import type { MDRFilterType } from "../types/MRD";

interface responseSchema {
  filterMDR: MDRFilterType[]
}

export async function getFilterMDR() {
  const response = await api.get<responseSchema>('/MDR/filters')

  return response.data.filterMDR
}