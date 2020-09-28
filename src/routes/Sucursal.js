/* 
@Autor Carlos Vasquez

*/
var express = require("express");
var router = express.Router();
var Result = require("../config/result");
/* const jwt = require('jsonwebtoken') */
const db = require("../database/connection");

/* 
Agregar un colaborador a una sucursal
*/
router.post("/colaborador_sucursal", (req, res) => {
  let result = Result.createResult();
  const { idSucursal, idUsuario, distancia } = req.body;
  console.log(idSucursal, idUsuario, distancia);
  const query = `CALL SP_AGREGAR_COLABORADOR_SUCURSAL(?, ?, ?, ?, @Mensaje); SELECT @Mensaje as mensaje`;
  db.query(
    query,
    [`${idSucursal}-${idUsuario}`, idUsuario, idSucursal, distancia],
    (err, resp) => {
      if (!err) {
        if (resp != undefined) {
          if (resp[1][0].mensaje !== null) {
            result.Response = resp[1][0].mensaje;
            result.Success = false;
            result.Error = true;

            res.send(result);
          } else {
            result.Response = "Colaborador agregado exitosamente.";
            result.Items = resp;

            res.send(result);
          }
        } else {
          result.Success = false;
          result.Response = "Error: Colaborador no fue agregado.";
          result.Items = resp;

          res.send(result);
        }
      } else {
        result.Error = true;
        result.Success = false;
        result.Response = "Ha ocurrido un error!.";

        res.send(result);
      }
    }
  );
});

/* Lista de sucursales */
router.get("/lista", (req, res) => {
  let result = Result.createResult();

  const query = `SELECT * FROM Sucursal;`;
  db.query(query, (err, resp) => {
    if (!err) {
      result.Items = resp;
      result.Response = "Lista sucursales";

      res.send(result);
    }
  });
});

/* Obtener colaboradores de la sucursal */
router.get("/colaboradores/:idSucursal", (req, res) => {
  let result = Result.createResult();
  const { idSucursal } = req.params;

  const query = `SELECT Colaborador.id, nombre, usuario, direccion, Sucursal_Colaborador.distancia FROM Colaborador
  INNER JOIN Sucursal_Colaborador ON Sucursal_Colaborador.id_colaborador = Colaborador.id AND Sucursal_Colaborador.id_sucursal = ?;`;

  db.query(query, [idSucursal], (err, resp) => {
    console.log(resp);
    if (!err) {
      result.Items = resp;
      result.Response = "Lista de colaboradores de la sucursal.";

      res.send(result);
    } else {
      result.Success = false;
      result.Error = true;
      result.Items = [];

      res.send(result);
    }
  });
});

module.exports = router;
