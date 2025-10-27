import { api } from "../lib/axios";

interface requestSchema {
  error: string
  info: string
  userAgent: string
  url: string
}

export async function postLogError(data: requestSchema) {
  await api.post('/log-client-error', data)
}