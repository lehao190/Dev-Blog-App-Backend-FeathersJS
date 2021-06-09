// Check for invalid inputs
module.exports.validateLogin = (email, password) => {
  const errors = {}

  if (email.trim() === '') {
    errors.email = 'Email còn trống !'
  } else {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!email.match(regEx)) {
      errors.email = 'Email không hợp lệ !'
    }
  }

  if (password.trim() === '') {
    errors.password = 'Password còn trống !'
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1
  }
}

module.exports.validateRegister = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {}

  if (username.trim() === '') {
    errors.username = 'Tên đăng nhập còn trống !'
  }

  if (email.trim() === '') {
    errors.email = 'Email còn trống !'
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/

    if (!email.match(regEx)) {
      errors.email = 'Email không hợp lệ !'
    }
  }

  if (password === '') {
    errors.password = 'Password còn trống !'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Password chưa trùng khớp !'
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1
  }
}
