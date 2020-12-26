const bcrypt = require("bcrypt");
const auth = require("../../../auth");
const TABLA = "auth";
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/mysql");
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });

    return bcrypt.compare(password, data.password).then((areEqual) => {
      if (areEqual == true) {
        return auth.sign(data);
      } else {
        throw new Error("Invalid Information");
      }
    });
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }
    return store.upsert(TABLA, authData);
  }

  return {
    upsert,
    login,
  };
};
