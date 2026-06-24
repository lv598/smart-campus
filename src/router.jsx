import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import App from './App'
import LoginPage from './components/LoginPage'
import Dashboard from './pages/Dashboard'
import Academics from './pages/Academics'
import Schedule from './pages/Schedule'
import Students from './pages/Students'
import Library from './pages/Library'
import Canteen from './pages/Canteen'
import Dormitory from './pages/Dormitory'
import Settings from './pages/Settings'

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-gray-200">404</p>
      <h2 className="text-xl font-semibold text-gray-700 mt-4">页面未找到</h2>
      <p className="text-sm text-gray-500 mt-2">您访问的页面不存在</p>
      <button
        onClick={() => window.location.href = '/'}
        className="mt-6 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors"
      >
        返回首页
      </button>
    </div>
  )
}

// Protected route wrapper
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/students" element={<Students />} />
          <Route path="/library" element={<Library />} />
          <Route path="/canteen" element={<Canteen />} />
          <Route path="/dormitory" element={<Dormitory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
