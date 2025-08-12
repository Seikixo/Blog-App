const rateLimit = require('express-rate-limit');

const reactionLimiter = rateLimit({
  windowMs: 300 * 1000, 
  max: 30,             
  message: 'Too many reactions. Please wait and try again later.',
  keyGenerator: (req) => req.user.id, 
});

const postLimiter = rateLimit({
  windowMs: 300 * 1000,
  max: 5,
  message: 'Too many post. Please wait and try again later.',
  keyGenerator: (req) => req.user.id,
})

module.exports = { reactionLimiter, postLimiter }
