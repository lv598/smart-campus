import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

/**
 * StatCard — reusable stat display with icon, value, trend, and optional subtitle.
 * Used across Dashboard and module pages for visual consistency.
 */
function StatCard({ title, value, change, upward, icon: Icon, gradient }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div
          className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-sm`}
        >
          <Icon size={20} className="text-white" />
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1 mt-3">
          {upward ? (
            <ArrowUpRight size={14} className="text-emerald-500" />
          ) : (
            <ArrowDownRight size={14} className="text-red-500" />
          )}
          <span
            className={`text-xs font-medium ${
              upward ? 'text-emerald-500' : 'text-red-500'
            }`}
          >
            {change}
          </span>
          <span className="text-xs text-gray-400">较上月</span>
        </div>
      )}
    </div>
  )
}

/**
 * SimpleStatCard — compact stat for module pages (no trend indicator).
 */
function SimpleStatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
          <Icon size={20} className={color} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

export { StatCard, SimpleStatCard }
