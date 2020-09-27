var express = require("express");
var router = express.Router();
var Result = require("../config/result");
/* const jwt = require('jsonwebtoken') */
const db = require("../database/connection");

router.post("/lista", (req, res) => {
  let result = Result.createResult();

  const query = "SELECT * FROM transportista;";
  db.query(query, (err, resp) => {
    if (!err) {
      result.Items = resp;
      result.Response = "Lista de tranportistas";

      res.send(result);
    } else {
      result.Response = "Ha ocurrido un error al acceder a la base de datos.";
      result.Success = false;
      result.Error = true;
      res.send(result);
    }
  });
});

router.post("/reporte", (req, res) => {
  let result = Result.createResult();
  const { idTransportista, fechaInicial, fechaFinal } = req.body;
  console.log(
    idTransportista,
    fechaInicial,
    fechaFinal,
    `${fechaInicial} 01:00:00`
  );
  /* '2020-09-26 01:00:00' AND '2020-09-26 23:00:00' */
  const query = `SELECT Colaborador.usuario, Recorrido.fecha, Recorrido.tarifa, Sucursal_Colaborador.distancia FROM Recorrido 
  INNER JOIN Sucursal_Colaborador ON Recorrido.id_colaborador = Sucursal_Colaborador.id_colaborador
  AND Recorrido.id_sucursal = Sucursal_Colaborador.id_sucursal
  INNER JOIN Colaborador ON Colaborador.id = Recorrido.id_colaborador
  WHERE Recorrido.id_transportista = ?
  AND Recorrido.fecha BETWEEN ? AND ? `;

  db.query(
    query,
    [idTransportista, `${fechaInicial} 01:00:00`, `${fechaFinal} 24:00:00`],
    (err, resp) => {
      if (!err) {
        if (resp.length != 0) {
          result.Response = "Reporte recorridos";
          result.Items = resp;

          res.send(result);
        } else {
          result.Success = false;
          result.Error = true;
          result.Response = "No hay recorridos para mostrar.";
          result.Items = [];

          res.send(result);
        }
      } else {
        result.Success = false;
        result.Error = true;
        result.Response = "Ha ocurrido un error al acceder a la base.";
        result.Items = [];

        res.send(result);
      }
    }
  );
});
module.exports = router;
