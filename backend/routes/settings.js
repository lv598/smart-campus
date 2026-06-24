const express = require('express')
const { success, error } = require('../utils/response')
const db = require('../db')
const auth = require('../middleware/auth')
const router = express.Router()

router.use(auth)

// GET /api/settings
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM settings').all()
  const settings = {}
  for (const row of rows) {
    settings[row.key] = row.value
  }
  success(res, settings)
})

// PUT /api/settings
router.put('/', (req, res) => {
  const { settings } = req.body
  if (!settings || typeof settings !== 'object') return error(res, '参数格式错误')

  const keys = Object.keys(settings)
  for (const key of keys) {
    db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, String(settings[key]))
  }
  success(res, null, '保存成功')
})

module.exports = router
