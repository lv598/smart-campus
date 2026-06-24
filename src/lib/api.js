const API_BASE = '/api'

async function request(url, options = {}) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(API_BASE + url, {
    ...options,
    headers
  })

  const data = await res.json()

  if (!data.success) {
    if (res.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    throw new Error(data.error || '请求失败')
  }

  return data
}

// Auth
export const auth = {
  login: (username, password) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  }),
  logout: () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  },
  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload
    } catch {
      return null
    }
  }
}

// Dashboard
export const dashboard = {
  stats: () => request('/dashboard/stats'),
  attendance: (range) => request(`/dashboard/attendance?range=${range || 'weekly'}`),
  majors: () => request('/dashboard/majors'),
  enrollment: () => request('/dashboard/enrollment'),
  activities: () => request('/dashboard/activities')
}

// Students
export const students = {
  list: (search, status) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (status) params.set('status', status)
    return request(`/students?${params}`)
  },
  get: (id) => request(`/students/${id}`),
  add: (data) => request('/students', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/students/${id}`, { method: 'DELETE' })
}

// Courses
export const courses = {
  list: () => request('/courses'),
  add: (data) => request('/courses', { method: 'POST', body: JSON.stringify(data) })
}

// Schedule
export const schedule = {
  list: () => request('/schedule')
}

// Library
export const library = {
  list: (search) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    return request(`/library/books?${params}`)
  }
}

// Canteen
export const canteen = {
  menus: () => request('/canteen/menus'),
  transactions: () => request('/canteen/transactions'),
  addTransaction: (data) => request('/canteen/transactions', { method: 'POST', body: JSON.stringify(data) })
}

// Dormitory
export const dormitory = {
  buildings: () => request('/dormitory/buildings'),
  repairs: () => request('/dormitory/repairs'),
  addRepair: (data) => request('/dormitory/repairs', { method: 'POST', body: JSON.stringify(data) })
}

// Settings
export const settings = {
  get: () => request('/settings'),
  update: (data) => request('/settings', { method: 'PUT', body: JSON.stringify({ settings: data }) })
}
