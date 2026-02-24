import { IconBell } from './DashboardIcons'

/**
 * Dashboard header: notification bell with dot, user avatar (initials).
 * Used by business and expert layouts.
 */
interface HeaderProps {
  /** e.g. "Acme Corp" or "Dr. Sarah Chen" - used for avatar initials */
  userDisplayName: string
  /** Show teal dot on bell (unread notifications) */
  showNotificationDot?: boolean
}

function getInitials(name: string): string {
  const parts = (name || '').trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  if (parts[0]?.length >= 2) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0]?.[0] ?? 'U').toUpperCase()
}

export function Header({
  userDisplayName,
  showNotificationDot = true,
}: HeaderProps) {
  const initials = getInitials(userDisplayName)

  return (
    <header className="h-16 shrink-0 bg-white border-b border-gray-200 flex items-center justify-end px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          aria-label="Notifications"
        >
          <IconBell />
          {showNotificationDot && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#008C9E]" aria-hidden />
          )}
        </button>
        <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
      </div>
    </header>
  )
}
