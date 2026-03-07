import { getAuthToken } from './auth'

const BASE = import.meta.env.VITE_API_URL ?? ''

export interface ExpertProfileIdentity {
  bio?: string
  linkedInUrl?: string
  photoUrl?: string
}

export interface ExpertProfileCapability {
  selectedObjectives?: string[]
  customObjectives?: string[]
  selectedAudiences?: string[]
  customAudiences?: string[]
  selectedIndustries?: string[]
  selectedEngagementTypes?: string[]
  customEngagementTypes?: string[]
  selectedTopics?: string[]
  customTopics?: string[]
  interactivityLevel?: number
  functionalAlignment?: Record<string, number>
  depthCapacity?: number
}

export interface ExperienceEntry {
  title?: string
  outcome?: string
  audience?: string
  year?: string
}

export interface ExpertProfileData {
  identity?: ExpertProfileIdentity
  capability?: ExpertProfileCapability
  experience?: { entries?: ExperienceEntry[] }
  delivery?: { structure?: string; toolsPlatforms?: string; offerFollowUp?: boolean }
  pricing?: { baseFee?: string; priceFlexibility?: string }
  availability?: { weeklyAvailability?: string; travelWillingness?: string }
}

export interface GetExpertProfileResponse {
  success: boolean
  data: ExpertProfileData
  error?: string
}

export interface UpdateExpertProfileResponse {
  success: boolean
  data: ExpertProfileData
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

export async function getExpertProfile() {
  return request<GetExpertProfileResponse>('/api/expert/profile', { method: 'GET' })
}

export async function updateExpertProfile(payload: Partial<ExpertProfileData>) {
  return request<UpdateExpertProfileResponse>('/api/expert/profile', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}
