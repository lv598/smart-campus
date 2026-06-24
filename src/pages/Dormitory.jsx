import React, { useState, useEffect } from 'react'
import { Building2, BedDouble, Shield, Wrench, X, Save, Check, UserPlus, AlertCircle } from 'lucide-react'
import { SimpleStatCard } from '../components/StatCard'
import { dormitory } from '../lib/api'

function Dormitory() {
  const [showRepairModal, setShowRepairModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [toasts, setToasts] = useState([])
  const [buildings, setBuildings] = useState([])
  const [loading, setLoading] = useState(true)
  const [repairForm, setRepairForm] = useState({ building_id: '', room: '', type: '', description: '' })
  const [selectedBuilding, setSelectedBuilding] = useState(null)

  const addToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }

  const loadBuildings = async () => {
    try {
      const result = await dormitory.buildings()
      setBuildings(result.data)
    } catch (err) {
      console.error('Failed to load buildings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadBuildings() }, [])

  const totalCapacity = buildings.reduce((s, b) => s + b.capacity, 0)
  const totalOccupied = buildings.reduce((s, b) => s + b.occupied, 0)
  const overallRate = totalCapacity > 0 ? ((totalOccupied / totalCapacity) * 100).toFixed(1) : '0'

  const repairTypes = ['水电维修', '家具损坏', '网络故障', '门窗问题', '其他']

  const handleRepairSubmit = async () => {
    if (!repairForm.building_id || !repairForm.description) return
    try {
      await dormitory.addRepair(repairForm)
      setShowRepairModal(false)
      addToast('报修申请已提交')
      setRepairForm({ building_id: '', room: '', type: '', description: '' })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {toasts.map(toast => (
        <div key={toast.id} className="fixed top-20 right-4 z-[100] bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
          <Check size={16} /><span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">宿舍管理</h1>
        <p className="text-sm text-gray-500 mt-1">宿舍分配、报修管理和入住统计</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SimpleStatCard icon={Building2} label="宿舍楼栋" value={`${buildings.length}栋`} color="text-blue-600" bg="bg-blue-50" />
        <SimpleStatCard icon={BedDouble} label="总床位" value={totalCapacity.toLocaleString()} color="text-purple-600" bg="bg-purple-50" />
        <SimpleStatCard icon={Shield} label="入住率" value={`${overallRate}%`} color="text-emerald-600" bg="bg-emerald-50" />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">加载中...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {buildings.map((building) => (
            <div key={building.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 card-glow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    building.type === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                  }`}><Building2 size={20} /></div>
                  <div><h4 className="text-base font-semibold text-gray-900">{building.name}</h4><p className="text-xs text-gray-500">{building.floor_count} · {building.rooms}间</p></div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">入住情况</span>
                    <span className="font-medium text-gray-900">{building.occupied}/{building.capacity}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500" style={{ width: `${(building.occupied / building.capacity) * 100}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button onClick={() => { setSelectedBuilding(building); setShowAssignModal(true) }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors glow-hover"><BedDouble size={14} />房间分配</button>
                  <button onClick={() => { setSelectedBuilding(building); setRepairForm(prev => ({ ...prev, building_id: building.id, room: '' })); setShowRepairModal(true) }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors glow-hover"><Wrench size={14} />报修管理</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Repair Modal */}
      {showRepairModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowRepairModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">报修申请 — {selectedBuilding?.name}</h3>
              <button onClick={() => setShowRepairModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors"><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">楼栋</label><input type="text" value={selectedBuilding?.name || ''} readOnly className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">房间号</label><input type="text" placeholder="如 301" value={repairForm.room} onChange={(e) => setRepairForm(prev => ({ ...prev, room: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">故障类型</label><select value={repairForm.type} onChange={(e) => setRepairForm(prev => ({ ...prev, type: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">{repairTypes.map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">问题描述</label><textarea rows={3} placeholder="请详细描述故障情况..." value={repairForm.description} onChange={(e) => setRepairForm(prev => ({ ...prev, description: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none" /></div>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button onClick={() => setShowRepairModal(false)} className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">取消</button>
              <button onClick={handleRepairSubmit} className="px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2 glow-accent"><Save size={16} />提交报修</button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAssignModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">房间分配 — {selectedBuilding?.name}</h3>
              <button onClick={() => setShowAssignModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors"><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">楼栋</label><input type="text" value={selectedBuilding?.name || ''} readOnly className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">学生姓名</label><input type="text" placeholder="请输入学生姓名" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">学号</label><input type="text" placeholder="请输入学号" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">楼层</label><select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">{Array.from({ length: 4 }, (_, i) => <option key={i + 1}>第{i + 1}层</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">房间号</label><select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">{Array.from({ length: 6 }, (_, i) => <option key={i + 1}>{String(i + 1).padStart(2, '0')}室</option>)}</select></div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button onClick={() => setShowAssignModal(false)} className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">取消</button>
              <button onClick={() => { setShowAssignModal(false); addToast('房间分配成功') }} className="px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2 glow-accent"><Save size={16} />确认分配</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dormitory
