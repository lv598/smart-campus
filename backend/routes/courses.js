const express = require('express')
const { success, error } = require('../utils/response')
const db = require('../db')
const auth = require('../middleware/auth')
const router = express.Router()

router.use(auth)

// GET /api/courses
router.get('/', (req, res) => {
  const courses = db.prepare('SELECT * FROM courses ORDER BY code').all()
  success(res, courses)
})

// POST /api/courses
router.post('/', (req, res) => {
  const { code, name, teacher, credits, students, status } = req.body
  if (!code || !name || !teacher) return error(res, '课程代码、名称和教师不能为空')

  try {
    db.prepare(
      'INSERT INTO courses (code, name, teacher, credits, students, status) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(code, name, teacher, credits || 3, students || 0, status || '待开课')
    success(res, { code, name }, '添加成功', 201)
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') return error(res, '课程代码已存在', 409)
    throw err
  }
})

module.exports = router
