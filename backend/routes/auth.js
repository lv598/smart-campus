const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { success, error } = require('../utils/response')
const db = require('../db')
const router = express.Router()

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return error(res, '用户名和密码不能为空')
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)

  if (!user) {
    return error(res, '用户名或密码错误', 401)
  }

  const valid = bcrypt.compareSync(password, user.password)
  if (!valid) {
    return error(res, '用户名或密码错误', 401)
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  success(res, {
    token,
    user: { id: user.id, username: user.username, role: user.role, name: user.name }
  }, '登录成功')
})

// GET /api/auth/me
router.get('/me', (req, res) => {
  const user = db.prepare('SELECT id, username, role, name, email, phone FROM users WHERE id = ?').get(req.user.id)
  if (!user) return error(res, '用户不存在', 404)
  success(res, user)
})

module.exports = router
