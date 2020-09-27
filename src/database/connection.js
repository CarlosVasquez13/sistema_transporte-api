const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "carlos",
  password: "patitoFeliz123",
  database: "sistema_transporte",
  multipleStatements: true,
  port: "3306",
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Conexión con la base de datos establecida");
  }
});

function ping() {
  return connection.ping(function (err) {
    if (err) {
      console.error("Ocurrió un error conectandose a la base: " + err.stack);
      return false;
    }
  });
}

setInterval(ping, 20000);

module.exports = connection;
