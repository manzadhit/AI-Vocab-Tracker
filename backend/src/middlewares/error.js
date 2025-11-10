const { default: status } = require("http-status");
const ApiError = require("../utils/ApiError");
const logger = require("../configs/logger");
const config = require("../configs/config");
const { Prisma } = require("@prisma/client");

const handlePrismaError = (err) => {
  switch (err.code) {
    case "P2002":
      return new ApiError(400, `Duplicate field value: ${err.meta?.target}`, false, err.stack);
    case "P2014":
      return new ApiError(400, `Invalid ID: ${err.meta?.target}`, false, err.stack);
    case "P2003":
      return new ApiError(400, `Invalid input data: ${err.meta?.target}`, false, err.stack);
    default:
      return new ApiError(500, `Something went wrong: ${err.meta?.target || "unknown"}`, false, err.stack);
  }
};

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    if (error.response) {
      const message = err.response.data.message || err.response.data;
      const statusCode = err.response.status || status.BAD_REQUEST;

      logger.info("HandleAxiosError");
      error = new ApiError(statusCode, message, false, err.stack);

    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      logger.info("HandlePrismaError");
      error = handlePrismaError(err);

    } else {
      const statusCode = err.statusCode || err.status || status.INTERNAL_SERVER_ERROR;
      const message = err.message || status[statusCode];
      error = new ApiError(statusCode, message, false, err.stack);
    }
  }

  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (config.env === "production" && !err.isOperational) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = status[status.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = { errorConverter, errorHandler };
