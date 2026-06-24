/**
 * Standardized API response helper
 */

function success(res, data, message = 'success', status = 200) {
  return res.status(status).json({
    success: true,
    data,
    message
  })
}

function error(res, message, status = 400, code = null) {
  return res.status(status).json({
    success: false,
    error: message,
    code
  })
}

module.exports = { success, error }
