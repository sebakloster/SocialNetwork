const remote = require("./remote");
const config = require("../config");

module.exports = new remote(config.cache.host, config.cache.port);
