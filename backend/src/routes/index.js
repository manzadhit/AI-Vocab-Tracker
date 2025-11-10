const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const aiRoute = require("./ai.route");

const defaultRouter = [
  {
    path: "/auth",
    route: authRoute
  },
  {
    path: "/users",
    route: userRoute
  },
  {
    path: "/ai",
    route: aiRoute
  }
]

defaultRouter.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

