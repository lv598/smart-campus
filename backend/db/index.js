const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')
const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8')

const dbPath = path.join(__dirname, '..', process.env.DB_PATH || 'data/campus.db')

// Ensure data directory exists
const dataDir = path.dirname(dbPath)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const db = new Database(dbPath)

// Enable WAL mode for better concurrent performance
db.pragma('journal_mode = WAL')

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Only initialize schema if the users table doesn't exist
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").all()
if (tables.length === 0) {
  db.exec(sql)
  console.log('Database initialized with schema and seed data')
} else {
  console.log('Database already exists, skipping initialization')
}

console.log('Connected to:', dbPath)

module.exports = db
