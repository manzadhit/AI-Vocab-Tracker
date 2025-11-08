const app = require('./app');
const logger = require("./src/configs/logger");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info("Server is running on http://localhost:" + PORT);
});