import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../layouts/DashboardLayout'
import { expertSidebarItems, expertSidebarBottomItems } from '../../config/expertNav'
import { IconDocument, IconTrendingUp, IconClock, IconDollar } from '../../components/layout/DashboardIcons'

const METRIC_CARDS = [
  { value: '5', label: 'Active Proposals', icon: IconDocument, iconBg: 'bg-[#00C49F]' },
  { value: '78%', label: 'Acceptance Rate', icon: IconTrendingUp, iconBg: 'bg-[#28A745]' },
  { value: '3hrs', label: 'Avg Response Time', icon: IconClock, iconBg: 'bg-[#007BFF]' },
  { value: '$48.5K', label: 'Total Earnings', icon: IconDollar, iconBg: 'bg-[#6F42C1]' },
]

const RECOMMENDED = [
  { id: '1', title: 'AI & Machine Learning Expert for Tech Conference', company: 'Acme Corp', compensation: '$10,000 - $15,000', level: 'L4 - Advanced', match: 94, posted: '2 days ago' },
  { id: '2', title: 'Enterprise AI Strategy Workshop', company: 'TechGlobal Inc', compensation: '$8,000 - $12,000', level: 'L3 - Intermediate', match: 88, posted: '3 days ago' },
  { id: '3', title: 'Machine Learning Implementation Training', company: 'DataFlow Systems', compensation: '$12,000 - $18,000', level: 'L4 - Advanced', match: 91, posted: '5 days ago' },
]

export function ExpertDashboard() {
  return (
    <DashboardLayout
      sidebarItems={expertSidebarItems}
      sidebarBottomItems={expertSidebarBottomItems}
      userTypeLabel="Expert"
      userDisplayName="Dr. Sarah Chen"
      userSubLabel="Expert Account"
      accentColor="green"
      sidebarFooter={
        <Link to="/privacy" className="text-gray-500 hover:text-gray-700 no-underline">
          Manage cookies or opt out
        </Link>
      }
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Dr. Sarah Chen</h1>
          <p className="text-gray-600 mt-0.5">Here are your opportunities and performance metrics</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {METRIC_CARDS.map(({ value, label, icon: Icon, iconBg }) => (
            <div key={label} className="bg-white rounded-lg border border-gray-200 px-4 py-4 shadow-sm flex flex-col">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white ${iconBg}`}>
                  <Icon />
                </div>
                <p className="text-xl font-bold text-gray-900 leading-none">{value}</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">{label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-teal-800 px-6 py-5 mb-8">
          <h2 className="text-lg font-bold text-white mb-1">New Matching Requirements Available</h2>
          <p className="text-sm text-teal-100 mb-4">
            3 new requirements match your expertise profile. Browse and submit proposals to connect with businesses.
          </p>
          <Link
            to="/expert/browse"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white text-teal-800 font-semibold text-sm shadow-sm hover:bg-gray-50 no-underline"
          >
            Browse Requirements
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 pb-4 mb-0 border-b border-gray-200">Recommended for You</h2>
          <div className="divide-y divide-gray-200">
            {RECOMMENDED.map((r) => (
              <div key={r.id} className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <h3 className="font-semibold text-gray-900">{r.title}</h3>
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 shrink-0">
                      {r.match}% Match
                    </span>
                  </div>
                  <Link
                    to={`/expert/browse/${r.id}/propose`}
                    className="shrink-0 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#1C9F8A] text-white text-sm font-semibold hover:opacity-90 no-underline"
                  >
                    Submit Proposal
                  </Link>
                </div>
                <p className="text-sm text-gray-500 mt-1.5">
                  {r.company} · {r.compensation} · {r.level} · Posted {r.posted}
                </p>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-200">
          <Link to="/expert/browse" className="text-[#1C9F8A] text-sm font-medium hover:underline">
            View all requirements →
          </Link>
        </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
