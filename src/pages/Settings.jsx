import React, { useState, useEffect } from 'react'
import { Settings, Bell, Shield, Database, Globe, User, Check, X, Save, Eye, EyeOff } from 'lucide-react'
import { settings as settingsApi } from '../lib/api'

function SettingsPage() {
  const [activeTab, setActiveTab] = useState(null)
  const [toasts, setToasts] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [settingsData, setSettingsData] = useState({})
  const [loading, setLoading] = useState(true)
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(false)
  const [pushNotif, setPushNotif] = useState(true)
  const [siteName, setSiteName] = useState('智慧校园管理系统')
  const [siteUrl, setSiteUrl] = useState('')
  const [adminPassword, setAdminPassword] = useState('')

  const addToast = (message) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }

  const loadSettings = async () => {
    try {
      const result = await settingsApi.get()
      const data = result.data
      setSettingsData(data)
      setEmailNotif(data.email_notifications !== 'false')
      setSmsNotif(data.sms_notifications === 'true')
      setPushNotif(data.push_notifications !== 'false')
      setSiteName(data.site_name || '智慧校园管理系统')
      setSiteUrl(data.site_url || '')
    } catch (err) {
      console.error('Failed to load settings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadSettings() }, [])

  const handleSave = async () => {
    try {
      await settingsApi.update({
        email_notifications: String(emailNotif),
        sms_notifications: String(smsNotif),
        push_notifications: String(pushNotif),
        site_name: siteName,
        site_url: siteUrl,
        maintenance_mode: 'false'
      })
      setActiveTab(null)
      addToast('设置已保存')
    } catch (err) {
      addToast('保存失败: ' + err.message)
    }
  }

  const settingsGroups = [
    { icon: Bell, label: '通知设置', desc: '管理邮件、短信和推送通知' },
    { icon: Shield, label: '安全设置', desc: '密码、两步验证和登录记录' },
    { icon: User, label: '用户权限', desc: '角色管理和访问控制' },
    { icon: Database, label: '数据管理', desc: '备份、导入和导出数据' },
    { icon: Globe, label: '系统配置', desc: '站点信息和自定义设置' },
  ]

  if (loading) return <div className="text-center py-12 text-gray-400">加载中...</div>

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {toasts.map(toast => (
        <div key={toast.id} className="fixed top-20 right-4 z-[100] bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
          <Check size={16} /><span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
        <p className="text-sm text-gray-500 mt-1">管理系统配置和用户权限</p>
      </div>

      {activeTab ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-glow">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settingsGroups.find(g => g.label === activeTab)?.icon && (() => {
                const Icon = settingsGroups.find(g => g.label === activeTab).icon
                return <Icon size={20} className="text-gray-500" />
              })()}
              <h3 className="text-lg font-semibold text-gray-900">{activeTab}</h3>
            </div>
            <button onClick={() => setActiveTab(null)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors"><X size={20} className="text-gray-500" /></button>
          </div>

          <div className="p-6 space-y-6">
            {activeTab === '通知设置' && (
              <>
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <div><p className="text-sm font-medium text-gray-900">邮件通知</p><p className="text-xs text-gray-500 mt-0.5">接收系统邮件通知</p></div>
                  <button onClick={() => setEmailNotif(!emailNotif)} className={`relative w-11 h-6 rounded-full transition-colors glow-hover ${emailNotif ? 'bg-primary-600' : 'bg-gray-300'}`}><div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${emailNotif ? 'left-5' : 'left-0.5'}`}></div></button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <div><p className="text-sm font-medium text-gray-900">短信通知</p><p className="text-xs text-gray-500 mt-0.5">接收重要短信提醒</p></div>
                  <button onClick={() => setSmsNotif(!smsNotif)} className={`relative w-11 h-6 rounded-full transition-colors glow-hover ${smsNotif ? 'bg-primary-600' : 'bg-gray-300'}`}><div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${smsNotif ? 'left-5' : 'left-0.5'}`}></div></button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div><p className="text-sm font-medium text-gray-900">推送通知</p><p className="text-xs text-gray-500 mt-0.5">浏览器桌面推送</p></div>
                  <button onClick={() => setPushNotif(!pushNotif)} className={`relative w-11 h-6 rounded-full transition-colors glow-hover ${pushNotif ? 'bg-primary-600' : 'bg-gray-300'}`}><div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${pushNotif ? 'left-5' : 'left-0.5'}`}></div></button>
                </div>
              </>
            )}

            {activeTab === '安全设置' && (
              <>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">当前密码</label><div className="relative"><input type={showPassword ? 'text' : 'password'} value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10" /><button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></div>
                <div className="flex items-center justify-between py-3 border-t border-gray-50"><div><p className="text-sm font-medium text-gray-900">两步验证</p><p className="text-xs text-gray-500 mt-0.5">增强账户安全性</p></div><button className="px-3 py-1.5 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors glow-hover">开启</button></div>
                <div className="flex items-center justify-between py-3 border-t border-gray-50"><div><p className="text-sm font-medium text-gray-900">登录记录</p><p className="text-xs text-gray-500 mt-0.5">查看最近登录设备</p></div><button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors glow-hover">查看</button></div>
              </>
            )}

            {activeTab === '用户权限' && (
              <div className="space-y-3">
                {['超级管理员', '教务管理员', '普通教师', '访客'].map((role, i) => (
                  <div key={role} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3"><User size={16} className="text-gray-400" /><div><p className="text-sm font-medium text-gray-900">{role}</p><p className="text-xs text-gray-500">{i === 0 ? '拥有所有权限' : i === 1 ? '管理课程和学生' : i === 2 ? '查看和管理自己的课程' : '仅查看公开信息'}</p></div></div>
                    <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-lg border border-gray-200">{i === 0 ? '4 人' : i === 1 ? '12 人' : i === 2 ? '186 人' : '52 人'}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === '数据管理' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left glow-hover"><Database size={20} className="text-primary-600 mb-2" /><p className="text-sm font-medium text-gray-900">数据备份</p><p className="text-xs text-gray-500 mt-1">上次备份: 2024年6月20日</p></button>
                <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left glow-hover"><Check size={20} className="text-emerald-600 mb-2" /><p className="text-sm font-medium text-gray-900">导出数据</p><p className="text-xs text-gray-500 mt-1">导出为 CSV / Excel 格式</p></button>
                <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left glow-hover"><Save size={20} className="text-purple-600 mb-2" /><p className="text-sm font-medium text-gray-900">导入数据</p><p className="text-xs text-gray-500 mt-1">从文件批量导入</p></button>
                <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left glow-red"><X size={20} className="text-red-600 mb-2" /><p className="text-sm font-medium text-gray-900">清除缓存</p><p className="text-xs text-gray-500 mt-1">释放存储空间</p></button>
              </div>
            )}

            {activeTab === '系统配置' && (
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">系统名称</label><input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">系统地址</label><input type="text" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" /></div>
                <div className="flex items-center justify-between py-3 border-t border-gray-50"><div><p className="text-sm font-medium text-gray-900">维护模式</p><p className="text-xs text-gray-500 mt-0.5">开启后将暂停对外服务</p></div><button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors glow-hover">关闭</button></div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <button onClick={() => setActiveTab(null)} className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">取消</button>
            <button onClick={handleSave} className="px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2"><Save size={16} />保存设置</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {settingsGroups.map((group) => {
            const Icon = group.icon
            return (
              <button key={group.label} onClick={() => setActiveTab(group.label)} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300 cursor-pointer group text-left card-glow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-primary-50 transition-colors"><Icon size={22} className="text-gray-500 group-hover:text-primary-600 transition-colors" /></div>
                  <div className="flex-1"><h4 className="text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">{group.label}</h4><p className="text-sm text-gray-500 mt-1">{group.desc}</p></div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SettingsPage
