const connection = require("../connection/connection");

const _getOrders = (req, res) => {
  let sql = `select * from orders`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _saveOrders = (req, res) => {
  let iduser = req.body.iduser;
  let idproduct = req.body.idproduct;
  let quantity = req.body.quantity;
  const sql = `INSERT INTO orders ( iduser , idproduct , quantity ) VALUES ('${iduser}','${idproduct}' , '${quantity}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _putOrders = (req, res) => {
  let id = req.params.id;
  let iduser = req.body.iduser;
  let idproduct = req.body.idproduct;
  let quantity = req.body.quantity;
  const sql = `UPDATE orders
  SET iduser = '${iduser}',
  idproduct = '${idproduct}',
  quantity = '${quantity}'
  WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _deleteOrders = (req, res) => {
  let id = req.params.id;
  const sql = `DELETE FROM orders  WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
module.exports = {
  _getOrders,
  _saveOrders,
  _putOrders,
  _deleteOrders
};
