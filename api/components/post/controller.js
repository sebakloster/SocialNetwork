const { nanoid } = require("nanoid");
const TABLE = "post";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/mysql");
  }
  function list() {
    return store.list(TABLE);
  }

  async function upsert(data) {
    const post = {
      text: data.text,
      user: data.user,
    };

    if (data.id) {
      post.id = data.id;
    } else {
      post.id = nanoid();
    }

    return store.upsert(TABLE, post);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  return {
    list,
    upsert,
    get,
  };
};
