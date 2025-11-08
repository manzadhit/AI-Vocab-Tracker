const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");

const defaultRouter = [
  {
    path: "/users",
    route: userRoute
  }
]

defaultRouter.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

