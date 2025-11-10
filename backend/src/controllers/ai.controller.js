const { default: status } = require("http-status");
const aiService = require("../services/ai.service");
const catchAsync = require("../utils/catchAsync");
const logger = require("../configs/logger");

const createWordDetails = catchAsync(async (req, res) => {
  const { word, userId } = req.body;
  const wordDetails = await aiService.generateWordDetails(word);

  const saved = await aiService.saveDetailToDatabase(wordDetails, userId)

  res.status(status.CREATED).send({
    status: status.CREATED,
    message: "Successfully create word details",
    data: saved
  });
});

module.exports = {
  createWordDetails
}
