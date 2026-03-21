import { getAuthToken } from './auth'

const BASE = import.meta.env.VITE_API_URL ?? ''

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  }
  if (token) (headers as Record<string, string>).Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  const data = (await res.json().catch(() => ({}))) as { error?: string }
  if (!res.ok) throw new Error(data.error ?? res.statusText)
  return data as T
}

export async function scheduleSessionsForRequirement(payload: {
  requirementId: string
  sessionType?: string
  scheduledDate: string
  startTime?: string
  endTime?: string
  location?: string
  note?: string
}): Promise<{ success: boolean; data: { createdCount: number } }> {
  return request('/api/business/calendar/sessions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export interface BusinessScheduledSession {
  id: string
  requirementId: string
  requirementTitle: string
  companyName: string
  sessionType: string
  status: 'pending' | 'confirmed'
  scheduledDate: string
  startTime: string
  endTime: string
  location: string
}

export async function getBusinessScheduledSessions(): Promise<{
  success: boolean
  data: BusinessScheduledSession[]
}> {
  return request('/api/business/calendar/sessions', { method: 'GET' })
}
