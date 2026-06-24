const express = require('express')
const { success } = require('../utils/response')
const db = require('../db')
const router = express.Router()

// GET /api/library/books
router.get('/', (req, res) => {
  const { search } = req.query
  let sql = 'SELECT * FROM books WHERE 1=1'
  const params = []

  if (search) {
    sql += ' AND (title LIKE ? OR author LIKE ?)'
    const s = `%${search}%`
    params.push(s, s)
  }

  const books = db.prepare(sql).all(...params)
  success(res, books)
})

module.exports = router
