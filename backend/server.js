require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const errorHandler = require('./middleware/errorHandler')

// Import routes
const authRoutes = require('./routes/auth')
const dashboardRoutes = require('./routes/dashboard')
const studentsRoutes = require('./routes/students')
const coursesRoutes = require('./routes/courses')
const scheduleRoutes = require('./routes/schedule')
const libraryRoutes = require('./routes/library')
const canteenRoutes = require('./routes/canteen')
const dormitoryRoutes = require('./routes/dormitory')
const settingsRoutes = require('./routes/settings')

const app = express()
const PORT = process.env.PORT || 3001

// CORS - allow frontend origins
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://smart-campus-61w.pages.dev']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))

app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/students', studentsRoutes)
app.use('/api/courses', coursesRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/library', libraryRoutes)
app.use('/api/canteen', canteenRoutes)
app.use('/api/dormitory', dormitoryRoutes)
app.use('/api/settings', settingsRoutes)

// Error handler
app.use(errorHandler)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})

module.exports = app
