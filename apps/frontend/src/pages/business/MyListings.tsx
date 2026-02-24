import { DashboardLayout } from '../../layouts/DashboardLayout'
import { businessSidebarItems, businessSidebarBottomItems } from '../../config/businessNav'
import { IconEye, IconTrendingUp, IconEllipsisVertical } from '../../components/layout/DashboardIcons'

type Status = 'Active' | 'In Review' | 'Closed'

const LISTINGS = [
  { id: '1', title: 'AI & Machine Learning Expert for Tech Conference', status: 'Active' as Status, proposals: 12, views: 156, posted: 'Feb 11, 2024', deadline: 'Feb 18, 2024' },
  { id: '2', title: 'Cybersecurity Specialist for Enterprise Workshop', status: 'In Review' as Status, proposals: 8, views: 98, posted: 'Feb 10, 2024', deadline: 'Feb 25, 2024' },
  { id: '3', title: 'Leadership & Management Expert for Executive Summit', status: 'Active' as Status, proposals: 15, views: 203, posted: 'Feb 9, 2024', deadline: 'Mar 1, 2024' },
  { id: '4', title: 'Digital Transformation Speaker for Board Meeting', status: 'Closed' as Status, proposals: 6, views: 87, posted: 'Feb 5, 2024', deadline: 'Feb 15, 2024' },
]

const STATUS_STYLES: Record<Status, string> = {
  Active: 'bg-[#ECFDF5] text-[#00B37B] border border-[#A7F3D0]',
  'In Review': 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]',
  Closed: 'bg-[#F3F4F6] text-[#4B5563] border border-gray-200',
}

export function MyListings() {
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track all your expert requirement postings</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Requirement</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Proposals</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Views</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Posted</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Deadline</th>
                  <th className="w-10 py-3 px-2" aria-label="Actions" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {LISTINGS.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/50">
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">{row.title}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium border ${STATUS_STYLES[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5">
                        <IconTrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-gray-900">{row.proposals}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 text-gray-600">
                        <IconEye className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{row.views}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{row.posted}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{row.deadline}</td>
                    <td className="py-4 px-2 text-right">
                      <button type="button" className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700" aria-label="Actions">
                        <IconEllipsisVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
