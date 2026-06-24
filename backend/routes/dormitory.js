const express = require('express')
const { success, error } = require('../utils/response')
const db = require('../db')
const auth = require('../middleware/auth')
const router = express.Router()

// GET /api/dormitory/buildings
router.get('/buildings', auth, (req, res) => {
  const buildings = db.prepare('SELECT * FROM buildings ORDER BY type, name').all()
  success(res, buildings)
})

// GET /api/dormitory/repairs
router.get('/repairs', auth, (req, res) => {
  const repairs = db.prepare(`
    SELECT r.*, b.name as building_name
    FROM repair_requests r
    JOIN buildings b ON r.building_id = b.id
    ORDER BY r.created_at DESC
  `).all()
  success(res, repairs)
})

// POST /api/dormitory/repairs
router.post('/repairs', auth, (req, res) => {
  const { building_id, room, category, description } = req.body
  if (!building_id || !category || !description) return error(res, '参数不完整')

  db.prepare(
    'INSERT INTO repair_requests (building_id, room, category, description, status, time) VALUES (?, ?, ?, ?, ?, datetime(\'now\'))'
  ).run(building_id, room || '', category, description, '待处理')

  success(res, null, '报修提交成功', 201)
})

module.exports = router
