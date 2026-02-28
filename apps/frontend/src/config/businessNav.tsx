import type { SidebarItem } from '../components/layout/Sidebar'
import { IconHome, IconPlus, IconDocument, IconEnvelope, IconMessage, IconSettings } from '../components/layout/DashboardIcons'

/** Business dashboard sidebar config. Pass to shared DashboardLayout / Sidebar. */
const base = '/business'

export const businessSidebarItems: SidebarItem[] = [
  { to: `${base}/dashboard`, label: 'Dashboard', icon: <IconHome /> },
  { to: `${base}/requirement`, label: 'Post Requirement', icon: <IconPlus /> },
  { to: `${base}/listings`, label: 'My Listings', icon: <IconDocument /> },
  { to: `${base}/proposals`, label: 'Proposals', icon: <IconEnvelope /> },
  { to: `${base}/messages`, label: 'Messages', icon: <IconMessage /> },
]

export const businessSidebarBottomItems: SidebarItem[] = [
  { to: `${base}/settings`, label: 'Settings', icon: <IconSettings /> },
]
