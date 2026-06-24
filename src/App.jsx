import React, { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Users,
  Library,
  UtensilsCrossed,
  Building2,
  Bell,
  Search,
  Menu,
  X,
  GraduationCap,
  Settings,
  LogOut,
  ChevronDown,
  User,
  Check,
  X as XIcon,
  AlertCircle,
} from 'lucide-react'

const sidebarItems = [
  { icon: LayoutDashboard, label: '数据看板', path: '/' },
  { icon: BookOpen, label: '教务管理', path: '/academics' },
  { icon: Calendar, label: '课程表', path: '/schedule' },
  { icon: Users, label: '学生管理', path: '/students' },
  { icon: Library, label: '图书馆', path: '/library' },
  { icon: UtensilsCrossed, label: '餐饮服务', path: '/canteen' },
  { icon: Building2, label: '宿舍管理', path: '/dormitory' },
  { icon: Settings, label: '系统设置', path: '/settings' },
]

const notifications = [
  { id: 1, title: '期末考试安排已发布', time: '2小时前', read: false },
  { id: 2, title: '图书馆系统升级维护通知', time: '5小时前', read: false },
  { id: 3, title: '2024春季学期选课即将开始', time: '1天前', read: true },
  { id: 4, title: '校园运动会报名截止提醒', time: '1天前', read: true },
]

const searchSuggestions = [
  { id: 1, title: '数据结构与算法', type: '课程', path: '/academics' },
  { id: 2, title: '操作系统', type: '课程', path: '/academics' },
  { id: 3, title: '李明', type: '学生', path: '/students' },
  { id: 4, title: '王芳', type: '学生', path: '/students' },
  { id: 5, title: '期末考试安排', type: '通知', path: '/' },
]

// Toast notification component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-gray-800'

  return (
    <div className={`fixed top-20 right-4 z-[100] ${bgColor} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-in`}>
      {type === 'success' && <Check size={16} />}
      {type === 'error' && <XIcon size={16} />}
      {type === 'info' && <AlertCircle size={16} />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition-opacity">
        <XIcon size={14} />
      </button>
    </div>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen')
    return saved !== null ? JSON.parse(saved) : true
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [toasts, setToasts] = useState([])
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length)
  const location = useLocation()

  const notifRef = useRef(null)
  const profileRef = useRef(null)
  const searchRef = useRef(null)

  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  // Persist sidebar state
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen))
  }, [sidebarOpen])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        setNotificationOpen(false)
        setProfileOpen(false)
        setSearchOpen(false)
      }
    }
    if (mobileMenuOpen || notificationOpen || profileOpen || searchOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen, notificationOpen, profileOpen, searchOpen])

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotificationOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const filteredSuggestions = searchQuery.length > 0
    ? searchSuggestions.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : searchSuggestions.slice(0, 3)

  const handleNavigate = (path) => {
    setSearchQuery('')
    setSearchOpen(false)
    // Navigate via window location (works within BrowserRouter)
    window.location.href = path
  }

  const markAllRead = () => {
    setUnreadCount(0)
    addToast('所有通知已标为已读', 'success')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Container */}
      {toasts.map(toast => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
      ))}

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left: Logo & Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 glow-hover"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 glow-hover"
            >
              <Menu size={20} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-300">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 hidden sm:block">
                智慧校园
              </span>
            </Link>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative" ref={searchRef}>
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="搜索课程、学生、通知..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setSearchOpen(true)
                }}
                onFocus={() => setSearchOpen(true)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-xl text-sm
                  placeholder-gray-400 text-gray-700
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white
                  transition-all duration-200"
              />
              {searchOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                  {filteredSuggestions.length > 0 ? (
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs font-medium text-gray-400 bg-gray-50">
                        搜索结果
                      </div>
                      {filteredSuggestions.map(s => (
                        <button
                          key={s.id}
                          onClick={() => handleNavigate(s.path)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                        >
                          <Search size={14} className="text-gray-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-700 truncate">{s.title}</p>
                            <p className="text-xs text-gray-400">{s.type}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-400">
                      未找到相关结果
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                aria-label="通知"
                onClick={() => { setNotificationOpen(!notificationOpen); setProfileOpen(false) }}
                className="relative p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 glow-hover"
              >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              {notificationOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">通知</h3>
                    <button onClick={markAllRead} className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                      全部标为已读
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-2 ${
                          n.read ? 'border-l-transparent' : 'border-l-primary-500 bg-primary-50/30'
                        }`}
                        onClick={() => {
                          if (!n.read) setUnreadCount(prev => prev - 1)
                        }}
                      >
                        <p className="text-sm text-gray-700 font-medium">{n.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotificationOpen(false) }}
                className="flex items-center gap-2 pl-2 ml-2 border-l border-gray-200 cursor-pointer hover:bg-gray-50 rounded-xl p-1.5 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">管</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">管理员</p>
                  <p className="text-xs text-gray-500">教务处</p>
                </div>
                <ChevronDown size={14} className={`text-gray-400 hidden sm:block transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">管理员</p>
                    <p className="text-xs text-gray-500">教务处 admin@campus.edu</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User size={16} />
                      个人中心
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings size={16} />
                      账号设置
                    </button>
                  </div>
                  <div className="py-2 border-t border-gray-100">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut size={16} />
                      退出登录
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-300">
                  <GraduationCap size={20} className="text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">智慧校园</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 shadow-md glow-primary'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 glow-hover'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="p-3 mt-4 border-t border-gray-100">
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-300 glow-hover">
                <LogOut size={18} />
                退出登录
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className={`fixed top-16 left-0 bottom-0 z-30 bg-white border-r border-gray-200
            transition-all duration-300 ease-in-out overflow-hidden
            ${sidebarOpen ? 'w-60' : 'w-20'}`}
        >
          <nav className="p-3 space-y-1 mt-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                    ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 shadow-md glow-primary'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 glow-hover'
                    }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 min-h-screen pt-16 transition-all duration-300 ease-in-out
            ${sidebarOpen ? 'lg:ml-60' : 'lg:ml-20'}`}
        >
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
