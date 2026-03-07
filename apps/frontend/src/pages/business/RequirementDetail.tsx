import { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DashboardLayout } from '../../layouts/DashboardLayout'
import { businessSidebarItems, businessSidebarBottomItems } from '../../config/businessNav'
import { getRequirement, type RequirementResponse } from '../../api/requirements'
import { listProposalsByRequirement, type ProposalResponse } from '../../api/proposals'

const TEAL = '#008C9E'
const TEAL_LIGHT = '#2293B4'

const OUTCOME_TITLES: Record<string, string> = {
  'skill-development': 'Skill Development',
  'revenue-generation': 'Revenue Generation',
  'hiring-talent': 'Hiring & Talent',
  'brand-positioning': 'Brand Positioning',
  'leadership-alignment': 'Leadership Alignment',
  'innovation-problem-solving': 'Innovation & Problem Solving',
  'compliance-risk': 'Compliance & Risk',
  'community-networking': 'Community & Networking',
  'product-adoption': 'Product Adoption',
  'behavior-change': 'Behavior Change',
}

function getTitleFromFormData(formData: Record<string, unknown>): string {
  const outcome = formData?.selectedOutcome as string | undefined
  if (outcome && OUTCOME_TITLES[outcome]) return OUTCOME_TITLES[outcome]
  const audience = formData?.audienceSelected as string[] | undefined
  if (Array.isArray(audience) && audience.length > 0) return `${audience.slice(0, 2).join(', ')} engagement`
  return 'Expert requirement'
}

function formatCreated(createdAt: string): string {
  const date = new Date(createdAt)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000))
  if (days === 0) return 'Created today'
  if (days === 1) return 'Created 1 day ago'
  if (days < 7) return `Created ${days} days ago`
  return `Created ${date.toLocaleDateString()}`
}

function toTitleCase(s: string): string {
  return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatSubmitted(createdAt: string): string {
  const date = new Date(createdAt)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const mins = Math.floor(diffMs / 60000)
  const hours = Math.floor(diffMs / (60 * 60 * 1000))
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000))
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  if (days === 1) return '1 day ago'
  if (days < 7) return `${days} days ago`
  return date.toLocaleDateString()
}

function formatProposalPrice(proposedFee?: string): string {
  if (proposedFee == null || proposedFee === '') return '—'
  const n = Number(proposedFee)
  if (Number.isNaN(n)) return proposedFee
  return `₹${n.toLocaleString('en-IN')}`
}

type TabId = 'proposals' | 'details' | 'activity'

