import { getAuthToken } from './auth'

const BASE = import.meta.env.VITE_API_URL ?? ''

export interface OpportunityItem {
  id: string
  createdAt: string
  companyName: string
  formData: Record<string, unknown>
}

export interface GetOpportunitiesResponse {
  success: boolean
  data: OpportunityItem[]
  total?: number
  filters?: {
    domains?: Array<{ value: string; label: string }>
    budgets?: Array<{ value: string; label: string }>
    types?: Array<{ value: string; label: string }>
  }
  error?: string
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

export async function getOpportunities(params?: {
  limit?: number
  skip?: number
  search?: string
  domain?: string
  budget?: string
  type?: string
}) {
  const sp = new URLSearchParams()
  if (params?.limit != null) sp.set('limit', String(params.limit))
  if (params?.skip != null) sp.set('skip', String(params.skip))
  if (params?.search) sp.set('search', params.search)
  if (params?.domain && params.domain !== 'all') sp.set('domain', params.domain)
  if (params?.budget && params.budget !== 'all') sp.set('budget', params.budget)
  if (params?.type && params.type !== 'all') sp.set('type', params.type)
  const q = sp.toString()
  return request<GetOpportunitiesResponse>(
    `/api/expert/opportunities${q ? `?${q}` : ''}`,
    { method: 'GET' }
  )
}
