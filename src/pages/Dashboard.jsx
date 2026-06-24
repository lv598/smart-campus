import React, { useState } from 'react'
import {
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  GraduationCap,
  Building2,
  Bell,
  Calendar,
  Award,
  Download,
  Check,
  AlertCircle,
  X,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'
import { StatCard } from '../components/StatCard'

const statCards = [
  {
    title: '在校学生',
    value: '12,846',
    change: '+3.2%',
    upward: true,
    icon: Users,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: '在职教师',
    value: '1,258',
    change: '+1.5%',
    upward: true,
    icon: GraduationCap,
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    title: '今日出勤率',
    value: '96.8%',
    change: '+0.5%',
    upward: true,
    icon: TrendingUp,
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    title: '本学期课程',
    value: '856',
    change: '-12',
    upward: false,
    icon: BookOpen,
    gradient: 'from-orange-500 to-orange-600',
  },
]

const weeklyAttendanceData = [
  { name: '周一', 出勤: 97.2, 迟到: 2.1, 缺勤: 0.7 },
  { name: '周二', 出勤: 96.5, 迟到: 2.4, 缺勤: 1.1 },
  { name: '周三', 出勤: 95.8, 迟到: 3.0, 缺勤: 1.2 },
  { name: '周四', 出勤: 97.3, 迟到: 1.9, 缺勤: 0.8 },
  { name: '周五', 出勤: 94.6, 迟到: 3.5, 缺勤: 1.9 },
]

const monthlyAttendanceData = [
  { name: '第1周', 出勤: 96.8, 迟到: 2.3, 缺勤: 0.9 },
  { name: '第2周', 出勤: 97.5, 迟到: 1.8, 缺勤: 0.7 },
  { name: '第3周', 出勤: 95.2, 迟到: 3.1, 缺勤: 1.7 },
  { name: '第4周', 出勤: 96.9, 迟到: 2.2, 缺勤: 0.9 },
]

const semesterAttendanceData = [
  { name: '第1月', 出勤: 94.5, 迟到: 3.8, 缺勤: 1.7 },
  { name: '第2月', 出勤: 95.2, 迟到: 3.5, 缺勤: 1.3 },
  { name: '第3月', 出勤: 96.1, 迟到: 2.9, 缺勤: 1.0 },
  { name: '第4月', 出勤: 97.3, 迟到: 1.8, 缺勤: 0.9 },
  { name: '第5月', 出勤: 96.5, 迟到: 2.4, 缺勤: 1.1 },
  { name: '第6月', 出勤: 95.8, 迟到: 3.0, 缺勤: 1.2 },
]

const yearAttendanceData = [
  { name: '2020', 出勤: 92.1, 迟到: 4.2, 缺勤: 3.7 },
  { name: '2021', 出勤: 93.5, 迟到: 3.8, 缺勤: 2.7 },
  { name: '2022', 出勤: 94.8, 迟到: 3.2, 缺勤: 2.0 },
  { name: '2023', 出勤: 96.0, 迟到: 2.8, 缺勤: 1.2 },
  { name: '2024', 出勤: 96.8, 迟到: 2.4, 缺勤: 0.8 },
]

const attendanceDataMap = {
  '本周': weeklyAttendanceData,
  '本月': monthlyAttendanceData,
  '本学期': semesterAttendanceData,
  '本年度': yearAttendanceData,
}

const majorData = [
  { name: '计算机科学', value: 3200 },
  { name: '机械工程', value: 2800 },
  { name: '经济管理', value: 2400 },
  { name: '艺术设计', value: 1800 },
  { name: '其他专业', value: 2646 },
]

const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#6b7280']

const recentActivities = [
  {
    id: '1',
    title: '期末考试安排已发布',
    time: '2小时前',
    type: 'notice',
    content: '2024年春季学期期末考试将于6月24日至6月30日举行，请各班级提前做好考场安排...',
  },
  {
    id: '2',
    title: '图书馆系统升级维护通知',
    time: '5小时前',
    type: 'maintenance',
    content: '图书馆信息系统将于6月20日凌晨2:00-6:00进行系统升级维护，届时将无法访问...',
  },
  {
    id: '3',
    title: '2024春季学期选课即将开始',
    time: '1天前',
    type: 'academic',
    content: '2024年秋季学期选课将于7月1日开始，请各位同学提前在系统中预选课程...',
  },
  {
    id: '4',
    title: '校园运动会报名截止提醒',
    time: '1天前',
    type: 'activity',
    content: '第38届校园运动会报名将于本周五截止，请有意向的同学尽快到体育学院报名...',
  },
  {
    id: '5',
    title: '教务处关于论文答辩的通知',
    time: '2天前',
    type: 'academic',
    content: '2024届毕业生论文答辩将于7月5日至7月10日进行，请提前准备好答辩PPT...',
  },
]

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-gray-800'

  return (
    <div className={`fixed top-20 right-4 z-[100] ${bgColor} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3`}>
      {type === 'success' && <Check size={16} />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </div>
  )
}

function Dashboard() {
  const [timeRange, setTimeRange] = useState('本周')
  const [selectedActivity, setSelectedActivity] = useState(null)

  const attendanceData = attendanceDataMap[timeRange] || weeklyAttendanceData

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">数据看板</h1>
          <p className="text-sm text-gray-500 mt-1">
            欢迎回来，管理员！以下是校园运营概览。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:bg-gray-50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 cursor-pointer glow-hover"
          >
            <option>本周</option>
            <option>本月</option>
            <option>本学期</option>
            <option>本年度</option>
          </select>
          <button
            onClick={() => {
              const csvContent = '指标,数值\n在校学生,12846\n在职教师,1258\n出勤率,96.8%\n课程数,856'
              const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' })
              const link = document.createElement('a')
              link.href = URL.createObjectURL(blob)
              link.download = '智慧校园数据报告.csv'
              link.click()
            }}
            className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-sm flex items-center gap-2 glow-primary"
          >
            <Download size={16} />
            导出报告
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Attendance Trend */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">{timeRange === '本周' ? '本周' : timeRange}出勤趋势</h3>
              <p className="text-xs text-gray-500 mt-0.5">每日出勤、迟到、缺勤比例</p>
            </div>
            <Clock size={16} className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={attendanceData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="出勤" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="迟到" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="缺勤" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Major Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">专业分布</h3>
              <p className="text-xs text-gray-500 mt-0.5">各学院学生数量</p>
            </div>
            <Users size={16} className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={majorData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {majorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {majorData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Enrollment Trend */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">近五年招生趋势</h3>
              <p className="text-xs text-gray-500 mt-0.5">每年新生入学人数变化</p>
            </div>
            <TrendingUp size={16} className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={[
                { year: '2020', students: 10200 },
                { year: '2021', students: 10850 },
                { year: '2022', students: 11320 },
                { year: '2023', students: 12180 },
                { year: '2024', students: 12846 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()} 人`, '招生人数']}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">最新动态</h3>
              <p className="text-xs text-gray-500 mt-0.5">校园最新通知与活动</p>
            </div>
            <Bell size={16} className="text-gray-400" />
          </div>
          <div className="space-y-1 max-h-[340px] overflow-y-auto">
            {recentActivities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => setSelectedActivity(selectedActivity?.id === activity.id ? null : activity)}
                className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer glow-hover ${
                  selectedActivity?.id === activity.id ? 'bg-primary-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{activity.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  {selectedActivity?.id === activity.id && (
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{activity.content}</p>
                  )}
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
