const connection = require("../connection/connection");
const { validationResult } = require("express-validator");
const _getNews = (req, res) => {
  let sql = `select * from news`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _saveNews = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let email = req.body.email;
  const sql = `INSERT INTO news ( email ) VALUES ('${email}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json({ err: "Error Email" });
    } else {
      res.json(result);
    }
  });
};

const _putNews = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let id = req.params.id;
  let email = req.body.email;
  const sql = `UPDATE news
  SET email = '${email}'
  WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const _deleteNews = (req, res) => {
  let id = req.params.id;
  const sql = `DELETE FROM news  WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getNews,
  _saveNews,
  _putNews,
  _deleteNews,
};
