import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../layouts/DashboardLayout'
import { businessSidebarItems, businessSidebarBottomItems } from '../../config/businessNav'
import { IconDocument, IconUsers, IconTrendingUp } from '../../components/layout/DashboardIcons'

const METRIC_CARDS = [
  { value: '5', label: 'Active Requirements', icon: IconDocument, subtitle: '+2 this week', subtitleTeal: true, subtitleIcon: 'arrow' as const },
  { value: '24', label: 'Expert Matches', icon: IconUsers, subtitle: '8 new today', subtitleTeal: true, subtitleIcon: 'sparkle' as const },
  { value: '18', label: 'Proposals Received', icon: IconDocument, subtitle: 'Pending review', subtitleTeal: false, subtitleIcon: null },
  { value: '92%', label: 'Match Quality', icon: IconTrendingUp, subtitle: 'Above average', subtitleTeal: true, subtitleIcon: null },
]

const TEAL = '#2293B4'

const REQUIREMENTS = [
  { id: '1', title: 'AI Training for Sales Team', matches: 8, timeAgo: '2d ago', status: 'Matching' as const },
  { id: '2', title: 'Leadership Workshop for Managers', matches: 12, timeAgo: '5d ago', status: 'Active' as const },
  { id: '3', title: 'Strategic Planning Consultation', matches: 6, timeAgo: '1d ago', status: 'In Review' as const },
]

const ACTIVITIES = [
  { description: 'New proposal from Sarah Johnson for AI Training', time: '2 hours ago' },
  { description: 'Expert match found for Leadership Workshop', time: '5 hours ago' },
  { description: "Requirement 'Sales Training' published", time: '1 day ago' },
]

export function Dashboard() {
  return (
    <DashboardLayout sidebarItems={businessSidebarItems} sidebarBottomItems={businessSidebarBottomItems} userTypeLabel="Business" userDisplayName="Acme Corp" userSubLabel="Business Account" sidebarClassName="bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Welcome back to Voxvertex Connect</p>
          </div>
          <Link
            to="/business/requirement"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold text-sm hover:opacity-90 shrink-0 no-underline"
            style={{ backgroundColor: TEAL }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Requirement
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {METRIC_CARDS.map(({ value, label, icon: Icon, subtitle, subtitleTeal, subtitleIcon }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 px-5 py-4 shadow-sm flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <span className="flex items-center justify-center shrink-0" style={{ color: TEAL }}>
                  <Icon />
                </span>
                <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
              </div>
              <p className="text-sm font-medium text-gray-800 mt-3">{label}</p>
              {subtitle && (
                <p className={`text-xs mt-2 flex items-center gap-1 ${subtitleTeal ? '' : 'text-gray-600'}`} style={subtitleTeal ? { color: TEAL } : undefined}>
                  {subtitleIcon === 'arrow' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <polyline points="6 15 12 9 18 15" />
                    </svg>
                  )}
                  {subtitleIcon === 'sparkle' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                      <path d="M6 18l.75 2.25L9 21l-2.25.75L6 24l-.75-2.25L3 21l2.25-.75L6 18z" />
                      <path d="M18 18l.75 2.25L21 21l-2.25.75L18 24l-.75-2.25L15 21l2.25-.75L18 18z" />
                    </svg>
                  )}
                  {subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Active Requirements</h2>
              <Link to="/business/requirement" className="text-sm font-medium text-gray-700 no-underline hover:text-gray-900 inline-flex items-center gap-1">
                View All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
            <div className="space-y-4">
              {REQUIREMENTS.map((r) => (
                <Link
                  key={r.id}
                  to={`/business/requirement/${r.id}`}
                  className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-gray-300 transition-colors no-underline"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{r.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-1.5 text-gray-500 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:text-gray-400">
                          <IconUsers />
                          {r.matches} matches
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-gray-500">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-400">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {r.timeAgo}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                        r.status === 'Active' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-80 shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Recent Activity</h2>
            <div className="divide-y divide-gray-200">
              {ACTIVITIES.map((a, i) => (
                <div key={i} className="py-4 first:pt-0">
                  <p className="text-sm font-medium text-gray-900">{a.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                  <path d="M6 18l.75 2.25L9 21l-2.25.75L6 24l-.75-2.25L3 21l2.25-.75L6 18z" />
                  <path d="M18 18l.75 2.25L21 21l-2.25.75L18 24l-.75-2.25L15 21l2.25-.75L18 18z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-gray-900">AI Insight</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Your &quot;AI Training for Sales Team&quot; requirement has high engagement. Consider posting similar requirements for other departments to maintain momentum.
                </p>
                <Link
                  to="/business/requirement"
                  className="inline-flex items-center justify-center mt-4 px-6 py-2.5 rounded-md bg-white border border-gray-200 text-gray-900 text-sm font-medium hover:bg-gray-50 no-underline"
                >
                  View Recommendation
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/business/create-requirement"
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-5 hover:bg-gray-50 transition-colors no-underline"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 mb-2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span className="text-sm font-medium text-gray-900">New Requirement</span>
              </Link>
              <Link
                to="/business/experts"
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-5 hover:bg-gray-50 transition-colors no-underline"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 mb-2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="text-sm font-medium text-gray-900">Browse Experts</span>
              </Link>
              <Link
                to="/business/messages"
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-5 hover:bg-gray-50 transition-colors no-underline"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 mb-2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-sm font-medium text-gray-900">View Messages</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
