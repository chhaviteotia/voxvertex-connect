import { getAuthToken } from './auth'

const BASE = import.meta.env.VITE_API_URL ?? ''

export interface AvailabilityWindow {
  id: string
  startDate: string
  endDate: string
  note: string
}

export interface ScheduledSession {
  id: string
  companyName: string
  sessionType: string
  status: 'pending' | 'confirmed'
  scheduledDate: string
  startTime: string
  endTime: string
  location: string
}

export interface CalendarStats {
  activeWindows: number
  upcomingSessions: number
  pending: number
  confirmed: number
  completed: number
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  }
  if (token) (headers as Record<string, string>).Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  const data = (await res.json().catch(() => ({}))) as { error?: string }
  if (!res.ok) {
    throw new Error(data.error ?? res.statusText)
  }
  return data as T
}

export async function getAvailability(): Promise<{
  success: boolean
  data: AvailabilityWindow[]
}> {
  return request<{ success: boolean; data: AvailabilityWindow[] }>(
    '/api/expert/calendar/availability',
    { method: 'GET' }
  )
}

export async function createAvailability(payload: {
  startDate: string
  endDate: string
  note?: string
}): Promise<{ success: boolean; data: AvailabilityWindow }> {
  return request<{ success: boolean; data: AvailabilityWindow }>(
    '/api/expert/calendar/availability',
    { method: 'POST', body: JSON.stringify(payload) }
  )
}

export async function deleteAvailability(id: string): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(
    `/api/expert/calendar/availability/${id}`,
    { method: 'DELETE' }
  )
}

export async function getSessions(): Promise<{
  success: boolean
  data: ScheduledSession[]
}> {
  return request<{ success: boolean; data: ScheduledSession[] }>(
    '/api/expert/calendar/sessions',
    { method: 'GET' }
  )
}

export async function createSession(payload: {
  companyName: string
  sessionType?: string
  status?: 'pending' | 'confirmed'
  scheduledDate: string
  startTime?: string
  endTime?: string
  location?: string
}): Promise<{ success: boolean; data: ScheduledSession }> {
  return request<{ success: boolean; data: ScheduledSession }>(
    '/api/expert/calendar/sessions',
    { method: 'POST', body: JSON.stringify(payload) }
  )
}

export async function updateSessionStatus(
  id: string,
  status: 'pending' | 'confirmed'
): Promise<{ success: boolean; data: { id: string; status: string } }> {
  return request(
    `/api/expert/calendar/sessions/${id}`,
    { method: 'PATCH', body: JSON.stringify({ status }) }
  )
}

export async function getCalendarStats(): Promise<{
  success: boolean
  data: CalendarStats
}> {
  return request<{ success: boolean; data: CalendarStats }>(
    '/api/expert/calendar/stats',
    { method: 'GET' }
  )
}
