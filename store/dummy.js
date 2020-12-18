const db = {
  user: [{ id: 1, name: "seba" }],
};

async function list(table) {
  return db[table];
}
async function get(table, id) {
  let col = await list(table);
  return col.find((item) => item.id == id) || null;
}
async function upsert(table, data) {
  db.user.push(data);
  return data;
}

async function remove(table, id) {
  if (!db.user.find((item) => item.id == id)) {
    return "Invalid User id";
  } else {
    db.user.pop(id);
    return `User ${id} deleted`;
  }
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};
