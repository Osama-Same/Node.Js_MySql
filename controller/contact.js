const connection = require("../connection/connection");
const { validationResult } = require("express-validator");
const _getContact = (req, res) => {
  let sql = `select * from contact`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _saveContact = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let email = req.body.email;
  let massage = req.body.massage;
  const sql = `INSERT INTO contact ( email , massage) VALUES ('${email}', '${massage}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json({ err: "Error Email Contact" });
    }
    if (result) {
      res.json(result);
    }
  });
};
const _putContact = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let id = req.params.id;
  let email = req.body.email;
  let massage = req.body.massage;
  const sql = `UPDATE contact
  SET email = '${email}', massage = '${massage}'
  WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json({ err: "Error Update Contact" });
    } else {
      res.json(result);
    }
  });
};
const _deleteContact = (req, res) => {
  let id = req.params.id;
  const sql = `DELETE FROM contact  WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
module.exports = {
  _getContact,
  _saveContact,
  _putContact,
  _deleteContact,
};
