import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/selectors/authSelectors'
import { DashboardLayout } from '../../layouts/DashboardLayout'
import { expertSidebarItems, expertSidebarBottomItems } from '../../config/expertNav'
import {
  IconTarget,
  IconUsers,
  IconCalendar,
  IconDollar,
  IconMapPin,
  IconClock,
  IconSearch,
} from '../../components/layout/DashboardIcons'

const TEAL = '#008C9E'

type Opportunity = {
  id: string
  title: string
  company: string
  match: number
  timeAgo: string
  objective: string
  audience: string
  typeDuration: string
  budget: string
  location: string
  timeline: string
}

const OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'AI Training for Sales Team',
    company: 'TechCorp India',
    match: 92,
    timeAgo: '1d ago',
    objective: 'Skill Development',
    audience: 'Sales Teams (25-30 people)',
    typeDuration: 'Workshop • 2 days',
    budget: '₹1,50,000 - ₹2,50,000',
    location: 'Online • Remote',
    timeline: 'Next 2 weeks',
  },
  {
    id: '2',
    title: 'Leadership Development Program',
    company: 'Manufacturing Ltd',
    match: 88,
    timeAgo: '2d ago',
    objective: 'Leadership Development',
    audience: 'Middle Management',
    typeDuration: 'Training Series',
    budget: '₹2,00,000 - ₹3,50,000',
    location: 'Hybrid • Mumbai',
    timeline: 'Next month',
  },
  {
    id: '3',
    title: 'Executive Coaching Program',
    company: 'Startup Inc',
    match: 78,
    timeAgo: '5d ago',
    objective: 'Leadership Development',
    audience: 'Executives (3-5 people)',
    typeDuration: 'Coaching • 8 weeks',
    budget: '₹1,00,000 - ₹2,00,000',
    location: 'Hybrid • Delhi NCR',
    timeline: 'Starting next month',
  },
]

function getMatchBadgeStyle(match: number) {
  if (match >= 85) return { bg: '#22c55e' } // green
  return { bg: '#f97316' } // orange for lower match
}

export function ExpertBrowse() {
  const user = useAppSelector(selectUser) as { name?: string; email?: string } | null
  const prefix = (user?.email || '').split('@')[0] || 'John'
  const displayName = user?.name || (prefix ? prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + ' Doe' : 'John Doe')

  const [search, setSearch] = useState('')
  const [domain, setDomain] = useState('All Domains')
  const [budget, setBudget] = useState('All Budgets')
  const [type, setType] = useState('All Types')

  return (
    <DashboardLayout
      sidebarItems={expertSidebarItems}
      sidebarBottomItems={expertSidebarBottomItems}
      userTypeLabel="Expert"
      userDisplayName={displayName}
      userSubLabel="Expert"
      accentColor="green"
      mainClassName="pl-5 pr-6"
    >
      <div className="max-w-5xl mx-auto pb-8 pt-6 px-4" style={{ backgroundColor: '#F7F7F7' }}>
        <h1 className="text-2xl font-bold text-gray-900">Opportunities</h1>
        <p className="text-sm text-gray-500 mt-0.5">Requirements matched to your expertise</p>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mt-6 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#008C9E]/20 focus:border-[#008C9E]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C9E]/20 focus:border-[#008C9E]"
            >
              <option>All Domains</option>
            </select>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C9E]/20 focus:border-[#008C9E]"
            >
              <option>All Budgets</option>
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C9E]/20 focus:border-[#008C9E]"
            >
              <option>All Types</option>
            </select>
          </div>
        </div>

        {/* Opportunity cards */}
        <div className="space-y-4">
          {OPPORTUNITIES.map((opp) => {
            const matchStyle = getMatchBadgeStyle(opp.match)
            return (
              <div
                key={opp.id}
                className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h2 className="text-lg font-bold text-gray-900">{opp.title}</h2>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="inline-flex rounded-md px-2.5 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: matchStyle.bg }}
                    >
                      {opp.match}% Match
                    </span>
                    <span className="text-sm text-gray-400">{opp.timeAgo}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">{opp.company}</p>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Objective</p>
                      <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                        <IconTarget className="w-4 h-4 text-gray-400 shrink-0" />
                        {opp.objective}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Audience</p>
                      <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                        <IconUsers className="w-4 h-4 text-gray-400 shrink-0" />
                        {opp.audience}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Type & Duration</p>
                      <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                        <IconCalendar className="w-4 h-4 text-gray-400 shrink-0" />
                        {opp.typeDuration}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Budget</p>
                      <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                        <IconDollar className="w-4 h-4 text-gray-400 shrink-0" />
                        {opp.budget}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <IconMapPin className="w-4 h-4 text-gray-500 shrink-0" />
                    {opp.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <IconClock className="w-4 h-4 text-gray-500 shrink-0" />
                    {opp.timeline}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/expert/browse/${opp.id}`}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 no-underline"
                    style={{ backgroundColor: TEAL }}
                  >
                    View Full Details
                  </Link>
                  <Link
                    to={`/expert/browse/${opp.id}/propose`}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 no-underline"
                  >
                    Submit Proposal
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="button"
            className="px-6 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Load More Opportunities
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
