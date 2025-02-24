import express = require("express");
const config = require("../src/config/config.json");
import  routes from '../src/routes/Routes'
import { RequestLogRepository } from "../src/repository/request_log/RequestLogRepository";
import { RequestContextLoggerMiddleware } from "./middleware/Request-logger.middleware";

const app = express();
const port = config.server_port;
const requestLogRepository = new RequestLogRepository();
const middlewareInstance = new RequestContextLoggerMiddleware(requestLogRepository)

app.use(express.json());

app.use(middlewareInstance.use.bind(middlewareInstance));

app.use(routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
