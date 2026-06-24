const express = require('express')
const { success, error } = require('../utils/response')
const db = require('../db')
const auth = require('../middleware/auth')
const router = express.Router()

router.use(auth)

// GET /api/students - list with search & filter
router.get('/', (req, res) => {
  const { search, status } = req.query
  let sql = 'SELECT * FROM students WHERE 1=1'
  const params = []

  if (search) {
    sql += ' AND (name LIKE ? OR id LIKE ? OR major LIKE ?)'
    const s = `%${search}%`
    params.push(s, s, s)
  }
  if (status && status !== 'all') {
    sql += ' AND status = ?'
    params.push(status)
  }

  const students = db.prepare(sql).all(...params)
  success(res, students)
})

// GET /api/students/:id
router.get('/:id', (req, res) => {
  const student = db.prepare('SELECT * FROM students WHERE id = ?').get(req.params.id)
  if (!student) return error(res, '学生不存在', 404)
  success(res, student)
})

// POST /api/students
router.post('/', (req, res) => {
  const { name, id, gender, major, grade, email, phone } = req.body
  if (!name || !id || !major) return error(res, '姓名、学号和专业不能为空')

  try {
    db.prepare(
      'INSERT INTO students (id, name, gender, major, grade, email, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(id, name, gender || '男', major, grade || '2024级', email || '', phone || '', '在读')
    success(res, { id, name }, '添加成功', 201)
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return error(res, '学号已存在', 409)
    }
    throw err
  }
})

// PUT /api/students/:id
router.put('/:id', (req, res) => {
  const { name, gender, major, grade, email, phone, status } = req.body
  const existing = db.prepare('SELECT * FROM students WHERE id = ?').get(req.params.id)
  if (!existing) return error(res, '学生不存在', 404)

  db.prepare(
    'UPDATE students SET name=?, gender=?, major=?, grade=?, email=?, phone=?, status=?, updated_at=datetime(\'now\') WHERE id=?'
  ).run(name, gender, major, grade, email, phone, status, req.params.id)

  success(res, { id: req.params.id, name }, '修改成功')
})

// DELETE /api/students/:id
router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM students WHERE id = ?').get(req.params.id)
  if (!existing) return error(res, '学生不存在', 404)

  db.prepare('DELETE FROM students WHERE id = ?').run(req.params.id)
  success(res, null, '删除成功')
})

module.exports = router
