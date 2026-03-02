import { useState } from 'react'
import { DashboardLayout } from '../../layouts/DashboardLayout'
import { expertSidebarItems, expertSidebarBottomItems } from '../../config/expertNav'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/selectors/authSelectors'
import {
  IconUser,
  IconTarget,
  IconCalendar,
  IconDollar,
  IconSparkles,
  IconLock,
  IconDelivery,
} from '../../components/layout/DashboardIcons'

const ACCENT = '#1A97DA'
const SELECTED_TEAL = '#008C9E'

const DEFAULT_OBJECTIVES = [
  'Skill Development',
  'Revenue Generation',
  'Hiring & Talent',
  'Brand Positioning',
  'Leadership Alignment',
  'Innovation & Problem Solving',
  'Compliance & Risk',
  'Community & Networking',
  'Product Adoption',
  'Behavior Change',
]

const DEFAULT_AUDIENCES = [
  'Students',
  'Job Seekers',
  'Entry Level Employees',
  'Individual Contributors',
  'Managers',
  'Senior Managers',
  'Leaders',
  'Executives',
  'Founders',
  'Entrepreneurs',
  'Sales Team',
  'Marketing Team',
  'HR Team',
  'Tech Team',
  'Product Team',
  'Operations Team',
  'Finance Team',
  'Cross-Functional Team',
  'Customers',
  'Partners',
  'Investors',
  'Community Members',
]

const DEFAULT_INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Education',
  'Startups',
]

const DEFAULT_TOPICS = [
  'Leadership Development',
  'Public Speaking',
  'Communication Skills',
  'Team Building',
  'Emotional Intelligence',
  'Change Management',
  'Strategic Planning',
  'Innovation & Creativity',
  'Project Management',
  'Agile & Scrum',
  'Digital Transformation',
  'Data Analytics',
  'Artificial Intelligence',
  'Cybersecurity',
  'Product Management',
  'Sales Strategy',
  'Marketing Strategy',
  'Customer Success',
  'Negotiation Skills',
  'Conflict Resolution',
  'Time Management',
  'Productivity',
  'Entrepreneurship',
  'Startup Strategy',
  'Fundraising',
  'Financial Planning',
  'Operations Management',
  'Supply Chain',
  'Human Resources',
  'Diversity & Inclusion',
]

const SECTIONS = [
  { id: 'identity', title: 'Identity', weight: '15%', summary: 'Bio, LinkedIn, Photo', icon: IconUser, locked: false },
  { id: 'capability', title: 'Capability', weight: '25%', summary: 'Objectives, Audience, Industries', icon: IconTarget, locked: true },
  { id: 'experience', title: 'Experience', weight: '25%', summary: 'Past engagements and outcomes', icon: IconUser, locked: true },
  { id: 'delivery', title: 'Delivery Model', weight: '15%', summary: 'Structure, Tools, Follow-up', icon: IconDelivery, locked: true },
  { id: 'pricing', title: 'Pricing', weight: '10%', summary: 'Fee bands and flexibility', icon: IconDollar, locked: true },
  { id: 'availability', title: 'Availability', weight: '10%', summary: 'Calendar and travel', icon: IconCalendar, locked: true },
] as const

