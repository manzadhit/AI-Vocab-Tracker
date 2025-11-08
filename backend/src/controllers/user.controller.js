const { status } = require("http-status");
const userService = require("../services/user.service");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const createUser = async (req, res, next) => {
  try {
    const payload = req.body;

    const existingUser = await userService.getUserByEmail(payload.email);

    if(existingUser) {
      throw new ApiError(status.BAD_REQUEST, "Email already taken");
    }

    const user = await userService.createUser(payload);

    res.status(status.CREATED).send({
      status: status.CREATED,
      message: "Successfully create User",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await userService.getAllUsers();
    
    res.status(status.OK).send({
      status: status.OK,
      message: "Successfully get all users",
      data: allUsers
    })
  } catch (error) {
    next(error);
  }
}

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await userService.getUserById(userId);

  res.status(status.OK).send({
    status: status.OK,
    message: "Successfully get user by id",
    data: user,
  })
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const userUpdated = await userService.updateUser(userId, req.body);

  res.status(status.OK).send({
    status: status.OK,
    message: "Successfully update user",
    data: userUpdated,
  })
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await userService.deleteUser(userId);

  res.status(status.NO_CONTENT).end()
})

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
