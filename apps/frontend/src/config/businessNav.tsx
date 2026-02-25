import type { SidebarItem } from '../components/layout/Sidebar'
import { IconDashboard, IconRequirements, IconUsers, IconMessage, IconSettings } from '../components/layout/DashboardIcons'

/** Business dashboard sidebar config. Matches design: Dashboard, Requirements, Experts, Messages, Settings. */
const base = '/business'

export const businessSidebarItems: SidebarItem[] = [
  { to: `${base}/dashboard`, label: 'Dashboard', icon: <IconDashboard /> },
  { to: `${base}/requirement`, label: 'Requirements', icon: <IconRequirements /> },
  { to: `${base}/experts`, label: 'Experts', icon: <IconUsers /> },
  { to: `${base}/messages`, label: 'Messages', icon: <IconMessage /> },
]

export const businessSidebarBottomItems: SidebarItem[] = [
  { to: `${base}/settings`, label: 'Settings', icon: <IconSettings /> },
]
