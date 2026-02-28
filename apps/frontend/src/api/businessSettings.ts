import { getAuthToken } from './auth'

const BASE = import.meta.env.VITE_API_URL ?? ''

interface OrganizationSettings {
  companyName: string
  industry: string
  companySize: string
  website: string
  address: string
}

interface ProfileSettings {
  firstName: string
  lastName: string
  fullName?: string
  avatarUrl?: string
  email: string
  phone: string
  jobTitle: string
}

interface NotificationSettings {
  expertMatches: boolean
  proposals: boolean
  messages: boolean
  weeklyDigest: boolean
}

export interface BusinessSettingsResponse {
  success: boolean
  data: {
    organization: OrganizationSettings
    profile: ProfileSettings
    notifications: NotificationSettings
  }
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

export async function fetchBusinessSettings() {
  return request<BusinessSettingsResponse>('/api/business/settings', {
    method: 'GET',
  })
}

export async function updateOrganizationSettings(payload: Partial<OrganizationSettings>) {
  return request<{ success: boolean; data: OrganizationSettings }>('/api/business/settings/organization', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export async function updateProfileSettings(payload: Partial<ProfileSettings>) {
  return request<{ success: boolean; data: ProfileSettings }>('/api/business/settings/profile', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export async function updateNotificationSettings(payload: Partial<NotificationSettings>) {
  return request<{ success: boolean; data: NotificationSettings }>('/api/business/settings/notifications', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export async function changeBusinessPassword(currentPassword: string, newPassword: string) {
  return request<{ success: boolean }>('/api/business/settings/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  })
}

export async function uploadBusinessAvatar(file: File): Promise<{ success: boolean; avatarUrl: string }> {
  const token = getAuthToken()
  const headers: HeadersInit = {}
  if (token) headers.Authorization = `Bearer ${token}`

  const formData = new FormData()
  formData.append('photo', file)

  const res = await fetch(`${BASE}/api/business/settings/avatar`, {
    method: 'POST',
    headers,
    body: formData,
  })
  const data = await res.json().catch(() => ({})) as { success?: boolean; avatarUrl?: string; error?: string }
  if (!res.ok) {
    throw new Error(data.error ?? res.statusText)
  }
  if (!data.success || !data.avatarUrl) {
    throw new Error(data.error ?? 'Upload failed')
  }
  return { success: true, avatarUrl: data.avatarUrl }
}

