const express = require("express");
const app = express();
const { status } = require("http-status");
const router = require("./src/routes");
const morgan = require("./src/configs/morgan");
const ApiError = require("./src/utils/ApiError");
const { errorConverter, errorHandler } = require("./src/middlewares/error");

app.use(morgan.succesHandler);
app.use(morgan.errorHandler);

// parsing json
app.use(express.json());

// urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// send 404 if route not found
app.use((req, res, next) => {
  next(new ApiError(status.NOT_FOUND, "Api not found"));
})

// errorConverter
app.use(errorConverter);

// errorHandler
app.use(errorHandler);

module.exports = app;
