import { getAuthToken } from './auth'

const BASE = import.meta.env.VITE_API_URL ?? ''

export interface CreateRequirementPayload {
  status?: 'draft' | 'published'
  formData: Record<string, unknown>
}

export interface RequirementResponse {
  id: string
  status: string
  formData: Record<string, unknown>
  createdAt: string
  updatedAt?: string
}

export interface CreateRequirementResponse {
  success: boolean
  requirement: RequirementResponse
  error?: string
}

export interface ListRequirementsResponse {
  success: boolean
  requirements: RequirementResponse[]
  total: number
  error?: string
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  })
  const data = await res.json().catch(() => ({})) as { error?: string }
  if (!res.ok) {
    const message = data.error ?? res.statusText
    throw new Error(message)
  }
  return data as T
}

export async function createRequirement(payload: CreateRequirementPayload): Promise<CreateRequirementResponse> {
  return request<CreateRequirementResponse>('/api/business/requirements', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function listRequirements(params?: { status?: string; limit?: number; skip?: number }): Promise<ListRequirementsResponse> {
  const search = new URLSearchParams()
  if (params?.status) search.set('status', params.status)
  if (params?.limit != null) search.set('limit', String(params.limit))
  if (params?.skip != null) search.set('skip', String(params.skip))
  const q = search.toString()
  return request<ListRequirementsResponse>(`/api/business/requirements${q ? `?${q}` : ''}`)
}

export async function getRequirement(id: string): Promise<{ success: boolean; requirement: RequirementResponse }> {
  return request<{ success: boolean; requirement: RequirementResponse }>(`/api/business/requirements/${id}`)
}

export interface UpdateRequirementPayload {
  status?: 'draft' | 'published'
  formData?: Record<string, unknown>
}

export async function updateRequirement(id: string, payload: UpdateRequirementPayload): Promise<CreateRequirementResponse> {
  return request<CreateRequirementResponse>(`/api/business/requirements/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}
