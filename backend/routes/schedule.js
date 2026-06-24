const express = require('express')
const { success } = require('../utils/response')
const db = require('../db')
const router = express.Router()

// GET /api/schedule - returns schedule grouped by day
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM schedule ORDER BY day, time').all()

  const schedule = {}
  const dayNames = ['周一', '周二', '周三', '周四', '周五']
  for (let i = 0; i < 5; i++) {
    schedule[dayNames[i]] = []
  }

  for (const row of rows) {
    const dayNamesArr = ['周一', '周二', '周三', '周四', '周五']
    const dayName = dayNamesArr[row.day]
    schedule[dayName].push({
      time: row.time,
      course_code: row.course_code,
      room: row.room,
      color: row.color
    })
  }

  success(res, schedule)
})

module.exports = router
