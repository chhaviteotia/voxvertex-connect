import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../layouts/DashboardLayout'
import { businessSidebarItems, businessSidebarBottomItems } from '../../config/businessNav'
import { IconSparkles, IconUsers, IconClock, IconPlus } from '../../components/layout/DashboardIcons'

type Status = 'Matching' | 'Active' | 'In Review'

const LISTINGS = [
  {
    id: '1',
    title: 'AI Training for Sales Team',
    subtitle: 'Upskill sales team on AI tools',
    status: 'Matching' as Status,
    matches: 8,
    proposals: 3,
    created: 'Created 2 days ago',
    budget: '₹1,50,000 – ₹2,50,000',
  },
  {
    id: '2',
    title: 'Leadership Workshop for Managers',
    subtitle: 'Develop leadership capabilities',
    status: 'Active' as Status,
    matches: 12,
    proposals: 7,
    created: 'Created 5 days ago',
    budget: '₹2,00,000 – ₹3,50,000',
  },
  {
    id: '3',
    title: 'Strategic Planning Consultation',
    subtitle: 'Develop 3-year strategic roadmap',
    status: 'In Review' as Status,
    matches: 6,
    proposals: 4,
    created: 'Created 1 day ago',
    budget: '₹5,00,000+',
  },
]

const STATUS_STYLES: Record<Status, string> = {
  Matching: 'bg-[#2563EB] text-white',
  Active: 'bg-[#00A7B3] text-white',
  'In Review': 'bg-[#FACC15] text-[#1F2937]',
}

export function Requirement() {
  return (
    <DashboardLayout
      sidebarItems={businessSidebarItems}
      sidebarBottomItems={businessSidebarBottomItems}
      userTypeLabel="Business"
      userDisplayName="Acme Corp"
      userSubLabel="Business Account"
      sidebarClassName="bg-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Requirement</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage your expert requirements</p>
          </div>
          <Link
            to="/business/create-requirement"
            className="inline-flex items-center gap-2 rounded-lg bg-[#008C9E] px-4 py-2.5 text-sm font-semibold text-white no-underline hover:opacity-90"
          >
            <IconPlus />
            <span>Create Requirement</span>
          </Link>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16l-6 8v6l-4 2v-8z" />
              </svg>
            </span>
            <span>Filters</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span>All Status</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {LISTINGS.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-gray-900">{item.title}</h2>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{item.subtitle}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div className="text-xs uppercase tracking-wide text-gray-400">Budget</div>
                  <div className="mt-0.5 font-semibold text-gray-900">{item.budget}</div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="inline-flex items-center gap-1.5">
                    <IconSparkles />
                    <span className="text-xs text-gray-500">{item.matches} matches</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <IconUsers />
                    <span className="text-xs text-gray-500">{item.proposals} proposals</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <IconClock />
                    <span className="text-xs text-gray-500">{item.created}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
