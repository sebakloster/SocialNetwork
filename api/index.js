const express = require("express");
const swaggerUi = require("swagger-ui-express");
const config = require("../config.js");
const user = require("./components/users/network");
const auth = require("./components/auth/network");
const errors = require("../network/errors");
const app = express();

//Routes

app.use("/api/user", user);
const swaggerDoc = require("./swagger.json");
app.use("/api/auth", auth);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto: ", config.api.port);
});
