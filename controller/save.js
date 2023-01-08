const connection = require("../connection/connection");

const _getSave = async (req, res) => {
  let sql = `select * from save`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _save = async (req, res) => {
  let iduser = req.body.iduser;
  let idproduct = req.body.idproduct;
  let save = req.body.save;
  const sql = `INSERT INTO save (iduser , idproduct, save  )
    VALUES ('${iduser}', '${idproduct}', '${save}' )`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _putSave = async (req, res) => {
  let id = req.params.id;
  let iduser = req.body.iduser;
  let idproduct = req.body.idproduct;
  let save = req.body.save;
  let sql = `update save set 
          iduser = '${iduser}',
          idproduct = '${idproduct}',
          save = '${save}'
          where id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const _deleteSave = (req, res) => {
    let id = req.params.id;
    const sql = `DELETE FROM save  WHERE id = '${id}'`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  };

module.exports = {
  _getSave,
  _save,
  _putSave,
  _deleteSave
};
