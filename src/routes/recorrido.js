/* 
@Autor Carlos Vasquez

*/
var express = require("express");
var router = express.Router();
var Result = require("../config/result");
const db = require("../database/connection");

/* Registrar un recorrido */
router.post("/nuevo", (req, res) => {
  let result = Result.createResult();
  const { idSucursal, idColaborador, idTransportista } = req.body;
  const query = `CALL SP_REGISTRO_RECORRIDO(?, ?, ?, @Mensaje); SELECT @Mensaje as mensaje;`;

  db.query(query, [idSucursal, idColaborador, idTransportista], (err, resp) => {
    if (!err) {
      result.Response = resp[1][0].mensaje;
      result.Items = resp;

      res.send(result);
    } else {
      result.Success = false;
      result.Error = true;
      result.Response = "Ha ocurrido un error!";

      res.send(result);
    }
  });
});

router.post("/nuevo-recorrido", (req, res) => {
  let result = Result.createResult();
  const { idSucursal, Colaboradores, idTransportista } = req.body;
  const query = `CALL SP_REGISTRO_RECORRIDO(?, ?, ?, @Mensaje); SELECT @Mensaje as mensaje`;

  let resultItems = [];
  Colaboradores.map((id) => {
    db.query(query, [idSucursal, id, idTransportista], (err, resp) => {
      if (!err) {
        resultItems.push({
          usuario: id,
          error: false,
          message: "",
        });
      } else {
        resultItems.push({
          usuario: id,
          error: true,
          message: resp[1][0].mensaje,
        });
      }
    });
  });
  result.Items = resultItems;

  res.send(result);
});

module.exports = router;
