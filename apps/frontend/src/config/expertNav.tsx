import type { SidebarItem } from '../components/layout/Sidebar'
import { IconHome, IconDocument, IconSearch, IconUser, IconDollar, IconSettings } from '../components/layout/DashboardIcons'

/** Expert dashboard sidebar config. Pass to shared DashboardLayout / Sidebar with accentColor="green". */
const base = '/expert'

export const expertSidebarItems: SidebarItem[] = [
  { to: `${base}/dashboard`, label: 'Dashboard', icon: <IconHome /> },
  { to: `${base}/proposals`, label: 'My Proposals', icon: <IconDocument /> },
  { to: `${base}/browse`, label: 'Browse Requirements', icon: <IconSearch /> },
  { to: `${base}/profile`, label: 'Profile', icon: <IconUser /> },
  { to: `${base}/earnings`, label: 'Earnings', icon: <IconDollar /> },
]

export const expertSidebarBottomItems: SidebarItem[] = [
  { to: `${base}/settings`, label: 'Settings', icon: <IconSettings /> },
]