export function ExpertProfile() {
  const user = useAppSelector(selectUser) as { name?: string; email?: string } | null
  const prefix = (user?.email || '').split('@')[0] || 'John'
  const displayName = user?.name || (prefix ? prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + ' Doe' : 'John Doe')

  const [expandedId, setExpandedId] = useState<string | null>('identity')
  const [bio, setBio] = useState('')
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  // Capability selections
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>(['Hiring & Talent'])
  const [customObjectives, setCustomObjectives] = useState<string[]>([])
  const [customObjectiveInput, setCustomObjectiveInput] = useState('')

  const [selectedAudiences, setSelectedAudiences] = useState<string[]>(['Marketing Team', 'Operations Team'])
  const [customAudiences, setCustomAudiences] = useState<string[]>([])
  const [customAudienceInput, setCustomAudienceInput] = useState('')

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])

  const [selectedEngagementTypes, setSelectedEngagementTypes] = useState<string[]>(['Keynote Session', 'Panel Discussion'])
  const [customEngagementTypes, setCustomEngagementTypes] = useState<string[]>([])
  const [customEngagementInput, setCustomEngagementInput] = useState('')

  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Time Management', 'Operations Management'])
  const [customTopics, setCustomTopics] = useState<string[]>([])
  const [customTopicInput, setCustomTopicInput] = useState('')

  // Other sections
  const [deliveryStructure, setDeliveryStructure] = useState('')
  const [toolsPlatforms, setToolsPlatforms] = useState('')
  const [offerFollowUp, setOfferFollowUp] = useState(false)

  const [baseFee, setBaseFee] = useState('150000')
  const [priceFlexibility, setPriceFlexibility] = useState('Moderate - Some flexibility')

  const [weeklyAvailability, setWeeklyAvailability] = useState('')
  const [travelWillingness, setTravelWillingness] = useState('Select travel willingness')

  const [showExperienceForm, setShowExperienceForm] = useState(false)
  const [experienceTitle, setExperienceTitle] = useState('')
  const [experienceOutcome, setExperienceOutcome] = useState('')
  const [experienceAudience, setExperienceAudience] = useState('')
  const [experienceYear, setExperienceYear] = useState('')

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

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
      <div className="max-w-3xl mx-auto pb-10" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="pt-2 pb-6">
          <h1 className="text-2xl font-bold text-gray-900">Expert Profile</h1>
          <p className="text-sm text-gray-500 mt-0.5">Complete your profile to get better matches</p>
        </div>

        {/* Profile Strength */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Profile Strength</h2>
              <p className="text-sm text-gray-500 mt-0.5">Complete all sections to maximize your opportunities</p>
            </div>
            <span className="text-lg font-semibold shrink-0" style={{ color: ACCENT }}>20%</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full rounded-full bg-gray-700" style={{ width: '20%' }} />
          </div>
          <div className="mt-4 rounded-lg px-4 py-3 flex items-start gap-3 bg-[#FEE2E2]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white text-sm font-bold">!</span>
            <p className="text-sm font-medium text-red-600">Limited visibility - Complete more sections to improve matching</p>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="rounded-xl border border-gray-200 shadow-sm p-5 mb-6" style={{ backgroundColor: '#DBEEFA' }}>
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#1A97DA]">
              <IconSparkles />
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-gray-900">AI Suggestions</h2>
              <p className="text-sm text-gray-700 mt-0.5">Complete &quot;Capability&quot; section next - it has the highest impact on matching</p>
              <button
                type="button"
                className="mt-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: ACCENT }}
              >
                Improve Profile with AI
              </button>
            </div>
          </div>
        </div>

        {/* Accordion sections */}
        <div className="space-y-3">
          {SECTIONS.map((section) => {
            const Icon = section.icon
            const isExpanded = expandedId === section.id
            return (
              <div key={section.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50/50"
                  onClick={() => toggle(section.id)}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#1A97DA]">
                    <Icon />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
                      <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                        {section.weight} weight
                      </span>
                      {section.locked && (
                        <span className="text-gray-500">
                          <IconLock />
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{section.summary}</p>
                  </div>
                  <span className="text-gray-500 shrink-0">
                    {isExpanded ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    )}
                  </span>
                </button>

                {section.id === 'identity' && isExpanded && (
                  <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/30">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">Professional Bio</label>
                        <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Tell businesses about your expertise and approach..."
                          rows={4}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">LinkedIn URL</label>
                        <input
                          type="url"
                          value={linkedInUrl}
                          onChange={(e) => setLinkedInUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">Profile Photo URL</label>
                        <input
                          type="url"
                          value={photoUrl}
                          onChange={(e) => setPhotoUrl(e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                        />
                      </div>
                      <button
                        type="button"
                        className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                        style={{ backgroundColor: ACCENT }}
                      >
                        Save Identity
                      </button>
                    </div>
                  </div>
                )}

                {section.id === 'capability' && isExpanded && (
                  <div className="border-t border-gray-100 px-5 py-5 bg-gray-50/30">
                    <div className="space-y-6">
                      {/* Objectives You Support */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Objectives You Support</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {[...DEFAULT_OBJECTIVES, ...customObjectives].map((label) => {
                            const isActive = selectedObjectives.includes(label)
                            const isCustom = !DEFAULT_OBJECTIVES.includes(label)
                            return (
                              <button
                                key={label}
                                type="button"
                                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${
                                  isActive
                                    ? isCustom
                                      ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white'
                                      : 'text-white'
                                    : 'border-gray-200 bg-white text-gray-800'
                                }`}
                                style={isActive && !isCustom ? { borderColor: SELECTED_TEAL, backgroundColor: SELECTED_TEAL } : undefined}
                                onClick={() => {
                                  setSelectedObjectives((prev) =>
                                    prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label],
                                  )
                                }}
                              >
                                <span>{label}</span>
                                {isActive && <span className="text-xs">×</span>}
                              </button>
                            )
                          })}
                        </div>
                        <div className="mt-3 rounded-xl bg-gray-100 p-4">
                          <p className="text-sm font-medium text-gray-600 mb-2">Add Custom Objective (Not in List Above)</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="e.g., Branding, Marketing..."
                              value={customObjectiveInput}
                              onChange={(e) => setCustomObjectiveInput(e.target.value)}
                              className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                            />
                            <button
                              type="button"
                              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-lg font-semibold text-white"
                              style={{ backgroundColor: SELECTED_TEAL }}
                              onClick={() => {
                                const value = customObjectiveInput.trim()
                                if (!value) return
                                if (!customObjectives.includes(value)) setCustomObjectives((prev) => [...prev, value])
                                setSelectedObjectives((prev) => (prev.includes(value) ? prev : [...prev, value]))
                                setCustomObjectiveInput('')
                              }}
                              aria-label="Add custom objective"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Target Audiences */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Target Audiences</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {[...DEFAULT_AUDIENCES, ...customAudiences].map((label) => {
                            const isActive = selectedAudiences.includes(label)
                            const isCustom = !DEFAULT_AUDIENCES.includes(label)
                            return (
                              <button
                                key={label}
                                type="button"
                                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${
                                  isActive
                                    ? isCustom
                                      ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white'
                                      : 'text-white'
                                    : 'border-gray-200 bg-white text-gray-800'
                                }`}
                                style={isActive && !isCustom ? { borderColor: SELECTED_TEAL, backgroundColor: SELECTED_TEAL } : undefined}
                                onClick={() => {
                                  setSelectedAudiences((prev) =>
                                    prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label],
                                  )
                                }}
                              >
                                <span>{label}</span>
                                {isActive && <span className="text-xs">×</span>}
                              </button>
                            )
                          })}
                        </div>
                        <div className="mt-3 rounded-xl bg-gray-100 p-4">
                          <p className="text-sm font-medium text-gray-600 mb-2">Add Custom Audience (Not in List Above)</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="e.g., Board Members, Volunteers..."
                              value={customAudienceInput}
                              onChange={(e) => setCustomAudienceInput(e.target.value)}
                              className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                            />
                            <button
                              type="button"
                              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-lg font-semibold text-white"
                              style={{ backgroundColor: SELECTED_TEAL }}
                              onClick={() => {
                                const value = customAudienceInput.trim()
                                if (!value) return
                                if (!customAudiences.includes(value)) setCustomAudiences((prev) => [...prev, value])
                                setSelectedAudiences((prev) => (prev.includes(value) ? prev : [...prev, value]))
                                setCustomAudienceInput('')
                              }}
                              aria-label="Add custom audience"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Industries */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Industries</h4>
                        <div className="flex flex-wrap gap-2">
                          {DEFAULT_INDUSTRIES.map((label) => {
                            const isActive = selectedIndustries.includes(label)
                            return (
                              <button
                                key={label}
                                type="button"
                                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${
                                  isActive
                                    ? 'text-white'
                                    : 'border-gray-200 bg-white text-gray-800'
                                }`}
                                style={isActive ? { borderColor: SELECTED_TEAL, backgroundColor: SELECTED_TEAL } : undefined}
                                onClick={() => {
                                  setSelectedIndustries((prev) =>
                                    prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label],
                                  )
                                }}
                              >
                                <span>{label}</span>
                                {isActive && <span className="text-xs">×</span>}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Engagement Types You Offer */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Engagement Types You Offer</h4>
                        <p className="text-xs text-gray-500 mb-3">
                          Select the types of engagements you&apos;re open to delivering
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { title: 'Keynote Session', intensity: 'low intensity', outcome: 'low outcome' },
                            { title: 'Panel Discussion', intensity: 'low intensity', outcome: 'low outcome' },
                            { title: 'Fireside Chat', intensity: 'low intensity', outcome: 'medium outcome' },
                            { title: 'Workshop (Single Day)', intensity: 'high intensity', outcome: 'medium outcome' },
                            { title: 'Workshop (Multi-Day)', intensity: 'high intensity', outcome: 'high outcome' },
                            { title: 'Bootcamp', intensity: 'high intensity', outcome: 'high outcome' },
                            { title: 'Coaching (1-on-1)', intensity: 'high intensity', outcome: 'high outcome' },
                            { title: 'Coaching (Group)', intensity: 'high intensity', outcome: 'high outcome' },
                            { title: 'Mentorship Program', intensity: 'medium intensity', outcome: 'high outcome' },
                            { title: 'Advisory Session', intensity: 'medium intensity', outcome: 'high outcome' },
                            { title: 'Strategy Offsite', intensity: 'high intensity', outcome: 'high outcome' },
                            { title: 'Roundtable', intensity: 'medium intensity', outcome: 'medium outcome' },
                            { title: 'Hackathon', intensity: 'high intensity', outcome: 'high outcome' },
                            { title: 'Masterclass', intensity: 'medium intensity', outcome: 'high outcome' },
                            { title: 'Webinar', intensity: 'low intensity', outcome: 'low outcome' },
                            { title: 'Training Program', intensity: 'high intensity', outcome: 'high outcome' },
                            { title: 'Implementation Sprint', intensity: 'high intensity', outcome: 'high outcome' },
                          ]
                            .concat(customEngagementTypes.map((t) => ({ title: t, intensity: 'medium intensity', outcome: 'medium outcome' })))
                            .map((item) => {
                              const isSelected = selectedEngagementTypes.includes(item.title)
                              return (
                                <button
                                  key={item.title}
                                  type="button"
                                  className="relative flex flex-col items-start rounded-xl border px-4 py-3 text-left"
                                  style={{
                                    borderColor: isSelected ? SELECTED_TEAL : '#E5E7EB',
                                    backgroundColor: isSelected ? '#F0FBFF' : 'white',
                                  }}
                                  onClick={() => {
                                    setSelectedEngagementTypes((prev) =>
                                      prev.includes(item.title) ? prev.filter((v) => v !== item.title) : [...prev, item.title],
                                    )
                                  }}
                                >
                                  {isSelected && (
                                    <span className="absolute top-3 right-3" style={{ color: SELECTED_TEAL }} aria-hidden>
                                      ✓
                                    </span>
                                  )}
                                  <span className="text-sm font-semibold text-gray-900">{item.title}</span>
                                  <span className="mt-1 text-xs">
                                    <span className={item.intensity.includes('low') ? 'text-green-600' : item.intensity.includes('medium') ? 'text-orange-500' : 'text-red-500'}>
                                      {item.intensity}
                                    </span>
                                    <span className="text-gray-400"> • </span>
                                    <span className={item.outcome.includes('low') ? 'text-gray-600' : item.outcome.includes('medium') ? 'text-orange-500' : 'text-green-600'}>
                                      {item.outcome}
                                    </span>
                                  </span>
                                </button>
                              )
                            })}
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="w-full rounded-xl bg-gray-100 p-4 flex items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-600 mb-2">Add Custom Engagement Type (Not in List Above)</p>
                              <input
                                type="text"
                                placeholder="e.g., Company Retreat, Board Advisory..."
                                value={customEngagementInput}
                                onChange={(e) => setCustomEngagementInput(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                              />
                            </div>
                            <button
                              type="button"
                              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-lg font-semibold text-white shrink-0"
                              style={{ backgroundColor: SELECTED_TEAL }}
                              aria-label="Add custom engagement type"
                              onClick={() => {
                                const value = customEngagementInput.trim()
                                if (!value) return
                                if (!customEngagementTypes.includes(value)) setCustomEngagementTypes((prev) => [...prev, value])
                                setSelectedEngagementTypes((prev) => (prev.includes(value) ? prev : [...prev, value]))
                                setCustomEngagementInput('')
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Interactivity Level */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-gray-900">Interactivity Level</h4>
                          <span className="text-xs font-medium text-gray-600">50% Interactive</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                          <div className="h-full rounded-full bg-gray-800" style={{ width: '50%' }} />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                          <span>Lecture-based</span>
                          <span>Highly Interactive</span>
                        </div>
                      </div>

                      {/* Functional Profile Alignment */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Functional Profile Alignment</h4>
                        <p className="text-xs text-gray-500 mb-3">
                          Rate yourself on these dimensions (1-5 scale)
                        </p>
                        {[
                          {
                            title: 'Technical Orientation',
                            helper: 'How technical is your content? (1 = Non-technical, 5 = Highly technical)',
                          },
                          {
                            title: 'Business Orientation',
                            helper: 'How business-focused is your content? (1 = Conceptual, 5 = Business outcomes)',
                          },
                          {
                            title: 'Tool Usage Maturity',
                            helper: 'How advanced are the tools you use? (1 = Basic, 5 = Advanced platforms)',
                          },
                          {
                            title: 'Process Orientation',
                            helper: 'How structured is your approach? (1 = Flexible, 5 = Highly structured)',
                          },
                        ].map((row) => (
                          <div key={row.title} className="flex flex-col gap-1.5 mb-3">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">{row.title}</p>
                                <p className="text-xs text-gray-500">{row.helper}</p>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                {[1, 2, 3, 4, 5].map((n) => {
                                  const active = n === 3
                                  return (
                                    <button
                                      key={n}
                                      type="button"
                                      className={`h-8 w-8 rounded-md border text-xs font-semibold ${
                                        active
                                          ? 'text-white'
                                          : 'border-gray-200 bg-white text-gray-700'
                                      }`}
                                      style={active ? { borderColor: SELECTED_TEAL, backgroundColor: SELECTED_TEAL } : undefined}
                                    >
                                      {n}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Depth Capacity */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Depth Capacity</h4>
                        <p className="text-xs text-gray-500 mb-3">How deep can you go in your topics?</p>
                        <div className="grid grid-cols-5 gap-2 mb-4">
                          {[
                            { label: '1', sub: 'Awareness' },
                            { label: '2', sub: 'Basic' },
                            { label: '3', sub: 'Intermediate' },
                            { label: '4', sub: 'Advanced' },
                            { label: '5', sub: 'Expert' },
                          ].map((item) => {
                            const active = item.label === '3'
                            return (
                              <button
                                key={item.label}
                                type="button"
                                className={`flex flex-col items-center justify-center rounded-lg border px-2 py-3 text-sm font-medium ${
                                  active
                                    ? 'border-[#0EA5E9] bg-white text-gray-900'
                                    : 'border-gray-200 bg-white text-gray-800'
                                }`}
                              >
                                <span>{item.label}</span>
                                <span className="mt-0.5 text-[11px] text-gray-500">{item.sub}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Topics & Fields */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Topics &amp; Fields</h4>
                        <p className="text-xs text-gray-500 mb-3">Select all topics you specialize in</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {[...DEFAULT_TOPICS, ...customTopics].map((label) => {
                            const isActive = selectedTopics.includes(label)
                            const isCustom = !DEFAULT_TOPICS.includes(label)
                            return (
                              <button
                                key={label}
                                type="button"
                                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${
                                  isActive
                                    ? isCustom
                                      ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white'
                                      : 'text-white'
                                    : 'border-gray-200 bg-white text-gray-800'
                                }`}
                                style={isActive && !isCustom ? { borderColor: SELECTED_TEAL, backgroundColor: SELECTED_TEAL } : undefined}
                                onClick={() => {
                                  setSelectedTopics((prev) =>
                                    prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label],
                                  )
                                }}
                              >
                                <span>{label}</span>
                                {isActive && <span className="text-xs">×</span>}
                              </button>
                            )
                          })}
                        </div>
                        <div className="mt-3 rounded-xl bg-gray-100 p-4">
                          <p className="text-sm font-medium text-gray-600 mb-2">Add Custom Topic (Not in list above)</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="e.g., Blockchain, UX Design..."
                              value={customTopicInput}
                              onChange={(e) => setCustomTopicInput(e.target.value)}
                              className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                            />
                            <button
                              type="button"
                              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-lg font-semibold text-white"
                              style={{ backgroundColor: SELECTED_TEAL }}
                              onClick={() => {
                                const value = customTopicInput.trim()
                                if (!value) return
                                if (!customTopics.includes(value)) setCustomTopics((prev) => [...prev, value])
                                setSelectedTopics((prev) => (prev.includes(value) ? prev : [...prev, value]))
                                setCustomTopicInput('')
                              }}
                              aria-label="Add custom topic"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="mt-5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                          style={{ backgroundColor: SELECTED_TEAL }}
                        >
                          Save Capability
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {section.id === 'experience' && isExpanded && (
                  <div className="border-t border-gray-100 px-5 py-5 bg-gray-50/30">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-gray-500">Add your past engagements</p>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                        style={{ backgroundColor: '#0F172A' }}
                        onClick={() => setShowExperienceForm(true)}
                      >
                        <span className="text-lg leading-none">+</span>
                        Add Experience
                      </button>
                    </div>

                    {showExperienceForm && (
                      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-base font-semibold text-gray-900">Experience #1</h4>
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                            onClick={() => setShowExperienceForm(false)}
                            aria-label="Close experience form"
                          >
                            ×
                          </button>
                        </div>

                        <div className="mt-4 space-y-3">
                          <input
                            type="text"
                            value={experienceTitle}
                            onChange={(e) => setExperienceTitle(e.target.value)}
                            placeholder="Engagement title"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                          />
                          <input
                            type="text"
                            value={experienceOutcome}
                            onChange={(e) => setExperienceOutcome(e.target.value)}
                            placeholder="Outcome achieved"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                          />
                          <input
                            type="text"
                            value={experienceAudience}
                            onChange={(e) => setExperienceAudience(e.target.value)}
                            placeholder="Audience type"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                          />
                          <input
                            type="text"
                            value={experienceYear}
                            onChange={(e) => setExperienceYear(e.target.value)}
                            placeholder="Year"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                          />
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      className="mt-4 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                      style={{ backgroundColor: SELECTED_TEAL }}
                    >
                      Save Experience
                    </button>
                  </div>
                )}

                {section.id === 'delivery' && isExpanded && (
                  <div className="border-t border-gray-100 px-5 py-5 bg-gray-50/30">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">Delivery Structure</label>
                        <textarea
                          value={deliveryStructure}
                          onChange={(e) => setDeliveryStructure(e.target.value)}
                          placeholder="Describe your typical session structure..."
                          rows={4}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">Tools &amp; Platforms You Use</label>
                        <input
                          type="text"
                          value={toolsPlatforms}
                          onChange={(e) => setToolsPlatforms(e.target.value)}
                          placeholder="e.g., Zoom, Miro, Google Workspace"
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm text-gray-700 select-none">
                          <input
                            type="checkbox"
                            checked={offerFollowUp}
                            onChange={(e) => setOfferFollowUp(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <span>I offer follow-up sessions</span>
                        </label>
                        <button
                          type="button"
                          className="mt-4 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                          style={{ backgroundColor: SELECTED_TEAL }}
                        >
                          Save Delivery Model
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {section.id === 'pricing' && isExpanded && (
                  <div className="border-t border-gray-100 px-5 py-5 bg-gray-50/30">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">Base Fee (₹)</label>
                        <input
                          type="number"
                          value={baseFee}
                          onChange={(e) => setBaseFee(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">Price Flexibility</label>
                        <select
                          value={priceFlexibility}
                          onChange={(e) => setPriceFlexibility(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                        >
                          <option>Fixed - No negotiation</option>
                          <option>Moderate - Some flexibility</option>
                          <option>Flexible - Open to discussion</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                        style={{ backgroundColor: SELECTED_TEAL }}
                      >
                        Save Pricing
                      </button>
                    </div>
                  </div>
                )}

                {section.id === 'availability' && isExpanded && (
                  <div className="border-t border-gray-100 px-5 py-5 bg-gray-50/30">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">Weekly Availability</label>
                        <input
                          type="text"
                          value={weeklyAvailability}
                          onChange={(e) => setWeeklyAvailability(e.target.value)}
                          placeholder="e.g., 2-3 days per week"
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">Travel Willingness</label>
                        <select
                          value={travelWillingness}
                          onChange={(e) => setTravelWillingness(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A97DA]/20 focus:border-[#1A97DA]"
                        >
                          <option>Select travel willingness</option>
                          <option>No travel - Online only</option>
                          <option>Local city only</option>
                          <option>National travel</option>
                          <option>International travel</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                        style={{ backgroundColor: SELECTED_TEAL }}
                      >
                        Save Availability
                      </button>
                    </div>
                  </div>
                )}

                {section.id !== 'identity' &&
                  section.id !== 'capability' &&
                  section.id !== 'experience' &&
                  section.id !== 'delivery' &&
                  section.id !== 'pricing' &&
                  section.id !== 'availability' &&
                  isExpanded && (
                    <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/30">
                      <p className="text-sm text-gray-500">Section content coming soon.</p>
                    </div>
                  )}
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
