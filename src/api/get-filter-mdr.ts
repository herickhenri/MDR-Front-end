import { api } from "../lib/axios";
import type { MDRFilterType } from "../types/MRD";

interface responseRequest {
  filterMDR: MDRFilterType[]
}

export async function getFilterMDR() {
  const response = await api.get<responseRequest>('/MDR/filters')

  return response.data.filterMDR
}