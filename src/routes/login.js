var express = require("express");
var router = express.Router();
var Result = require("../config/result");
/* const jwt = require('jsonwebtoken') */
const db = require("../database/connection");

router.post("/colaborador", (req, res, next) => {
  let result = Result.createResult();

  const query = `SELECT * FROM Colaborador WHERE usuario = ?;`;
  db.query(query, [req.body.user], (err, resp) => {
    if (!err) {
      if (resp.length === 0) {
        result.Success = false;
        result.Response = "Este usuario no existe";
        res.send(result);
      } else {
        if (resp[0].contrasena === req.body.password) {
          result.Success = true;
          result.Items = {
            usuario: resp[0].usuario,
            id: resp[0].id,
          };
          result.Response = "Inicio exitoso";
          res.send(result);
        } else {
          result.Success = false;
          result.Response = "Contraseña incorecta";
          res.send(result);
        }
      }
    } else {
      result.Success = false;
      result.Error = true;
      result.Response = "Ha ocurrido un error al acceder a la base.";
      res.send(result);
    }
  });
});

router.post("/transportista", (req, res, next) => {
  let result = Result.createResult();

  const query = `SELECT * FROM transportista WHERE usuario = ?;`;
  db.query(query, [req.body.user], (err, resp) => {
    if (!err) {
      if (resp.length === 0) {
        result.Success = false;
        result.Response = "Este usuario no existe";
        res.send(result);
      } else {
        if (resp[0].contrasena === req.body.password) {
          result.Success = true;
          result.Items = {
            usuario: resp[0].usuario,
            id: resp[0].id,
          };
          result.Response = "Inicio exitoso";
          res.send(result);
        } else {
          result.Success = false;
          result.Response = "Contraseña incorecta";
          res.send(result);
        }
      }
    } else {
      result.Success = false;
      result.Error = true;
      result.Response = "Ha ocurrido un error al acceder a la base.";
      res.send(result);
    }
  });
});
module.exports = router;
