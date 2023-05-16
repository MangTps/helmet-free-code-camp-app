const express = require("express");
const app = express();
const helmet = require("helmet");
app.use(helmet());
app.use(helmet.hidePoweredBy());
module.exports = app;
const api = require("./server.js");
app.use(express.static("public"));
app.disable("strict-transport-security");
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter({}));
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use("/_api", api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`🍢 Infomation Security App started on port ${port}`);
});
