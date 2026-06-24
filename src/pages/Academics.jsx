import React, { useState } from 'react'
import { BookOpen, Award, FileText, CheckCircle2, X, Save } from 'lucide-react'
import { SimpleStatCard } from '../components/StatCard'

function Academics() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [courses, setCourses] = useState([
    { code: 'CS101', name: '数据结构与算法', teacher: '张教授', credits: 4, students: 128, status: '进行中' },
    { code: 'CS201', name: '操作系统', teacher: '李教授', credits: 3, students: 96, status: '进行中' },
    { code: 'MATH101', name: '高等数学', teacher: '王教授', credits: 4, students: 256, status: '进行中' },
    { code: 'ENG201', name: '大学英语', teacher: '赵老师', credits: 2, students: 180, status: '已结束' },
    { code: 'PHY101', name: '大学物理', teacher: '刘教授', credits: 3, students: 145, status: '进行中' },
    { code: 'CS301', name: '计算机网络', teacher: '陈教授', credits: 3, students: 88, status: '待开课' },
  ])

  const [newCourse, setNewCourse] = useState({ code: '', name: '', teacher: '', credits: '3', students: '0', status: '待开课' })

  const stats = [
    { icon: BookOpen, label: '本学期课程', value: String(courses.length), color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Award, label: '学分总数', value: String(courses.reduce((sum, c) => sum + c.credits, 0)), color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: FileText, label: '成绩单发布', value: '128', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name) return
    setCourses(prev => [...prev, { ...newCourse, credits: Number(newCourse.credits), students: Number(newCourse.students) }])
    setNewCourse({ code: '', name: '', teacher: '', credits: '3', students: '0', status: '待开课' })
    setShowAddModal(false)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">教务管理</h1>
        <p className="text-sm text-gray-500 mt-1">管理课程、成绩和教学安排</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((item) => (
          <SimpleStatCard key={item.label} {...item} />
        ))}
      </div>

      {/* Course Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-glow">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">课程列表</h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2 glow-primary"
          >
            <BookOpen size={16} />
            添加课程
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">课程编号</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">课程名称</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">授课教师</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">学分</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">学生数</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {courses.map((course) => (
                <tr key={course.code} className="hover:bg-gray-50 transition-colors cursor-pointer glow-hover">
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{course.code}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.teacher}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.credits}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.students}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                        course.status === '进行中'
                          ? 'bg-emerald-50 text-emerald-700'
                          : course.status === '已结束'
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <CheckCircle2 size={12} />
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">添加课程</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">课程编号</label>
                  <input
                    type="text"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, code: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="如 CS101"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">授课教师</label>
                  <input
                    type="text"
                    value={newCourse.teacher}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, teacher: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="如 张教授"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">课程名称</label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="请输入课程名称"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学分</label>
                  <input
                    type="number"
                    value={newCourse.credits}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, credits: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学生数</label>
                  <input
                    type="number"
                    value={newCourse.students}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, students: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                  <select
                    value={newCourse.status}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option>进行中</option>
                    <option>待开课</option>
                    <option>已结束</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddCourse}
                className="px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Academics
