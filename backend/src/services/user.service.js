const prisma = require("../../prisma/client");
const bcrypt = require("bcrypt");

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

module.exports = {
  createUser,
  getAllUsers
}