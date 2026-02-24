import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../layouts/DashboardLayout'
import { businessSidebarItems, businessSidebarBottomItems } from '../../config/businessNav'
import { IconEye, IconTrendingUp, IconClock, IconCheckSquare } from '../../components/layout/DashboardIcons'

const METRIC_CARDS = [
  { value: '3', label: 'Active Listings', icon: IconEye },
  { value: '24', label: 'Total Proposals', icon: IconTrendingUp },
  { value: '8', label: 'In Review', icon: IconClock },
  { value: '5', label: 'Shortlisted', icon: IconCheckSquare },
]

const REQUIREMENTS = [
  { id: '1', title: 'AI & Machine Learning Expert for Tech Conference', proposals: 12, views: 156, updated: '3 hours ago', posted: '2024-02-11 14:32', deadline: 'Feb 18, 2026', status: 'Open' as const, newCount: 2 },
  { id: '2', title: 'Cybersecurity Specialist for Enterprise Workshop', proposals: 8, views: 94, updated: '1 day ago', posted: '2024-02-10 09:15', deadline: 'Feb 25, 2026', status: 'Open' as const, newCount: null },
  { id: '3', title: 'Leadership & Management Expert for Executive Summit', proposals: 5, views: 67, updated: '2 days ago', posted: '2024-02-09 16:00', deadline: 'Mar 1, 2026', status: 'Reviewing' as const, newCount: null },
]

const ACTIVITIES = [
  { name: 'Marcus Rodriguez', action: 'submitted proposal', role: 'AI & Machine Learning Expert', time: '2 hours ago', color: 'bg-blue-500' },
  { name: 'Dr. Lisa Park', action: 'viewed requirement', role: 'Cybersecurity Specialist', time: '4 hours ago', color: 'bg-gray-400' },
  { name: 'James Wilson', action: 'submitted proposal', role: 'AI & Machine Learning Expert', time: '5 hours ago', color: 'bg-blue-500' },
  { name: 'Dr. Sarah Chen', action: 'sent you a message', role: 'Leadership Expert', time: '1 day ago', color: 'bg-green-500' },
]

function formatLastUpdated() {
  const now = new Date()
  const month = now.toLocaleString('en-US', { month: 'short' })
  const day = now.getDate()
  const h = now.getHours() % 12 || 12
  const min = now.getMinutes()
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM'
  return `${month} ${day}, ${h}:${min.toString().padStart(2, '0')} ${ampm}`
}

export function Dashboard() {
  return (
    <DashboardLayout sidebarItems={businessSidebarItems} sidebarBottomItems={businessSidebarBottomItems} userTypeLabel="Business" userDisplayName="Acme Corp" userSubLabel="Business Account" sidebarClassName="bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Last updated: {formatLastUpdated()}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {METRIC_CARDS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="bg-white rounded-lg border border-gray-200 px-4 py-3 shadow-sm flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><Icon /></div>
                <p className="text-xl font-bold text-gray-900 leading-none">{value}</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Active Requirements</h2>
              <button type="button" className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium text-sm hover:bg-blue-100">+ New</button>
            </div>
            <div className="space-y-4">
              {REQUIREMENTS.map((r) => (
                <div key={r.id} className="rounded-lg border border-gray-200 p-4 bg-white">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900 flex-1 min-w-0">{r.title}</h3>
                    <Link to={`/business/listings/${r.id}`} className="text-blue-600 text-sm font-medium hover:underline shrink-0 no-underline">View</Link>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{r.proposals} proposals • {r.views} views • Updated {r.updated}</p>
                  <p className="text-xs text-gray-500 mb-3">Posted: {r.posted} • Deadline: {r.deadline}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${r.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-blue-50 text-blue-700'}`}>{r.status}</span>
                    {r.newCount != null && <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium text-amber-700">{r.newCount} new</span>}
                  </div>
                </div>
              ))}
            </div>
            <Link to="/business/listings" className="inline-block mt-3 text-blue-600 text-sm font-medium hover:underline">View all requirements →</Link>
          </div>
          <div className="w-full lg:w-80 shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="divide-y divide-gray-200">
              {ACTIVITIES.map((a, i) => (
                <div key={i} className="flex gap-3 py-3 first:pt-0">
                  <span className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${a.color}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{a.name} {a.action}</p>
                    <p className="text-xs text-gray-500">{a.role}</p>
                    <p className="text-xs text-gray-400">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-xl bg-[#F7F9FC] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Need to find another expert?</h3>
            <p className="text-sm text-gray-600 mt-0.5">Create a new requirement and receive proposals from qualified experts</p>
          </div>
          <Link to="/business/post-requirement" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1A64FF] text-white font-semibold text-sm hover:opacity-90 shrink-0 no-underline">
            <span aria-hidden>+</span>
            Post Requirement
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
