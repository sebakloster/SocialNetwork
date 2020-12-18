const nanoid = require("nanoid");
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
  function create(data) {
    const user = {
      name: data.name,
    };

    if (data.id && !isNaN(data.id)) {
      user.id = data.id;
    } else {
      user.id = nanoid();
    }

    return store.upsert(TABLE, data);
  }
  return {
    list,
    get,
    remove,
    create,
  };
};
