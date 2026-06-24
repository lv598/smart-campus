import React, { useState } from 'react'
import { Search, Filter, Plus, Edit2, Trash2, Eye, Mail, Phone, CheckCircle2, XCircle, X, UserPlus, Save } from 'lucide-react'
import { SimpleStatCard } from '../components/StatCard'

function Students() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(null)
  const [showEditModal, setShowEditModal] = useState(null)
  const [students, setStudents] = useState([
    { id: '2024001', name: '李明', gender: '男', major: '计算机科学', grade: '2024级', email: 'liming@campus.edu', phone: '138****1234', status: '在读' },
    { id: '2024002', name: '王芳', gender: '女', major: '经济管理', grade: '2024级', email: 'wangfang@campus.edu', phone: '139****5678', status: '在读' },
    { id: '2023001', name: '张伟', gender: '男', major: '机械工程', grade: '2023级', email: 'zhangwei@campus.edu', phone: '137****9012', status: '在读' },
    { id: '2023002', name: '刘洋', gender: '男', major: '计算机科学', grade: '2023级', email: 'liuyang@campus.edu', phone: '136****3456', status: '休学' },
    { id: '2022001', name: '陈静', gender: '女', major: '艺术设计', grade: '2022级', email: 'chenjing@campus.edu', phone: '135****7890', status: '在读' },
    { id: '2022002', name: '赵磊', gender: '男', major: '计算机科学', grade: '2022级', email: 'zhaolei@campus.edu', phone: '134****2345', status: '毕业' },
    { id: '2021001', name: '孙丽', gender: '女', major: '经济管理', grade: '2021级', email: 'sunli@campus.edu', phone: '133****6789', status: '毕业' },
    { id: '2024003', name: '周杰', gender: '男', major: '机械设计制造', grade: '2024级', email: 'zhoujie@campus.edu', phone: '132****0123', status: '在读' },
  ])

  const [newStudent, setNewStudent] = useState({ name: '', id: '', major: '', grade: '2024级', gender: '男', email: '', phone: '' })
  const [editStudent, setEditStudent] = useState(null)

  const stats = [
    { icon: Eye, label: '在校学生', value: '12,846', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: CheckCircle2, label: '在读中', value: '11,200', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: XCircle, label: '休学/毕业', value: '1,646', color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  const filteredStudents = students.filter((s) => {
    const matchSearch = s.name.includes(searchTerm) || s.id.includes(searchTerm) || s.major.includes(searchTerm)
    const matchFilter = filterStatus === 'all' || s.status === filterStatus
    return matchSearch && matchFilter
  })

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.id) return
    setStudents(prev => [
      ...prev,
      { ...newStudent, email: newStudent.email || '未填写', phone: newStudent.phone || '未填写', status: '在读' }
    ])
    setNewStudent({ name: '', id: '', major: '', grade: '2024级', gender: '男', email: '', phone: '' })
    setShowAddModal(false)
  }

  const handleSaveEdit = () => {
    if (!editStudent) return
    setStudents(prev => prev.map(s => s.id === editStudent.id ? editStudent : s))
    setShowEditModal(null)
  }

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">学生管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理学生信息、学籍状态</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm glow-primary"
        >
          <Plus size={16} />
          添加学生
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((item) => (
          <SimpleStatCard key={item.label} {...item} />
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索学号、姓名、专业..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                transition-all duration-300 glow-hover"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700
                focus:outline-none focus:ring-2 focus:ring-primary-500 hover:bg-gray-100 transition-colors glow-hover"
            >
              <option value="all">全部状态</option>
              <option value="在读">在读</option>
              <option value="休学">休学</option>
              <option value="毕业">毕业</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 card-glow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">{student.name}</h4>
                  <p className="text-xs text-gray-500 font-mono">{student.id}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                  student.status === '在读'
                    ? 'bg-emerald-50 text-emerald-700'
                    : student.status === '毕业'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {student.status === '在读' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                {student.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-gray-400 w-16">专业：</span>
                <span className="font-medium">{student.major}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-gray-400 w-16">年级：</span>
                <span>{student.grade}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={14} className="text-gray-400" />
                <span className="truncate">{student.email}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
              <button
                onClick={() => setShowDetailModal(student)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors glow-hover"
              >
                <Eye size={14} />
                查看
              </button>
              <button
                onClick={() => setEditStudent({ ...student })}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors glow-hover"
              >
                <Edit2 size={14} />
                编辑
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="flex items-center justify-center px-3 py-2 text-sm font-medium text-red-500 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors glow-red"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
          <Search size={48} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">没有找到匹配的学生记录</p>
          <p className="text-sm text-gray-400 mt-1">尝试调整搜索条件或筛选器</p>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">添加学生</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="请输入姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学号</label>
                  <input
                    type="text"
                    value={newStudent.id}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="请输入学号"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">专业</label>
                <input
                  type="text"
                  value={newStudent.major}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, major: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="请输入专业"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">年级</label>
                  <select
                    value={newStudent.grade}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, grade: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option>2024级</option>
                    <option>2023级</option>
                    <option>2022级</option>
                    <option>2021级</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">性别</label>
                  <select
                    value={newStudent.gender}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option>男</option>
                    <option>女</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="请输入邮箱"
                />
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
                onClick={handleAddStudent}
                className="px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDetailModal(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">学生详情</h3>
              <button onClick={() => setShowDetailModal(null)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  {showDetailModal.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{showDetailModal.name}</h4>
                  <p className="text-sm text-gray-500 font-mono">{showDetailModal.id}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">性别</span>
                  <span className="text-sm font-medium text-gray-900">{showDetailModal.gender}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">专业</span>
                  <span className="text-sm font-medium text-gray-900">{showDetailModal.major}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">年级</span>
                  <span className="text-sm font-medium text-gray-900">{showDetailModal.grade}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">学籍状态</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                    showDetailModal.status === '在读'
                      ? 'bg-emerald-50 text-emerald-700'
                      : showDetailModal.status === '毕业'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {showDetailModal.status}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">邮箱</span>
                  <span className="text-sm font-medium text-gray-900">{showDetailModal.email}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">电话</span>
                  <span className="text-sm font-medium text-gray-900">{showDetailModal.phone}</span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={() => { setShowDetailModal(null); setEditStudent({ ...showDetailModal }) }}
                className="px-4 py-2.5 text-sm font-medium text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors flex items-center gap-2"
              >
                <Edit2 size={16} />
                编辑
              </button>
              <button
                onClick={() => setShowDetailModal(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowEditModal(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">编辑学生信息</h3>
              <button onClick={() => setShowEditModal(null)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  <input
                    type="text"
                    value={editStudent.name}
                    onChange={(e) => setEditStudent(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学号</label>
                  <input
                    type="text"
                    value={editStudent.id}
                    onChange={(e) => setEditStudent(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">专业</label>
                <input
                  type="text"
                  value={editStudent.major}
                  onChange={(e) => setEditStudent(prev => ({ ...prev, major: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学籍状态</label>
                  <select
                    value={editStudent.status}
                    onChange={(e) => setEditStudent(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option>在读</option>
                    <option>休学</option>
                    <option>毕业</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  <input
                    type="email"
                    value={editStudent.email}
                    onChange={(e) => setEditStudent(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowEditModal(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                保存修改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Students
