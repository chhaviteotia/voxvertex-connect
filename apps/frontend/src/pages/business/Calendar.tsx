import { useEffect, useRef, useState } from 'react'
import { DashboardLayout } from '../../layouts/DashboardLayout'
import { businessSidebarBottomItems, businessSidebarItems } from '../../config/businessNav'
import { IconCalendar, IconClock, IconMapPin, IconVideo } from '../../components/layout/DashboardIcons'

function IconGoogleCalendarButton() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="7" y1="7" x2="7.01" y2="7" />
      <line x1="7" y1="12" x2="7.01" y2="12" />
      <line x1="7" y1="17" x2="7.01" y2="17" />
      <line x1="11" y1="7" x2="18" y2="7" />
      <line x1="11" y1="12" x2="18" y2="12" />
      <line x1="11" y1="17" x2="18" y2="17" />
    </svg>
  )
}

function IconAppleCalendarButton() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="7.5" />
    </svg>
  )
}

function IconOutlookCalendarButton() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <line x1="8" y1="3.5" x2="8" y2="6.5" />
      <line x1="16" y1="3.5" x2="16" y2="6.5" />
    </svg>
  )
}

function IconDownloadButton() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4v10" />
      <polyline points="8,11 12,15 16,11" />
      <rect x="4" y="18" width="16" height="2.5" rx="1" />
    </svg>
  )
}

function IconLinkSmall() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 1 0-7.07-7.07L11 4.93" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 1 0 7.07 7.07L13 19.07" />
    </svg>
  )
}

function IconChevronDownSmall() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const scheduledDateKeys = new Set(['2026-03-08', '2026-03-15', '2026-03-20'])
const TIME_HOURS = ['10', '11', '12', '01', '02', '03', '04']
const TIME_MINUTES = ['51', '52', '53', '54', '55', '56', '57']
const TIME_MERIDIEM = ['PM', 'AM']

