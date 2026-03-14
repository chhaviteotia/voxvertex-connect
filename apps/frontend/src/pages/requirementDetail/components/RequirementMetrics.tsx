interface RequirementMetricsProps {
  proposalCount: number
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <span className="text-2xl font-bold text-[#2293B4]" aria-hidden>
        •
      </span>
    </div>
  )
}

export default function RequirementMetrics({ proposalCount }: RequirementMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <MetricCard label="Expert Matches" value={8} />
      <MetricCard label="Proposals Received" value={proposalCount} />
      <MetricCard label="Profile Views" value={24} />
    </div>
  )
}
