const db = {
  user: [{ id: 1, name: "seba" }],
};

async function list(table) {
  return db[table] || [];
}
async function get(table, id) {
  let col = await list(table);
  return col.find((item) => item.id == id) || null;
}
async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
}

async function remove(table, id) {
  if (!db.user.find((item) => item.id == id)) {
    return "Invalid User id";
  } else {
    db.user.pop(id);
    return `User ${id} deleted`;
  }
}

async function query(table, query) {
  let col = await list(table);
  let keys = Object.keys(query);
  let key = keys[0];
  return col.find((item) => item[keys] == query[key]) || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