type CalendarCell = {
  key: string
  day: number
  isCurrentMonth: boolean
  dateKey: string
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${pad2(month)}-${pad2(day)}`
}

function parseDateKey(dateKey: string): Date {
  const [y, m, d] = dateKey.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function getCalendarCells(year: number, month: number): CalendarCell[] {
  const firstDay = new Date(year, month, 1)
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()
  const leadingDays = firstDay.getDay()
  const cells: CalendarCell[] = []

  for (let i = 0; i < leadingDays; i += 1) {
    const day = daysInPrevMonth - leadingDays + i + 1
    const prevMonthDate = new Date(year, month - 1, day)
    const y = prevMonthDate.getFullYear()
    const m = prevMonthDate.getMonth() + 1
    const dateKey = toDateKey(y, m, day)
    cells.push({ key: `prev-${dateKey}`, day, isCurrentMonth: false, dateKey })
  }

  for (let day = 1; day <= daysInCurrentMonth; day += 1) {
    const dateKey = toDateKey(year, month + 1, day)
    cells.push({ key: `current-${dateKey}`, day, isCurrentMonth: true, dateKey })
  }

  const trailingDays = 42 - cells.length
  for (let day = 1; day <= trailingDays; day += 1) {
    const nextMonthDate = new Date(year, month + 1, day)
    const y = nextMonthDate.getFullYear()
    const m = nextMonthDate.getMonth() + 1
    const dateKey = toDateKey(y, m, day)
    cells.push({ key: `next-${dateKey}`, day, isCurrentMonth: false, dateKey })
  }

  return cells
}

export function BusinessCalendar() {
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const todayKey = toDateKey(todayStart.getFullYear(), todayStart.getMonth() + 1, todayStart.getDate())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(todayKey)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [scheduleDateLabel, setScheduleDateLabel] = useState('')
  const [locationType, setLocationType] = useState<'online' | 'physical'>('online')
  const [openTimePicker, setOpenTimePicker] = useState<'start' | 'end' | null>(null)
  const [startTime, setStartTime] = useState({ hour: '10', minute: '51', meridiem: 'PM' })
  const [endTime, setEndTime] = useState({ hour: '10', minute: '51', meridiem: 'PM' })
  const [isRequirementOpen, setIsRequirementOpen] = useState(false)
  const [selectedRequirement, setSelectedRequirement] = useState('Choose a requirement')
  const startTimeRef = useRef<HTMLDivElement | null>(null)
  const endTimeRef = useRef<HTMLDivElement | null>(null)
  const requirementRef = useRef<HTMLDivElement | null>(null)

  const monthLabel = `${MONTH_NAMES[viewMonth]} ${viewYear}`
  const calendarCells = getCalendarCells(viewYear, viewMonth)

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((prev) => prev - 1)
      return
    }
    setViewMonth((prev) => prev - 1)
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((prev) => prev + 1)
      return
    }
    setViewMonth((prev) => prev + 1)
  }

  const handleGoToToday = () => {
    const now = new Date()
    setViewYear(now.getFullYear())
    setViewMonth(now.getMonth())
    setSelectedDateKey(toDateKey(now.getFullYear(), now.getMonth() + 1, now.getDate()))
  }

  const syncButtons = [
    { label: 'Connect Google Calendar', icon: <IconGoogleCalendarButton /> },
    { label: 'Connect Apple Calendar', icon: <IconAppleCalendarButton /> },
    { label: 'Connect Outlook', icon: <IconOutlookCalendarButton /> },
    { label: 'Download .ICS File', icon: <IconDownloadButton /> },
  ]

  useEffect(() => {
    if (!isScheduleModalOpen) return

    const handleDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as Node

      if (openTimePicker === 'start' && startTimeRef.current && !startTimeRef.current.contains(target)) {
        setOpenTimePicker(null)
      }
      if (openTimePicker === 'end' && endTimeRef.current && !endTimeRef.current.contains(target)) {
        setOpenTimePicker(null)
      }
      if (isRequirementOpen && requirementRef.current && !requirementRef.current.contains(target)) {
        setIsRequirementOpen(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentMouseDown)
    return () => document.removeEventListener('mousedown', handleDocumentMouseDown)
  }, [isScheduleModalOpen, isRequirementOpen, openTimePicker])

  return (
    <DashboardLayout
      sidebarItems={businessSidebarItems}
      sidebarBottomItems={businessSidebarBottomItems}
      userTypeLabel="Business"
      userDisplayName="John Doe"
      userSubLabel="Acme Corp"
      mainClassName="bg-[#F0F2F5]"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold leading-tight text-[#0B1B3D]">Calendar &amp; Sessions</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage your scheduled expert sessions</p>
        </div>

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#0B1B3D]">Sync with External Calendars</h2>
              <p className="mt-0.5 text-sm text-gray-500">Connect your calendar to automatically sync sessions</p>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F6FA] text-[#0EA5C4]">
              <IconCalendar />
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {syncButtons.map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="text-gray-600">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-2xl font-semibold text-[#0B1B3D]">Calendar View</h3>
            <p className="mt-0.5 text-sm text-gray-500">View all your scheduled sessions at a glance</p>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-[#0B1B3D]">{monthLabel}</p>
                <button
                  type="button"
                  onClick={handleGoToToday}
                  className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700"
                >
                  Today
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600"
                  aria-label="Previous month"
                >
                  {'<'}
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600"
                  aria-label="Next month"
                >
                  {'>'}
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-7 text-center text-xs font-medium text-gray-500">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="py-1.5">{day}</div>
              ))}
            </div>

            <div className="mt-1 grid grid-cols-7 gap-y-2">
              {calendarCells.map((cell) => {
                const isCurrent = cell.isCurrentMonth
                const isScheduled = isCurrent && scheduledDateKeys.has(cell.dateKey)
                const isSelected = isCurrent && selectedDateKey === cell.dateKey
                const cellDate = parseDateKey(cell.dateKey)
                const isPastDate = isCurrent && cellDate < todayStart
                return (
                  <div key={cell.key} className="flex items-center justify-center py-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (!isCurrent || isPastDate) return
                        setSelectedDateKey(cell.dateKey)
                        if (cellDate > todayStart) {
                          setScheduleDateLabel(
                            cellDate.toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          )
                          setIsRequirementOpen(false)
                          setOpenTimePicker(null)
                          setIsScheduleModalOpen(true)
                        }
                      }}
                      disabled={!isCurrent || isPastDate}
                      className={`flex h-16 w-16 flex-col items-center justify-center rounded-xl border text-lg font-medium ${
                        !isCurrent
                          ? 'border-transparent text-gray-300'
                          : isPastDate
                            ? 'border-transparent text-gray-300 cursor-not-allowed'
                          : isSelected
                            ? 'border-[#19A3BE] text-[#0B1B3D]'
                            : isScheduled
                              ? 'border-[#93C5FD] bg-[#EEF5FF] text-[#245EA8]'
                              : 'border-transparent text-[#0B1B3D]'
                      }`}
                    >
                      <span>{cell.day}</span>
                      {isScheduled && <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <div className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#DCFCE7]" />
                <span>Available</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded border border-[#93C5FD]" />
                <span>Scheduled</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#0EA5C4]" />
                <span>Selected</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-2xl font-semibold text-[#0B1B3D]">Session Overview</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#D7DEE8] bg-[#F5FAFE] p-4">
                <p className="text-3xl font-bold text-[#0EA5C4]">3</p>
                <p className="mt-1 text-sm text-gray-500">Upcoming Sessions</p>
              </div>
              <div className="rounded-xl border border-[#D7EBD9] bg-[#F3FBF6] p-4">
                <p className="text-3xl font-bold text-[#1E8D51]">1</p>
                <p className="mt-1 text-sm text-gray-500">Confirmed</p>
              </div>
              <div className="rounded-xl border border-[#EEE2CF] bg-[#FFF8EE] p-4">
                <p className="text-3xl font-bold text-[#C87400]">1</p>
                <p className="mt-1 text-sm text-gray-500">Pending</p>
              </div>
              <div className="rounded-xl border border-[#D7DEE8] bg-[#FAFBFD] p-4">
                <p className="text-3xl font-bold text-[#4B5563]">1</p>
                <p className="mt-1 text-sm text-gray-500">Completed</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#BFE8EF] bg-[#F3FCFF] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1590A8]">Next Session</p>
              <p className="mt-2 text-xl font-semibold text-[#0B1B3D]">Leadership Training for Managers</p>
              <p className="mt-1 text-sm text-gray-500">with Dr. Sarah Johnson</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1.5"><IconCalendar className="h-4 w-4" /> Mar 15, 2026</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5"><IconClock className="h-4 w-4" /> 10:00 AM - 2:00 PM</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-2xl font-semibold text-[#0B1B3D]">Scheduled Sessions</h3>

          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-500">Upcoming &amp; Pending (3)</p>
            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-xl font-semibold text-[#0B1B3D]">Leadership Training for Managers</h4>
                  <span className="rounded-md bg-[#E8F8EE] px-2 py-0.5 text-xs font-semibold text-[#1E8D51]">confirmed</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Dr. Sarah Johnson • Workshop (Single Day)</p>
                <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-3">
                  <span className="inline-flex items-center gap-1.5"><IconCalendar className="h-4 w-4" /> Mar 15, 2026</span>
                  <span className="inline-flex items-center gap-1.5"><IconClock className="h-4 w-4" /> 10:00 AM - 2:00 PM</span>
                  <span className="inline-flex items-center gap-1.5"><IconVideo className="h-4 w-4" /> Online - Zoom</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="rounded-lg bg-[#0EA5C4] px-4 py-2 text-sm font-semibold text-white">Join Meeting</button>
                  <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">View Details</button>
                  <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">Add to Calendar</button>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-xl font-semibold text-[#0B1B3D]">Product Strategy Review</h4>
                  <span className="rounded-md bg-[#FFF4D7] px-2 py-0.5 text-xs font-semibold text-[#A56A00]">pending</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Rajesh Kumar • Advisory Session</p>
                <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-3">
                  <span className="inline-flex items-center gap-1.5"><IconCalendar className="h-4 w-4" /> Mar 20, 2026</span>
                  <span className="inline-flex items-center gap-1.5"><IconClock className="h-4 w-4" /> 2:00 PM - 4:00 PM</span>
                  <span className="inline-flex items-center gap-1.5"><IconMapPin className="h-4 w-4" /> Bangalore, India</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="rounded-lg bg-[#0EA5C4] px-4 py-2 text-sm font-semibold text-white">Confirm Details</button>
                  <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">Message Expert</button>
                  <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">Request Changes</button>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-xl font-semibold text-[#0B1B3D]">Executive Coaching Program</h4>
                  <span className="rounded-md bg-[#E8F0FF] px-2 py-0.5 text-xs font-semibold text-[#2C60C6]">Awaiting Response</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Priya Sharma • Coaching (1-on-1)</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="rounded-lg bg-[#0EA5C4] px-4 py-2 text-sm font-semibold text-white">Review Proposal</button>
                  <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">View Expert Profile</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-500">Past Sessions (1)</p>
            <div className="mt-3 rounded-xl border border-gray-200 bg-[#FAFBFD] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xl font-semibold text-[#0B1B3D]">Innovation Workshop</h4>
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">Completed</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">with Michael Chen</p>
                  <p className="mt-1 text-xs text-gray-400">Keynote Session • Mar 8, 2026</p>
                </div>
                <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">View Feedback</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[580px] rounded-xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 px-5 pt-5 pb-3">
              <div>
                <h4 className="text-2xl font-semibold text-[#111827]">Schedule Session</h4>
                <p className="mt-1 text-sm text-gray-500">Schedule a session for {scheduleDateLabel}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsScheduleModalOpen(false)
                  setIsRequirementOpen(false)
                  setOpenTimePicker(null)
                }}
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 px-5 py-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Select Requirement *</label>
                <div ref={requirementRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsRequirementOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-[#F8FAFC] px-3 py-2.5 text-left text-sm font-medium text-[#64748B]"
                  >
                    <span>{selectedRequirement}</span>
                    <span className="text-gray-400">
                      <IconChevronDownSmall />
                    </span>
                  </button>
                  {isRequirementOpen && (
                    <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full rounded-lg border border-gray-200 bg-white p-1 shadow-md">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRequirement('AI Training for Sales Team')
                          setIsRequirementOpen(false)
                        }}
                        className={`w-full rounded-md px-2 py-1.5 text-left text-base ${
                          selectedRequirement === 'AI Training for Sales Team'
                            ? 'bg-[#0EA5C4] text-white'
                            : 'text-[#1F2937] hover:bg-gray-50'
                        }`}
                      >
                        AI Training for Sales Team
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRequirement('Product Strategy Review')
                          setIsRequirementOpen(false)
                        }}
                        className={`mt-0.5 w-full rounded-md px-2 py-1.5 text-left text-base ${
                          selectedRequirement === 'Product Strategy Review'
                            ? 'bg-[#0EA5C4] text-white'
                            : 'text-[#1F2937] hover:bg-gray-50'
                        }`}
                      >
                        Product Strategy Review
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Session Title *</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400"
                  placeholder="e.g., AI Training Workshop - Day 1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Start Time *</label>
                  <div ref={startTimeRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenTimePicker((prev) => (prev === 'start' ? null : 'start'))}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-[#F8FAFC] px-3 py-2.5 text-sm text-gray-700"
                    >
                      <span className="inline-flex items-center gap-2 text-gray-500">
                        <IconClock className="h-4 w-4 text-gray-400" />
                        {`${startTime.hour}:${startTime.minute} ${startTime.meridiem}`}
                      </span>
                      <IconClock className="h-4 w-4 text-gray-700" />
                    </button>
                    {openTimePicker === 'start' && (
                      <div className="absolute left-0 top-[calc(100%+6px)] z-20 w-[152px] border border-gray-300 bg-white shadow-lg">
                        <div className="grid grid-cols-3 gap-1 border-b border-gray-200 px-1 py-1">
                          <div className="rounded bg-[#0B84F3] py-1 text-center text-xl font-semibold text-white">{startTime.hour}</div>
                          <div className="rounded bg-[#0B84F3] py-1 text-center text-xl font-semibold text-white">{startTime.minute}</div>
                          <div className="rounded bg-[#0B84F3] py-1 text-center text-lg font-semibold text-white">{startTime.meridiem}</div>
                        </div>
                        <div className="grid grid-cols-3 px-1 py-1">
                          <div className="space-y-0.5">
                            {TIME_HOURS.map((hour) => (
                              <button
                                key={`start-hour-${hour}`}
                                type="button"
                                onClick={() => setStartTime((prev) => ({ ...prev, hour }))}
                                className="w-full py-0.5 text-center text-xl text-[#111827] hover:bg-gray-100"
                              >
                                {hour}
                              </button>
                            ))}
                          </div>
                          <div className="space-y-0.5">
                            {TIME_MINUTES.map((minute) => (
                              <button
                                key={`start-minute-${minute}`}
                                type="button"
                                onClick={() => setStartTime((prev) => ({ ...prev, minute }))}
                                className="w-full py-0.5 text-center text-xl text-[#111827] hover:bg-gray-100"
                              >
                                {minute}
                              </button>
                            ))}
                          </div>
                          <div className="space-y-0.5">
                            {TIME_MERIDIEM.map((meridiem) => (
                              <button
                                key={`start-meridiem-${meridiem}`}
                                type="button"
                                onClick={() => setStartTime((prev) => ({ ...prev, meridiem }))}
                                className="w-full py-0.5 text-center text-xl text-[#111827] hover:bg-gray-100"
                              >
                                {meridiem}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">End Time *</label>
                  <div ref={endTimeRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenTimePicker((prev) => (prev === 'end' ? null : 'end'))}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-[#F8FAFC] px-3 py-2.5 text-sm text-gray-700"
                    >
                      <span className="inline-flex items-center gap-2 text-gray-500">
                        <IconClock className="h-4 w-4 text-gray-400" />
                        {`${endTime.hour}:${endTime.minute} ${endTime.meridiem}`}
                      </span>
                      <IconClock className="h-4 w-4 text-gray-700" />
                    </button>
                    {openTimePicker === 'end' && (
                      <div className="absolute right-0 top-[calc(100%+6px)] z-20 w-[152px] border border-gray-300 bg-white shadow-lg">
                        <div className="grid grid-cols-3 gap-1 border-b border-gray-200 px-1 py-1">
                          <div className="rounded bg-[#0B84F3] py-1 text-center text-xl font-semibold text-white">{endTime.hour}</div>
                          <div className="rounded bg-[#0B84F3] py-1 text-center text-xl font-semibold text-white">{endTime.minute}</div>
                          <div className="rounded bg-[#0B84F3] py-1 text-center text-lg font-semibold text-white">{endTime.meridiem}</div>
                        </div>
                        <div className="grid grid-cols-3 px-1 py-1">
                          <div className="space-y-0.5">
                            {TIME_HOURS.map((hour) => (
                              <button
                                key={`end-hour-${hour}`}
                                type="button"
                                onClick={() => setEndTime((prev) => ({ ...prev, hour }))}
                                className="w-full py-0.5 text-center text-xl text-[#111827] hover:bg-gray-100"
                              >
                                {hour}
                              </button>
                            ))}
                          </div>
                          <div className="space-y-0.5">
                            {TIME_MINUTES.map((minute) => (
                              <button
                                key={`end-minute-${minute}`}
                                type="button"
                                onClick={() => setEndTime((prev) => ({ ...prev, minute }))}
                                className="w-full py-0.5 text-center text-xl text-[#111827] hover:bg-gray-100"
                              >
                                {minute}
                              </button>
                            ))}
                          </div>
                          <div className="space-y-0.5">
                            {TIME_MERIDIEM.map((meridiem) => (
                              <button
                                key={`end-meridiem-${meridiem}`}
                                type="button"
                                onClick={() => setEndTime((prev) => ({ ...prev, meridiem }))}
                                className="w-full py-0.5 text-center text-xl text-[#111827] hover:bg-gray-100"
                              >
                                {meridiem}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Location Type *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLocationType('online')}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${
                      locationType === 'online'
                        ? 'border-[#0F172A] bg-[#0F172A] text-white'
                        : 'border-gray-200 bg-white text-gray-700'
                    }`}
                  >
                    <IconVideo className="h-4 w-4" />
                    Online
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocationType('physical')}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${
                      locationType === 'physical'
                        ? 'border-[#0F172A] bg-[#0F172A] text-white'
                        : 'border-gray-200 bg-white text-gray-700'
                    }`}
                  >
                    <IconMapPin className="h-4 w-4" />
                    Physical
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {locationType === 'online' ? 'Meeting Link *' : 'Location *'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-200 px-9 py-2.5 text-sm text-gray-700 placeholder-gray-400"
                    placeholder={locationType === 'online' ? 'https://zoom.us/j/...' : 'e.g., Bangalore, India'}
                  />
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {locationType === 'online' ? <IconLinkSmall /> : <IconMapPin className="h-4 w-4" />}
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Notes (Optional)</label>
                <textarea
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400"
                  placeholder="Add any additional notes or instructions..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-5 py-4">
              <button
                type="button"
                onClick={() => {
                  setIsScheduleModalOpen(false)
                  setIsRequirementOpen(false)
                  setOpenTimePicker(null)
                }}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsScheduleModalOpen(false)
                  setIsRequirementOpen(false)
                  setOpenTimePicker(null)
                }}
                className="rounded-lg bg-[#0EA5C4] px-4 py-2 text-sm font-semibold text-white"
              >
                Schedule Session
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
