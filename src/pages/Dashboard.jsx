import React, { useState, useEffect } from 'react'
import {
  Download,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts'
import { StatCard } from '../components/StatCard'
import { dashboard } from '../lib/api'

const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#6b7280']

function Dashboard() {
  const [timeRange, setTimeRange] = useState('weekly')
  const [stats, setStats] = useState(null)
  const [attendanceData, setAttendanceData] = useState([])
  const [majorData, setMajorData] = useState([])
  const [enrollmentData, setEnrollmentData] = useState([])
  const [activities, setActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      const [statsRes, attendanceRes, majorsRes, enrollmentRes, activitiesRes] = await Promise.all([
        dashboard.stats(),
        dashboard.attendance(timeRange),
        dashboard.majors(),
        dashboard.enrollment(),
        dashboard.activities()
      ])
      setStats(statsRes.data)
      setAttendanceData(attendanceRes.data)
      setMajorData(majorsRes.data)
      setEnrollmentData(enrollmentRes.data)
      setActivities(activitiesRes.data)
    } catch (err) {
      console.error('Failed to load dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  useEffect(() => {
    dashboard.attendance(timeRange).then(r => setAttendanceData(r.data)).catch(() => {})
  }, [timeRange])

  if (loading) return <div className="text-center py-12 text-gray-400">加载中...</div>

  const rangeLabels = { weekly: '本周', monthly: '本月', semester: '本学期', yearly: '本年度' }
  const rangeKeys = Object.keys(rangeLabels)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">数据看板</h1>
          <p className="text-sm text-gray-500 mt-1">欢迎回来，管理员！以下是校园运营概览。</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={rangeKeys.indexOf(timeRange)}
            onChange={(e) => setTimeRange(rangeKeys[parseInt(e.target.value)])}
            className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:bg-gray-50 transition-all cursor-pointer glow-hover"
          >
            {rangeKeys.map((key, i) => <option key={key} value={i}>{rangeLabels[key]}</option>)}
          </select>
          <button onClick={loadData} className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-all shadow-sm flex items-center gap-2 glow-primary">
            <Download size={16} />导出报告
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="在校学生" value={stats?.totalStudents?.toLocaleString() || '-'} change="+3.2%" upward={true} icon={null} gradient="from-blue-500 to-blue-600" />
        <StatCard title="在职教师" value={stats?.totalTeachers?.toLocaleString() || '-'} change="+1.5%" upward={true} icon={null} gradient="from-emerald-500 to-emerald-600" />
        <StatCard title="今日出勤率" value={`${stats?.attendanceRate || '-'}%`} change="+0.5%" upward={true} icon={null} gradient="from-purple-500 to-purple-600" />
        <StatCard title="本学期课程" value={stats?.totalCourses || '-'} change="-12" upward={false} icon={null} gradient="from-orange-500 to-orange-600" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">{rangeLabels[timeRange]}出勤趋势</h3>
              <p className="text-xs text-gray-500 mt-0.5">每日出勤、迟到、缺勤比例</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={attendanceData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey={attendanceData[0]?.day ? 'day' : attendanceData[0]?.week ? 'week' : attendanceData[0]?.month ? 'month' : attendanceData[0]?.year ? 'year' : 'name'} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="出勤" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="迟到" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="缺勤" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <div className="flex items-center justify-between mb-6">
            <div><h3 className="text-base font-semibold text-gray-900">专业分布</h3><p className="text-xs text-gray-500 mt-0.5">各学院学生数量</p></div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={majorData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                {majorData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {majorData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <div className="flex items-center justify-between mb-6">
            <div><h3 className="text-base font-semibold text-gray-900">近五年招生趋势</h3><p className="text-xs text-gray-500 mt-0.5">每年新生入学人数变化</p></div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} 人`, '招生人数']} contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="text-base font-semibold text-gray-900">最新动态</h3><p className="text-xs text-gray-500 mt-0.5">校园最新通知与活动</p></div>
          </div>
          <div className="space-y-1 max-h-[340px] overflow-y-auto">
            {activities.map((activity, i) => (
              <button
                key={i}
                onClick={() => setSelectedActivity(selectedActivity === i ? null : i)}
                className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer glow-hover ${
                  selectedActivity === i ? 'bg-primary-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{activity.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  {selectedActivity === i && (<p className="text-xs text-gray-500 mt-2 leading-relaxed">{activity.desc}</p>)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
