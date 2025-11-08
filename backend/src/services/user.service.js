const prisma = require("../../prisma/client");
const bcrypt = require("bcrypt");
const { status } = require("http-status");
const ApiError = require("../utils/ApiError");

const createUser = async (payload) => {
  const password = await bcrypt.hash(payload.password, 10); 

  const user = await prisma.user.create({
    data: {...payload, password}
  });

  return user;
}

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
}

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if(!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  return user;
}

const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  return user;
}

const updateUser = async (userId, payload) => {
  await getUserById(userId);
  
  if(payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: payload
  });

  return updatedUser;
}

const deleteUser = async (userId) => {
  await getUserById(userId);

  await prisma.user.delete({
    where: {
      id: userId
    }
  });
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
}