const mysql = require("mysql");

const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

// Connection
let connection;

function handeCon() {
  connection = mysql.createConnection(dbconfig);
  connection.connect((err) => {
    if (err) {
      console.error("[db error]", err);
      setTimeout(handeCon, 2000);
    } else {
      console.log("DB connected");
    }
  });

  connection.on("error", (err) => {
    console.error("[db error]", err);
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      handeCon();
    } else {
      throw err;
    }
  });
}
handeCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

// function insert(table, data) {
//   return new Promise((resolve, reject) => {
//     connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
//       if (error) return reject(error);
//       resolve(result);
//     });
//   });
// }
// function update(table, data) {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       `UPDATE ${table} SET ? WHERE id=?`,
//       [data, data.id],
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );
//   });
// }

const upsert = async (table, payload) =>
  new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`,
      [payload, payload],
      (error, data) => {
        console.log("UPDATE DATA: ", data);
        if (error) {
          return reject(error);
        }
        resolve(data);
      }
    );
  });

function query(table, query) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
      if (err) return reject(err);
      //cosa rara que hay q hacer para evitar el rawdatapacket (no esta en el curso, es un comentario)
      let output = {
        id: res[0].id,
        username: res[0].username,
        password: res[0].password,
      };
      resolve(output || null);
    });
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
};
