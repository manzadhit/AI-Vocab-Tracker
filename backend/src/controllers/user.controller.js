const { status } = require("http-status");
const userService = require("../services/user.service");

const createUser = async (req, res, next) => {
  try {
    const payload = req.body;

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

module.exports = {
  createUser,
  getAllUsers
}
