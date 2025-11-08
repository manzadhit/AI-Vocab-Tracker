const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const authRoute = require("./auth.route");

const defaultRouter = [
  {
    path: "/auth",
    route: authRoute
  },
  {
    path: "/users",
    route: userRoute
  }
]

defaultRouter.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

