const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateInput = (name, email, password) => {
  const errors = [];
  
  if (name && (typeof name !== 'string' || name.trim().length < 2)) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (email && !validateEmail(email)) {
    errors.push('Please provide a valid email address');
  }
  
  if (password && password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  return errors;
};

module.exports = {
  validateEmail,
  validateInput
};