const express = require('express')
const { success, error } = require('../utils/response')
const db = require('../db')
const auth = require('../middleware/auth')
const router = express.Router()

// GET /api/canteen/menus
router.get('/menus', (req, res) => {
  const floors = db.prepare('SELECT * FROM menu_floors ORDER BY id').all()
  const result = floors.map(floor => {
    const dishes = db.prepare('SELECT * FROM menu_dishes WHERE floor_id = ?').all(floor.id)
    return { ...floor, dishes }
  })
  success(res, result)
})

// GET /api/canteen/transactions
router.get('/transactions', auth, (req, res) => {
  const txns = db.prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY time DESC LIMIT 20").all(req.user.id)
  success(res, txns)
})

// POST /api/canteen/transactions
router.post('/transactions', auth, (req, res) => {
  const { type, desc, amount } = req.body
  if (!type || !desc || amount === undefined) return error(res, '参数不完整')

  db.prepare('INSERT INTO transactions (user_id, type, desc, amount, time) VALUES (?, ?, ?, ?, datetime(\'now\'))')
    .run(req.user.id, type, desc, amount)
  success(res, null, '记录成功', 201)
})

module.exports = router
