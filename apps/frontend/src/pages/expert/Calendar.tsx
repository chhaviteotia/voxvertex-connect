import { useState } from 'react'
import { DashboardLayout } from '../../layouts/DashboardLayout'
import { expertSidebarItems, expertSidebarBottomItems } from '../../config/expertNav'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/selectors/authSelectors'
import { IconCalendar, IconClock, IconMapPin, IconVideo } from '../../components/layout/DashboardIcons'

const TEAL = '#008C9E'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** Build a 6×7 grid for the calendar. Each cell: { day, isCurrentMonth } */
function getCalendarGrid(year: number, month: number): { day: number; isCurrentMonth: boolean }[] {
  const first = new Date(year, month - 1, 1)
  const last = new Date(year, month, 0)
  const startWeekday = first.getDay()
  const daysInMonth = last.getDate()
  const prevMonthLast = new Date(year, month - 1, 0).getDate()
  const grid: { day: number; isCurrentMonth: boolean }[] = []
  for (let i = 0; i < startWeekday; i++) {
    grid.push({ day: prevMonthLast - startWeekday + i + 1, isCurrentMonth: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push({ day: d, isCurrentMonth: true })
  }
  const remaining = 42 - grid.length
  for (let d = 1; d <= remaining; d++) {
    grid.push({ day: d, isCurrentMonth: false })
  }
  return grid
}

export function ExpertCalendar() {
  const user = useAppSelector(selectUser) as { name?: string; email?: string } | null
  const prefix = (user?.email || '').split('@')[0] || 'John'
  const displayName = user?.name || (prefix ? prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + ' Doe' : 'John Doe')

  const [showAddWindow, setShowAddWindow] = useState(false)
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1)

  const calendarGrid = getCalendarGrid(viewYear, viewMonth)
  const monthLabel = `${MONTH_NAMES[viewMonth - 1]} ${viewYear}`

  const goPrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const goNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const goToday = () => {
    setViewYear(today.getFullYear())
    setViewMonth(today.getMonth() + 1)
  }

  /** Demo: highlight like March 2026 when viewing that month */
  const isDemoMonth = viewYear === 2026 && viewMonth === 3
  const isSelected = (day: number) => isDemoMonth && day === 2
  const isAvailable = (day: number) => isDemoMonth && day >= 10 && day <= 14
  const isScheduled = (day: number) => isDemoMonth && (day === 15 || day === 20)

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
      <div className="max-w-5xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Calendar &amp; Availability</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your availability windows and scheduled sessions</p>
        </div>

        {/* Sync with External Calendars */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Sync with External Calendars</h2>
            <p className="text-sm text-gray-500 mt-0.5">Connect your calendar to automatically sync sessions</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-gray-700 text-[10px] text-gray-800">
                  <span className="h-2 w-2 border border-gray-800" />
                </span>
                Connect Google Calendar
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-700">
                  <span className="h-2 w-2 rounded-full border border-gray-800" />
                </span>
                Connect Apple Calendar
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-gray-700">
                  <span className="h-2 w-2 border border-gray-800 border-b-0 border-l-0" />
                </span>
                Connect Outlook
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
              >
                Download .ICS File
              </button>
            </div>
          </div>
          <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-teal-50" style={{ color: TEAL }}>
            <IconCalendar />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:flex lg:gap-6 lg:items-start">
          {/* Calendar View */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 pt-5 pb-8 lg:w-1/2 lg:min-h-[630px] flex flex-col">
            <h2 className="text-base font-semibold text-gray-900">Calendar View</h2>
            <p className="text-sm text-gray-500 mt-0.5 mb-4">Select dates to mark your availability</p>

            {/* Month + Today left, arrows right */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{monthLabel}</span>
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
                  onClick={goToday}
                >
                  Today
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-white text-gray-600"
                  style={{ borderColor: '#BEE3F8' }}
                  onClick={goPrevMonth}
                  aria-label="Previous month"
                >
                  {'<'}
                </button>
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600"
                  onClick={goNextMonth}
                  aria-label="Next month"
                >
                  {'>'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center text-xs text-gray-600 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            <div
              className="grid grid-cols-7 text-sm flex-1 min-h-0"
              style={{ gridTemplateRows: 'repeat(6, 1fr)' }}
            >
              {calendarGrid.map((cell, idx) => {
                const { day, isCurrentMonth } = cell
                const selected = isCurrentMonth && isSelected(day)
                const available = isCurrentMonth && isAvailable(day)
                const scheduled = isCurrentMonth && isScheduled(day)
                const key = `cell-${viewYear}-${viewMonth}-${idx}-${day}-${isCurrentMonth}`
                if (!isCurrentMonth) {
                  return (
                    <div key={key} className="flex flex-col items-center justify-center p-0.5">
                      <span className="flex flex-col items-center justify-center w-9 min-h-9 text-sm font-medium text-gray-300">
                        {day}
                      </span>
                    </div>
                  )
                }
                return (
                  <div key={key} className="flex flex-col items-center justify-center p-0.5">
                    <button
                      type="button"
                      className={`flex flex-col items-center justify-center rounded-lg w-9 min-h-9 text-sm font-medium ${
                        selected ? 'border-2 bg-white text-gray-900' : ''
                      } ${available ? 'bg-[#D1FAE5] text-gray-900' : ''} ${
                        scheduled ? 'border-2 bg-white text-gray-900' : ''
                      } ${!selected && !available && !scheduled ? 'text-gray-700' : ''}`}
                      style={
                        selected || scheduled ? { borderColor: '#BEE3F8' } : undefined
                      }
                    >
                      {day}
                      {available && <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#34D399]" />}
                      {scheduled && <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-4">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full border-2 border-[#34D399] bg-transparent" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded border-2 border-[#BEE3F8] bg-transparent" />
                <span>Scheduled</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#20C997]" />
                <span>Selected</span>
              </div>
            </div>
          </div>

          {/* Availability & Quick Stats (right column) */}
          <div className="space-y-6 lg:w-1/2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Availability Windows</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Set date ranges when you&apos;re available for engagements</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white whitespace-nowrap"
                  style={{ backgroundColor: TEAL }}
                  onClick={() => setShowAddWindow(true)}
                >
                  <span className="text-base leading-none">+</span>
                  Add Window
                </button>
              </div>
              {/* Add Window form */}
              {showAddWindow && (
                <div className="rounded-lg border border-gray-200 bg-[#F8FAFF] px-4 py-4 mb-4">
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
                        <div className="relative">
                          <input
                            type="text"
                            value="mm/dd/yyyy"
                            readOnly
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-400"
                          />
                          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-xs">
                            <IconCalendar className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">End Date</label>
                        <div className="relative">
                          <input
                            type="text"
                            value="mm/dd/yyyy"
                            readOnly
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-400"
                          />
                          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-xs">
                            <IconCalendar className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Note <span className="font-normal text-gray-400">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Available for workshops only"
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                      style={{ backgroundColor: TEAL }}
                    >
                      Save Window
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50"
                      onClick={() => setShowAddWindow(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Existing window list */}
              <div className="rounded-lg border border-gray-200 px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E0ECFF] text-[#4C6FFF]">
                    <IconCalendar />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mar 10, 2026 - Mar 14, 2026</p>
                    <p className="text-xs text-gray-500 mt-0.5">Available for workshops</p>
                  </div>
                </div>
                <button type="button" className="text-gray-400 hover:text-gray-600 text-lg leading-none">
                  ×
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Active Windows</p>
                  <p className="text-lg font-semibold text-[#008C9E]">1</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Upcoming Sessions</p>
                  <p className="text-lg font-semibold text-[#008C9E]">2</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pending</p>
                  <p className="text-lg font-semibold text-[#008C9E]">1</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Completed</p>
                  <p className="text-lg font-semibold text-[#008C9E]">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled Sessions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Scheduled Sessions</h2>
          <p className="text-xs text-gray-500 mb-4">Upcoming (2)</p>

          <div className="space-y-4">
            {/* Session 1 */}
            <div className="rounded-xl border border-gray-200 px-4 py-4">
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-900 inline-flex items-center gap-2 flex-wrap">
                  TechCorp India
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#e6ffe6] px-2.5 py-0.5 text-xs font-medium text-[#28a745]">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    confirmed
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Workshop (Single Day)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <IconCalendar className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Mar 15, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconClock className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconVideo className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Online - Zoom</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  <IconVideo className="w-4 h-4 text-gray-600 shrink-0" />
                  Join Meeting
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Session 2 */}
            <div className="rounded-xl border border-gray-200 px-4 py-4">
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-900 inline-flex items-center gap-2 flex-wrap">
                  Startup Hub
                  <span className="inline-flex items-center gap-1 rounded-md bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    pending
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Advisory Session</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <IconCalendar className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Mar 20, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconClock className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>2:00 PM - 4:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconMapPin className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Bangalore, India</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                  style={{ backgroundColor: TEAL }}
                >
                  Confirm Session
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Request Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

