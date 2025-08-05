const rateLimit = require('express-rate-limit');

const reactionLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,             
  message: 'Too many reactions. Please wait and try again later.',
  keyGenerator: (req) => req.user.id, 
});

module.exports = { reactionLimiter }