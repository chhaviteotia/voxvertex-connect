import { getAuthToken } from './auth'

const BASE = import.meta.env.VITE_API_URL ?? ''

/** Payload from Submit Proposal form */
export interface ProposalFormData {
  understanding?: string
  outcomePlan?: string
  measurableOutcomes?: string[]
  sessionStructure?: { segmentTitle: string; duration: string; type: string }[]
  deliverablesSelected?: string[]
  similarEngagements?: string
  industryMatch?: string
  proposedFee?: string
  feeBreakdown?: string
}

export interface SubmitProposalPayload {
  requirementId: string
  status?: 'draft' | 'submitted'
  formData: ProposalFormData
}

export interface ProposalResponse {
  id: string
  requirementId: string
  status: string
  formData: ProposalFormData
  createdAt: string
  expert?: {
    id: string
    name: string
    initials: string
    email?: string
  }
}

export interface SubmitProposalResponse {
  success: boolean
  proposal: ProposalResponse
  error?: string
}

export interface ListProposalsResponse {
  success: boolean
  proposals: ProposalResponse[]
  total: number
  error?: string
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  }
  if (token) (headers as Record<string, string>).Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  })
  const data = (await res.json().catch(() => ({}))) as { error?: string }
  if (!res.ok) {
    const message = data.error ?? res.statusText
    throw new Error(message)
  }
  return data as T
}

/** Expert: submit a proposal for an opportunity (requirementId = opportunityId from browse). */
export async function submitProposal(payload: SubmitProposalPayload): Promise<SubmitProposalResponse> {
  return request<SubmitProposalResponse>('/api/expert/proposals', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

/** Business: list proposals for a requirement (owner only). */
export async function listProposalsByRequirement(
  requirementId: string,
  params?: { status?: string; limit?: number; skip?: number }
): Promise<ListProposalsResponse> {
  const search = new URLSearchParams()
  if (params?.status) search.set('status', params.status)
  if (params?.limit != null) search.set('limit', String(params.limit))
  if (params?.skip != null) search.set('skip', String(params.skip))
  const q = search.toString()
  return request<ListProposalsResponse>(
    `/api/business/requirements/${requirementId}/proposals${q ? `?${q}` : ''}`
  )
}
