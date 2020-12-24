const jwt = require("jsonwebtoken");
const config = require("../config");
const secret = config.jwt.secret;
const error = require("../utils/error");
function sign(data) {
  return jwt.sign(data, secret);
}
const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    if (decoded.id !== owner) {
      throw error("You cant do this", 401);
    }
  },
};

function verify(token) {
  return jwt.verify(token, secret);
}

function getToken(auth) {
  if (!auth) {
    throw error("There is no Token", 500);
  }
  console.log(auth);
  let token = auth.replace("Bearer ", "");
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
};
