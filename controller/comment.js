const connection = require("../connection/connection");
const { validationResult } = require("express-validator");
const _getComment = (req, res) => {
  let sql = `select * from comment `;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _saveComment = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let iduser = req.body.iduser;
  let idproduct = req.body.idproduct;
  let comment = req.body.comment;
  let date = req.body.date;
  let sql = `insert into comment (iduser,idproduct,comment,date)VALUES('${iduser}','${idproduct}','${comment}','${date}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _putComment = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let id = req.params.id;
  let iduser = req.body.iduser;
  let idproduct = req.body.idproduct;
  let comment = req.body.comment;
  let date = req.body.date;
  const sql = `UPDATE comment
  SET iduser = '${iduser}',
  idproduct = '${idproduct}',
  comment = '${comment}',
  date = '${date}'
  WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json({err :  "Error comment"});
    } else {
      res.json(result);
    }
  });
};

const _deleteComment = (req, res) => {
  let id = req.params.id;
  const sql = `DELETE FROM comment  WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getComment,
  _saveComment,
  _putComment,
  _deleteComment,
};
