const { nanoid } = require("nanoid");
const auth = require("../auth");
const TABLE = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }
  function list() {
    return store.list(TABLE);
  }
  function get(id) {
    return store.get(TABLE, id);
  }
  function remove(id) {
    return store.remove(TABLE, id);
  }
  async function create(data) {
    const user = {
      name: data.name,
      username: data.username,
    };

    if (data.id && !isNaN(data.id)) {
      user.id = data.id;
    } else {
      user.id = nanoid();
    }

    if (data.password || data.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: data.password,
      });
    }

    return store.upsert(TABLE, user);
  }
  return {
    list,
    get,
    remove,
    create,
  };
};
