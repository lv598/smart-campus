const express = require('express')
const { success } = require('../utils/response')
const db = require('../db')
const router = express.Router()

// GET /api/dashboard/stats
router.get('/stats', (req, res) => {
  const studentCount = db.prepare('SELECT COUNT(*) as count FROM students').get().count
  const courseCount = db.prepare('SELECT COUNT(*) as count FROM courses').get().count

  success(res, {
    totalStudents: 12846,
    totalTeachers: 1258,
    attendanceRate: 96.8,
    totalCourses: courseCount
  })
})

// GET /api/dashboard/attendance
router.get('/attendance', (req, res) => {
  const range = req.query.range || 'weekly'
  const data = {
    weekly: [
      { day: '周一', 出勤: 97, 迟到: 2, 缺勤: 1 },
      { day: '周二', 出勤: 95, 迟到: 3, 缺勤: 2 },
      { day: '周三', 出勤: 96, 迟到: 2, 缺勤: 2 },
      { day: '周四', 出勤: 98, 迟到: 1, 缺勤: 1 },
      { day: '周五', 出勤: 94, 迟到: 4, 缺勤: 2 }
    ],
    monthly: [
      { week: '第1周', 出勤: 96, 迟到: 2, 缺勤: 2 },
      { week: '第2周', 出勤: 97, 迟到: 2, 缺勤: 1 },
      { week: '第3周', 出勤: 95, 迟到: 3, 缺勤: 2 },
      { week: '第4周', 出勤: 98, 迟到: 1, 缺勤: 1 }
    ],
    semester: [
      { month: '9月', 出勤: 96, 迟到: 2, 缺勤: 2 },
      { month: '10月', 出勤: 97, 迟到: 2, 缺勤: 1 },
      { month: '11月', 出勤: 95, 迟到: 3, 缺勤: 2 },
      { month: '12月', 出勤: 94, 迟到: 4, 缺勤: 2 },
      { month: '1月', 出勤: 98, 迟到: 1, 缺勤: 1 },
      { month: '2月', 出勤: 97, 迟到: 2, 缺勤: 1 }
    ],
    yearly: [
      { year: '2020', 出勤: 94, 迟到: 4, 缺勤: 2 },
      { year: '2021', 出勤: 95, 迟到: 3, 缺勤: 2 },
      { year: '2022', 出勤: 96, 迟到: 2, 缺勤: 2 },
      { year: '2023', 出勤: 97, 迟到: 2, 缺勤: 1 },
      { year: '2024', 出勤: 97, 迟到: 2, 缺勤: 1 }
    ]
  }
  success(res, data[range] || data.weekly)
})

// GET /api/dashboard/majors
router.get('/majors', (req, res) => {
  const majors = db.prepare('SELECT major, COUNT(*) as count FROM students GROUP BY major').all()
  const defaultData = [
    { name: '计算机科学', value: 3200 },
    { name: '机械工程', value: 2800 },
    { name: '经济管理', value: 2400 },
    { name: '艺术设计', value: 1800 },
    { name: '其他专业', value: 2646 }
  ]
  const data = majors.length > 0
    ? majors.map(m => ({ name: m.major, value: m.count }))
    : defaultData
  success(res, data)
})

// GET /api/dashboard/enrollment
router.get('/enrollment', (req, res) => {
  const data = [
    { year: '2020', count: 10200 },
    { year: '2021', count: 10800 },
    { year: '2022', count: 11500 },
    { year: '2023', count: 12200 },
    { year: '2024', count: 12846 }
  ]
  success(res, data)
})

// GET /api/dashboard/activities
router.get('/activities', (req, res) => {
  const activities = [
    { title: '期末考试安排已发布', desc: '2024-2025学年第一学期期末考试将于1月10日开始', time: '2小时前', type: 'exam' },
    { title: '图书馆系统升级维护通知', desc: '将于本周六凌晨2:00-6:00进行系统升级', time: '5小时前', type: 'notice' },
    { title: '2024春季学期选课即将开始', desc: '请同学们提前准备好选课计划', time: '1天前', type: 'course' },
    { title: '校园运动会报名截止提醒', desc: '请于本周五前完成报名', time: '1天前', type: 'event' },
    { title: '论文答辩通知', desc: '2024届毕业论文答辩将于6月15日进行', time: '2天前', type: 'thesis' }
  ]
  success(res, activities)
})

module.exports = router
