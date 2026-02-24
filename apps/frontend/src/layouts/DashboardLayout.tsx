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
}

export function DashboardLayout({
  children,
  sidebarItems,
  sidebarBottomItems,
  userDisplayName,
  accentColor = 'blue',
  sidebarFooter,
  sidebarClassName,
}: DashboardLayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar
        items={sidebarItems}
        bottomItems={sidebarBottomItems}
        userDisplayName={userDisplayName}
        accentColor={accentColor}
        footer={sidebarFooter}
        className={sidebarClassName}
      />
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Header userDisplayName={userDisplayName} />
        <main className="flex-1 overflow-auto p-6 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
