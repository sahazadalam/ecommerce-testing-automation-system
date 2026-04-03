export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.length >= 2;
};

export const validateCardNumber = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  return /^\d{16}$/.test(cleanNumber);
};

export const validateExpiryDate = (expiryDate) => {
  const re = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!re.test(expiryDate)) return false;
  
  const [month, year] = expiryDate.split('/');
  const expiry = new Date(2000 + parseInt(year), parseInt(month), 1);
  const now = new Date();
  
  return expiry > now;
};

export const validateCVV = (cvv) => {
  return /^\d{3}$/.test(cvv);
};