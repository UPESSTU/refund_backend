const { default: rateLimit } = require("express-rate-limit")

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 24 hrs in milliseconds
  max: 100,
  message: 'You have exceeded the 100 requests in 1 minute limit!', 
  standardHeaders: true,
  legacyHeaders: false
})

module.exports = rateLimiter