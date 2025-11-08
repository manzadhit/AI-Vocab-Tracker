const userService = require("../services/user.service")
const authService = require("../services/auth.service")
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { default: status } = require("http-status");

const register = catchAsync( async (req, res) => {
  const existingUser = await userService.getUserByEmail(req.body.email);

  if(existingUser) {
    throw new ApiError(status.BAD_REQUEST, "Email already taken");
  }

  const userCreated = await userService.createUser(req.body);
  
  res.status(status.CREATED).send({
    status: status.CREATED,
    message: "Successfully registered",
    data: userCreated
  });
});

const login = catchAsync(async (req, res) => {  
  const { email, password } = req.body;
  const user = await authService.loginWithEmailAndPassword(email, password);

  res.status(status.OK).send({
    status: status.OK,
    message: "Successfully login",
    data: user
  });
});

module.exports = {
  register, login
}