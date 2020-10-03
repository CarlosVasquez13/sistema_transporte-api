/* 
@Autor Carlos Vasquez

*/
var express = require("express");
var router = express.Router();
var Result = require("../config/result");
/* const jwt = require('jsonwebtoken') */
const db = require("../database/connection");

/* Obtener lista de colaboradores */
router.get("/lista", (req, res) => {
  let result = Result.createResult();

  const query =
    "SELECT id, nombre, usuario, direccion, estado FROM Colaborador;";
  db.query(query, (err, resp) => {
    if (!err) {
      result.Items = resp;
      result.Response = "Lista de colaboradores";

      res.send(result);
    } else {
      result.Response = "Ha ocurrido un error al acceder a la base de datos.";
      result.Success = false;
      result.Error = true;
      res.send(result);
    }
  });
});

/* 
Agregar un colaborador a una sucursal
*/
router.get(
  "/colaborador_sucursal/:idUsuario/:idSucursal/:distancia",
  (req, res) => {
    let result = Result.createResult();
    const { idSucursal, idUsuario, distancia } = req.params;

    const query = `INSERT INTO Sucursal_Colaborador(id, id_sucursal, id_colaborador, distancia)
                    VALUES(?, ?, ?, ?);`;
    db.query(
      query,
      [`${idSucursal}-${idUsuario}`, idSucursal, idUsuario, distancia],
      (err, resp) => {
        if (!err) {
          if (resp != undefined) {
            result.Response = "Colaborador agregado exitosamente.";
            result.Items = resp;

            res.send(result);
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
  }
);

module.exports = router;
