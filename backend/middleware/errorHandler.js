function errorHandler(err, req, res, next) {
  console.error('Error:', err)

  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({ success: false, error: '数据重复，请检查后重试' })
  }

  if (err.code === 'ERR_ASSERTION' || err.message?.includes('NOT NULL')) {
    return res.status(400).json({ success: false, error: '必填字段缺失' })
  }

  res.status(500).json({ success: false, error: '服务器内部错误' })
}

module.exports = errorHandler
