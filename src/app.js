const express = require("express");
const cors = require("cors");

const app = express();

/* Cors */
app.use(cors());

/* config server port */
app.set("port", 3000);

/* Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Import routes */
const login = require("./routes/login");
const colaborador = require("./routes/colaborador");
const transportista = require("./routes/transportista");
const recorrido = require("./routes/recorrido");

/* Routes */
app.get("/", (req, res, next) => {
  res.send("api Sistema_Transporte");
});

app.use("/api/login", login);
app.use("/api/colaborador", colaborador);
app.use("/api/transportista", transportista);
app.use("/api/recorrido", recorrido);

/* catch errors */
app.use((req, res) => {
  console.log("Undefined route");
  res.send("ruta desconocida");
});

app.listen(3000, () => {
  console.log("Server on port 3000");
});
