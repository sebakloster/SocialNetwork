const jwt = require("jsonwebtoken");
const config = require("../config");
const secret = config.jwt.secret;
function sign(data) {
  return jwt.sign(data, secret);
}
const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    if (decoded.id !== owner) {
      throw new Error("You cant do this");
    }
  },
};

function verify(token) {
  return jwt.verify(token, secret);
}

function getToken(auth) {
  if (!auth) {
    throw new Error("There is no token");
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
