import React, { useState } from 'react'
import { Clock, MapPin, BookOpen } from 'lucide-react'
import { SimpleStatCard } from '../components/StatCard'

function Schedule() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedWeek, setSelectedWeek] = useState('本周')

  const days = ['周一', '周二', '周三', '周四', '周五']
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']

  const stats = [
    { icon: Clock, label: '本周课程', value: '32节', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: BookOpen, label: '任课教师', value: '18位', color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: MapPin, label: '教学楼', value: '6栋', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]

  const schedule = {
    0: { // 周一
      '08:00': { name: '高等数学', teacher: '王教授', room: '教学楼 A-301', color: 'bg-blue-50 border-blue-200 text-blue-700' },
      '10:00': { name: '数据结构', teacher: '张教授', room: '计算机楼 B-205', color: 'bg-purple-50 border-purple-200 text-purple-700' },
      '14:00': { name: '大学英语', teacher: '赵老师', room: '教学楼 C-102', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    },
    1: { // 周二
      '09:00': { name: '操作系统', teacher: '李教授', room: '计算机楼 B-303', color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
      '11:00': { name: '大学物理', teacher: '刘教授', room: '实验楼 D-101', color: 'bg-orange-50 border-orange-200 text-orange-700' },
      '15:00': { name: '体育', teacher: '陈老师', room: '体育馆', color: 'bg-rose-50 border-rose-200 text-rose-700' },
    },
    2: { // 周三
      '08:00': { name: '高等数学', teacher: '王教授', room: '教学楼 A-301', color: 'bg-blue-50 border-blue-200 text-blue-700' },
      '10:00': { name: '计算机网络', teacher: '陈教授', room: '计算机楼 B-205', color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
      '13:00': { name: '数据结构实验', teacher: '张教授', room: '机房 E-101', color: 'bg-purple-50 border-purple-200 text-purple-700' },
    },
    3: { // 周四
      '09:00': { name: '大学物理', teacher: '刘教授', room: '实验楼 D-101', color: 'bg-orange-50 border-orange-200 text-orange-700' },
      '14:00': { name: '大学英语', teacher: '赵老师', room: '教学楼 C-102', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    },
    4: { // 周五
      '08:00': { name: '操作系统', teacher: '李教授', room: '计算机楼 B-303', color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
      '10:00': { name: '高等数学', teacher: '王教授', room: '教学楼 A-301', color: 'bg-blue-50 border-blue-200 text-blue-700' },
      '15:00': { name: '体育', teacher: '陈老师', room: '体育馆', color: 'bg-rose-50 border-rose-200 text-rose-700' },
    },
  }

  const weekLabels = ['上一周', '本周', '下一周']

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">课程表</h1>
          <p className="text-sm text-gray-500 mt-1">2024年春季学期</p>
        </div>
        <div className="flex items-center gap-2">
          {weekLabels.map((label, idx) => (
            <button
              key={label}
              onClick={() => {
                if (idx === 0) setWeekOffset(prev => prev - 1)
                else if (idx === 2) setWeekOffset(prev => prev + 1)
                else setWeekOffset(0)
              }}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                selectedWeek === label
                  ? 'bg-primary-600 text-white hover:bg-primary-700 glow-primary'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 glow-hover'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((item) => (
          <SimpleStatCard key={item.label} {...item} />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-glow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3 w-24">时间</th>
                {days.map((day) => (
                  <th key={day} className="text-center text-xs font-medium text-gray-500 uppercase px-4 py-3">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {timeSlots.map((time) => (
                <tr key={time} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-xs font-medium text-gray-500 whitespace-nowrap">{time}</td>
                  {days.map((_, dayIndex) => {
                    const class_ = schedule[dayIndex]?.[time]
                    return (
                      <td key={dayIndex} className="px-2 py-2">
                        {class_ ? (
                          <div className={`rounded-xl p-3 border ${class_.color} transition-all duration-300 hover:shadow-sm hover:scale-[1.02] card-glow`}>
                            <p className="text-sm font-semibold">{class_.name}</p>
                            <div className="flex items-center gap-1 mt-1 text-xs opacity-80">
                              <BookOpen size={10} />
                              <span>{class_.teacher}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5 text-xs opacity-80">
                              <MapPin size={10} />
                              <span>{class_.room}</span>
                            </div>
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
