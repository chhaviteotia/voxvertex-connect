import { Sidebar } from '../components/layout/Sidebar'
import { Header } from '../components/layout/Header'
import type { SidebarItem } from '../components/layout/Sidebar'

/**
 * Shared layout: dark sidebar (logo + nav + user) + white header (search + notifications + avatar) + main content.
 * Used by business and expert dashboards.
 */
interface DashboardLayoutProps {
  children: React.ReactNode
  sidebarItems: SidebarItem[]
  sidebarBottomItems?: SidebarItem[]
  userTypeLabel?: string
  userDisplayName: string
  userSubLabel?: string
  accentColor?: 'blue' | 'green'
  sidebarFooter?: React.ReactNode
  sidebarClassName?: string
  /** Extra class for main content area (e.g. expert: "pl-10" for more left padding) */
  mainClassName?: string
}

export function DashboardLayout({
  children,
  sidebarItems,
  sidebarBottomItems,
  userDisplayName,
  userSubLabel,
  accentColor = 'blue',
  sidebarFooter,
  sidebarClassName,
  mainClassName,
}: DashboardLayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar
        items={sidebarItems}
        bottomItems={sidebarBottomItems}
        userDisplayName={userDisplayName}
        userSubLabel={userSubLabel}
        accentColor={accentColor}
        footer={sidebarFooter}
        className={sidebarClassName}
      />
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Header userDisplayName={userDisplayName} />
        <main className={`flex-1 overflow-auto py-6 px-6 min-w-0 ${mainClassName ?? ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
