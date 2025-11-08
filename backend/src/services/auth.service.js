const bcrypt = require("bcrypt");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const { default: status } = require("http-status");

const loginWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid email or password");
  }

  const validatedPassword = await bcrypt.compare(password, user.password);

  if (!validatedPassword) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid email or password");
  }

  return user;
};

module.exports = {
  loginWithEmailAndPassword,
};