export function RequirementDetail() {
  const { requirementId } = useParams<{ requirementId: string }>()
  const [requirement, setRequirement] = useState<RequirementResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('details')
  const [proposals, setProposals] = useState<ProposalResponse[]>([])
  const [proposalsLoading, setProposalsLoading] = useState(false)
  const [proposalsError, setProposalsError] = useState<string | null>(null)
  const [expandedProposalId, setExpandedProposalId] = useState<string | null>(null)

  useEffect(() => {
    if (!requirementId) return
    let cancelled = false
    setLoading(true)
    setError(null)
    getRequirement(requirementId)
      .then((res) => {
        if (!cancelled && res.success && res.requirement) setRequirement(res.requirement)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load requirement')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [requirementId])

  const fetchProposals = useCallback(() => {
    const rid = requirementId?.trim()
    if (!rid) return
    setProposalsLoading(true)
    setProposalsError(null)
    listProposalsByRequirement(rid, { status: 'submitted' })
      .then((res) => {
        if (res.success && res.proposals) setProposals(res.proposals)
      })
      .catch((err) => {
        setProposalsError(err instanceof Error ? err.message : 'Failed to load proposals')
      })
      .finally(() => setProposalsLoading(false))
  }, [requirementId])

  useEffect(() => {
    const rid = requirementId?.trim()
    if (!rid) return
    let cancelled = false
    setProposalsLoading(true)
    setProposalsError(null)
    listProposalsByRequirement(rid, { status: 'submitted' })
      .then((res) => {
        if (!cancelled && res.success && res.proposals) setProposals(res.proposals)
      })
      .catch((err) => {
        if (!cancelled) setProposalsError(err instanceof Error ? err.message : 'Failed to load proposals')
      })
      .finally(() => {
        if (!cancelled) setProposalsLoading(false)
      })
    return () => { cancelled = true }
  }, [requirementId])

  useEffect(() => {
    if (activeTab === 'proposals' && requirementId?.trim()) fetchProposals()
  }, [activeTab, requirementId, fetchProposals])

  if (loading) {
    return (
      <DashboardLayout
        sidebarItems={businessSidebarItems}
        sidebarBottomItems={businessSidebarBottomItems}
        userTypeLabel="Business"
        userDisplayName="Acme Corp"
        userSubLabel="Business Account"
        sidebarClassName="bg-gray-50"
      >
        <div className="flex items-center justify-center py-24">
          <svg className="animate-spin h-10 w-10 text-[#008C9E]" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !requirement) {
    return (
      <DashboardLayout
        sidebarItems={businessSidebarItems}
        sidebarBottomItems={businessSidebarBottomItems}
        userTypeLabel="Business"
        userDisplayName="Acme Corp"
        userSubLabel="Business Account"
        sidebarClassName="bg-gray-50"
      >
        <div className="max-w-3xl mx-auto py-12 px-6">
          <p className="text-red-600">{error || 'Requirement not found.'}</p>
          <Link to="/business/requirement" className="inline-block mt-4 text-[#008C9E] font-medium hover:underline">
            Back to requirements
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const fd = (requirement.formData || {}) as Record<string, unknown>
  const title = getTitleFromFormData(fd)
  const created = formatCreated(requirement.createdAt)
  const status = requirement.status === 'draft' ? 'Draft' : 'Active'

  const primaryFocus = (fd.selectedOutcome as string) && OUTCOME_TITLES[fd.selectedOutcome as string]
    ? OUTCOME_TITLES[fd.selectedOutcome as string]
    : '—'
  const successMetricsStr = (fd.successMetrics as string) || ''
  const problemStatement =
    (fd.problemStatement as string) ||
    (fd.problemType as string) ||
    (fd.skillType as string
      ? `Skill type: ${fd.skillType}${(fd.skillDomain as string) ? `, Domain: ${fd.skillDomain}` : ''}`
      : '') ||
    (successMetricsStr ? successMetricsStr.slice(0, 300) + (successMetricsStr.length > 300 ? '…' : '') : '') ||
    '—'
  const desiredTransformation =
    (fd.desiredTransformation as string) ||
    (fd.targetBehavior as string) ||
    (fd.skillDomain as string) ||
    successMetricsStr ||
    '—'
  const measurableOutcomesList = (fd.measurableOutcomes as string[] | undefined)
  const measurableOutcomes =
    measurableOutcomesList && measurableOutcomesList.length > 0
      ? measurableOutcomesList
      : successMetricsStr
        ? successMetricsStr.split(/\n/).map((s) => s.trim()).filter(Boolean)
        : []

  const roles = ((fd.audienceSelected as string[]) || []).join(', ') || '—'
  const seniority = ((fd.senioritySelected as string[]) || []).join(', ') || '—'
  const size = (fd.audienceSize as string) || '—'
  const industry = ((fd.industrySelected as string[]) || []).join(', ') || '—'

  const engagementType = (fd.engagementTypeSelected as string) || ''
  const typeLabel = engagementType ? toTitleCase(engagementType) : '—'
  const totalMins = (fd.totalDurationMinutes as string) || ''
  const totalSessions = (fd.totalSessions as string) || '1'
  const durationLabel = totalMins
    ? (parseInt(totalMins, 10) >= 480 ? 'Full day (8 hours)' : parseInt(totalMins, 10) >= 60 ? `${Math.round(parseInt(totalMins, 10) / 60)} hours` : `${totalMins} min`)
    : '—'
  const startDate = (fd.preferredStartDate as string) || ''
  const endDate = (fd.preferredEndDate as string) || ''
  const formatDate = (s: string) => {
    if (!s || !s.match(/^\d{4}-\d{2}-\d{2}/)) return ''
    const [y, m, d] = s.slice(0, 10).split('-')
    return `${d}/${m}/${y}`
  }
  const timeline = startDate || endDate ? [formatDate(startDate), formatDate(endDate)].filter(Boolean).join(' – ') || '—' : '—'
  const mode = (fd.deliveryModeSelected as string) ? toTitleCase(fd.deliveryModeSelected as string) : '—'
  const city = (fd.city as string) || ''
  const stateRegion = (fd.stateRegion as string) || (fd.state as string) || ''
  const country = (fd.country as string) || ''
  const location = [city, stateRegion, country].filter(Boolean).join(', ') || '—'

  const minB = typeof fd.minBudget === 'number' ? fd.minBudget : 0
  const maxB = typeof fd.maxBudget === 'number' ? fd.maxBudget : 0
  const budgetLabel = minB > 0 || maxB > 0 ? `₹${Number(minB).toLocaleString('en-IN')} - ₹${Number(maxB).toLocaleString('en-IN')}` : '—'
  const paymentTermsRaw = (fd.paymentTermSelected as string) || ''
  const paymentTerms = paymentTermsRaw ? String(paymentTermsRaw).replace(/-/g, ' ') : '—'
  const flexibility = (fd.budgetFlexibility as string) ? toTitleCase(String(fd.budgetFlexibility)) : '—'

  const cardClass = 'bg-white rounded-xl shadow-sm border border-gray-100 p-6'
  const sectionIconClass = 'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white'
  const sectionIconStyle = { backgroundColor: TEAL_LIGHT }

  const proposalCount = proposals.length

  return (
    <DashboardLayout
      sidebarItems={businessSidebarItems}
      sidebarBottomItems={businessSidebarBottomItems}
      userTypeLabel="Business"
      userDisplayName="Acme Corp"
      userSubLabel="Business Account"
      sidebarClassName="bg-gray-50"
      mainClassName="bg-[#F0F2F5]"
    >
      <div className="w-full max-w-6xl mx-auto px-6 py-6">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600 mb-2">
          <Link to="/business/requirement" className="hover:text-gray-900 no-underline">Requirements</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{title}</span>
        </nav>

        {/* Title row: title, badge, Edit, Share */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <span
              className="inline-flex rounded-md px-2.5 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: TEAL }}
            >
              {status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Share
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-6">{created}</p>

        {/* Key metrics - label & value left, icon vertically centered on right */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className={`${cardClass} flex items-center justify-between gap-4`}>
            <div>
              <p className="text-sm text-gray-500">Expert Matches</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <span className="flex shrink-0 items-center justify-center text-[#2293B4]" aria-hidden>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Four-point star: top, right, bottom, left */}
                <path d="M12 4 L14 10 L20 12 L14 14 L12 20 L10 14 L4 12 L10 10 Z" />
                {/* Two small sparks: top-right and bottom-left */}
                <circle cx="17" cy="7" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="7" cy="17" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </span>
          </div>
          <div className={`${cardClass} flex items-center justify-between gap-4`}>
            <div>
              <p className="text-sm text-gray-500">Proposals Received</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{proposalCount}</p>
            </div>
            <span className="flex shrink-0 items-center justify-center text-[#2293B4]" aria-hidden>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Document with folded top-right corner */}
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                {/* Two horizontal lines (text lines) */}
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="8" y1="16" x2="16" y2="16" />
              </svg>
            </span>
          </div>
          <div className={`${cardClass} flex items-center justify-between gap-4`}>
            <div>
              <p className="text-sm text-gray-500">Profile Views</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <span className="flex shrink-0 items-center justify-center text-[#2293B4]" aria-hidden>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Upward trending line from bottom-left to top-right */}
                <path d="M4 18 L9 13 L13 10 L17 7 L20 5" />
                {/* Arrowhead pointing up-right at end */}
                <polyline points="17 8 20 5 18 9" />
              </svg>
            </span>
          </div>
        </div>

        {/* Two columns: tab bar + content (left), AI Insights sidebar (right) aligned from top */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left column: tab bar only spans this column, then content */}
          <div className="flex-1 min-w-0 w-full">
            {/* Tab bar - light gray bg, pronounced rounded corners; three tabs spread uniformly */}
            <div className="bg-[#E9EDF5] rounded-full px-2 py-2.5">
              <div className="flex items-stretch gap-0.5">
                {[
                  { id: 'proposals' as TabId, label: `Proposals (${proposalCount})` },
                  { id: 'details' as TabId, label: 'Details' },
                  { id: 'activity' as TabId, label: 'Activity' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 min-w-0 py-2.5 text-sm font-medium transition-colors text-center ${
                      activeTab === id
                        ? 'bg-white text-[#2C3E50] rounded-full shadow-sm'
                        : 'text-[#2C3E50] hover:text-gray-900 bg-transparent'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-6 mt-8">
            {activeTab === 'proposals' && (
              <div className="space-y-4">
                {proposalsLoading && (
                  <p className="text-sm text-gray-500">Loading proposals…</p>
                )}
                {proposalsError && (
                  <p className="text-sm text-red-600" role="alert">{proposalsError}</p>
                )}
                {!proposalsLoading && !proposalsError && proposals.length === 0 && (
                  <p className="text-sm text-gray-500">No proposals yet. When experts submit proposals for this requirement, they will appear here.</p>
                )}
                {!proposalsLoading && proposals.map((p) => {
                  const fd = p.formData || {}
                  const summary = (fd.understanding as string) || (typeof fd.outcomePlan === 'string' ? fd.outcomePlan.slice(0, 300) + (fd.outcomePlan.length > 300 ? '…' : '') : '') || '—'
                  const strengths: string[] = Array.isArray(fd.measurableOutcomes) ? fd.measurableOutcomes : (typeof fd.similarEngagements === 'string' && fd.similarEngagements.trim() ? fd.similarEngagements.split(/\n/).map((s) => s.trim()).filter(Boolean).slice(0, 5) : [])
                  const name = p.expert?.name || 'Expert'
                  const initials = p.expert?.initials || 'EX'
                  const price = formatProposalPrice(fd.proposedFee as string)
                  const isExpanded = expandedProposalId === p.id
                  const sessionStructure = (fd.sessionStructure as { segmentTitle?: string; duration?: string; type?: string }[]) || []
                  const deliverablesSelected = (fd.deliverablesSelected as string[]) || []
                  return (
                    <div key={p.id} className={cardClass}>
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className="flex gap-3">
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white bg-gray-800">
                            {initials}
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-bold text-gray-900">{name}</h3>
                            </div>
                            <p className="text-sm text-gray-500 mt-0.5">Expert</p>
                            <p className="text-sm text-gray-600 mt-1">
                              <span className="text-gray-500">Submitted {formatSubmitted(p.createdAt)}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">{summary}</p>
                      {strengths.length > 0 && (
                        <div className="flex flex-wrap gap-6 mb-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-900 mb-1 flex items-center gap-1.5">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E0F7FA] text-[#008C9E]">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                              </span>
                              Key points
                            </p>
                            <ul className="text-sm text-gray-600 list-disc list-inside space-y-0.5">
                              {strengths.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-900">Price:</span> {price}
                        </p>
                        <div className="flex gap-2">
                          <Link
                            to={`/business/messages?expertId=${encodeURIComponent(p.expert?.id ?? '')}&requirementId=${encodeURIComponent(requirementId ?? '')}&proposalId=${encodeURIComponent(p.id)}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 no-underline"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            Message
                          </Link>
                          <button
                            type="button"
                            onClick={() => setExpandedProposalId(isExpanded ? null : p.id)}
                            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                            style={{ backgroundColor: TEAL }}
                          >
                            {isExpanded ? 'Hide full proposal' : 'View Full Proposal'}
                          </button>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Understanding of requirement</h4>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{(fd.understanding as string) || '—'}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Outcome plan</h4>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{(fd.outcomePlan as string) || '—'}</p>
                          </div>
                          {Array.isArray(fd.measurableOutcomes) && fd.measurableOutcomes.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Measurable outcomes</h4>
                              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                {fd.measurableOutcomes.map((o: string, i: number) => (
                                  <li key={i}>{o}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {sessionStructure.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Session structure</h4>
                              <div className="space-y-2">
                                {sessionStructure.map((seg, i) => (
                                  <div key={i} className="flex flex-wrap gap-2 text-sm text-gray-700">
                                    <span className="font-medium">{seg.segmentTitle || 'Segment'}</span>
                                    <span>·</span>
                                    <span>{seg.duration || '—'}</span>
                                    <span>·</span>
                                    <span>{seg.type || '—'}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {deliverablesSelected.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-1">Deliverables selected</h4>
                              <p className="text-sm text-gray-700">{deliverablesSelected.map((d) => toTitleCase(d.replace(/-/g, ' '))).join(', ')}</p>
                            </div>
                          )}
                          {((fd.similarEngagements as string) || '').trim() && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-1">Similar engagements</h4>
                              <p className="text-sm text-gray-700 whitespace-pre-wrap">{fd.similarEngagements as string}</p>
                            </div>
                          )}
                          {((fd.industryMatch as string) || '').trim() && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-1">Industry match</h4>
                              <p className="text-sm text-gray-700 whitespace-pre-wrap">{fd.industryMatch as string}</p>
                            </div>
                          )}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Pricing</h4>
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Proposed fee:</span> {formatProposalPrice(fd.proposedFee as string)}
                              {((fd.feeBreakdown as string) || '').trim() && (
                                <>
                                  <br />
                                  <span className="font-medium">Breakdown:</span> {fd.feeBreakdown as string}
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {activeTab === 'details' && (
              <>
                {/* Objective */}
                <div className={cardClass}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={sectionIconClass} style={sectionIconStyle}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                    </span>
                    <h2 className="text-lg font-bold text-gray-900">Objective</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Primary Focus</p>
                  <p className="text-gray-900 font-medium mb-4">{primaryFocus}</p>
                  <p className="text-sm text-gray-500 mb-1">Problem Statement</p>
                  <p className="text-gray-900 mb-4">{problemStatement}</p>
                  <p className="text-sm text-gray-500 mb-1">Desired Transformation</p>
                  <p className="text-gray-900 mb-4">{desiredTransformation}</p>
                  <p className="text-sm text-gray-500 mb-2">Measurable Outcomes</p>
                  {measurableOutcomes.length > 0 ? (
                    <ul className="space-y-2">
                      {measurableOutcomes.map((outcome, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-900">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#008C9E] bg-white text-[#008C9E]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                          </span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">—</p>
                  )}
                </div>

                {/* Audience */}
                <div className={cardClass}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={sectionIconClass} style={sectionIconStyle}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </span>
                    <h2 className="text-lg font-bold text-gray-900">Audience</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Roles:</p>
                      <p className="font-medium text-gray-900">{roles}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Seniority:</p>
                      <p className="font-medium text-gray-900">{seniority}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Size:</p>
                      <p className="font-medium text-gray-900">{size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Industry:</p>
                      <p className="font-medium text-gray-900">{industry}</p>
                    </div>
                  </div>
                </div>

                {/* Logistics */}
                <div className={cardClass}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={sectionIconClass} style={sectionIconStyle}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                    </span>
                    <h2 className="text-lg font-bold text-gray-900">Logistics</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Type:</p>
                      <p className="font-medium text-gray-900">{typeLabel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mode:</p>
                      <p className="font-medium text-gray-900">{mode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration:</p>
                      <p className="font-medium text-gray-900">{durationLabel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sessions:</p>
                      <p className="font-medium text-gray-900">{totalSessions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Timeline:</p>
                      <p className="font-medium text-gray-900">{timeline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location:</p>
                      <p className="font-medium text-gray-900">{location}</p>
                    </div>
                  </div>
                </div>

                {/* Commercial */}
                <div className={cardClass}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={sectionIconClass} style={sectionIconStyle}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </span>
                    <h2 className="text-lg font-bold text-gray-900">Commercial</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Budget:</p>
                      <p className="font-medium text-gray-900">{budgetLabel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Flexibility:</p>
                      <p className="font-medium text-gray-900">{flexibility}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm text-gray-500">Payment Terms:</p>
                      <p className="font-medium text-gray-900">{paymentTerms}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'activity' && (
              <div className={cardClass}>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Activity</h2>
                <p className="text-sm text-gray-500">No recent activity.</p>
              </div>
            )}
            </div>
          </div>

          {/* Right column: AI Insights, Quick Actions, Tip - aligns with tab bar top */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <div className={cardClass}>
              <div className="flex items-center gap-2 mb-3">
                <span className={sectionIconClass} style={sectionIconStyle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                  </svg>
                </span>
                <h2 className="text-base font-bold text-gray-900">AI Insights</h2>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-2">Recommended Action</p>
                <p className="text-sm text-gray-900 mb-4">
                  Sarah Johnson&apos;s proposal shows the strongest fit. Her AI specialization and sales training experience align perfectly with your needs.
                </p>
                <button
                  type="button"
                  className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                  style={{ backgroundColor: TEAL }}
                >
                  Review Top Match
                </button>
              </div>
            </div>

            <div className={cardClass}>
              <h2 className="text-base font-bold text-gray-900 mb-3">Quick Actions</h2>
              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 text-left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Message All Experts
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 text-left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Request More Proposals
                </button>
              </div>
            </div>

            <div className="rounded-xl p-4 border border-[#B2EBF2] bg-[#E0F7FA]">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#008C9E] text-white text-xs font-bold">i</span>
                <h2 className="text-base font-bold text-gray-900">Tip</h2>
              </div>
              <p className="text-sm text-gray-800">
                Experts with match scores above 90% have historically delivered 2x better outcomes. Consider prioritizing your review accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
