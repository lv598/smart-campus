import React, { useState, useEffect } from 'react'
import { Clock, MapPin, BookOpen } from 'lucide-react'
import { SimpleStatCard } from '../components/StatCard'
import { schedule } from '../lib/api'

function Schedule() {
  const [scheduleData, setScheduleData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    schedule.list().then(r => setScheduleData(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const days = ['周一', '周二', '周三', '周四', '周五']
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']

  if (loading) return <div className="text-center py-12 text-gray-400">加载中...</div>

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">课程表</h1>
          <p className="text-sm text-gray-500 mt-1">2024年春季学期</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SimpleStatCard icon={Clock} label="本周课程" value="32节" color="text-blue-600" bg="bg-blue-50" />
        <SimpleStatCard icon={BookOpen} label="任课教师" value="18位" color="text-purple-600" bg="bg-purple-50" />
        <SimpleStatCard icon={MapPin} label="教学楼" value="6栋" color="text-emerald-600" bg="bg-emerald-50" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-glow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3 w-24">时间</th>
                {days.map(day => <th key={day} className="text-center text-xs font-medium text-gray-500 uppercase px-4 py-3">{day}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {timeSlots.map(time => (
                <tr key={time} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-xs font-medium text-gray-500 whitespace-nowrap">{time}</td>
                  {days.map((day, dayIndex) => {
                    const dayName = days[dayIndex]
                    const entry = scheduleData?.[dayName]?.find(e => e.time === time)
                    return (
                      <td key={dayIndex} className="px-2 py-2">
                        {entry ? (
                          <div className={`rounded-xl p-3 border ${entry.color} transition-all duration-300 hover:shadow-sm hover:scale-[1.02] card-glow`}>
                            <p className="text-sm font-semibold">{entry.course_code}</p>
                            <div className="flex items-center gap-1 mt-1 text-xs opacity-80"><MapPin size={10} /><span>{entry.room}</span></div>
                          </div>
                        ) : (
                          <div className="h-full min-h-[72px] border-2 border-dashed border-gray-100 rounded-xl"></div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Schedule
