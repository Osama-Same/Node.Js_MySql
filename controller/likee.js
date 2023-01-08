const connection = require("../connection/connection");

const _getLike = (req, res) => {
  let sql = `select * from likee`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const _saveLike = (req, res) => {
  let iduser = req.body.iduser;
  let idproduct = req.body.idproduct;
  let likee = req.body.likee;
  const sql = `INSERT INTO likee ( iduser , idproduct , likee) VALUES ('${iduser}' ,'${idproduct}' , '${likee}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } 
    
    if(result){
      res.json(result);
    }
  });
};

const _putLike = (req, res) => {
  let id = req.params.id;
  let iduser = req.body.iduser;
  let idproduct = req.body.idproduct;
  let likee = req.body.likee;
  const sql = `UPDATE likee
  SET iduser = '${iduser}',
  idproduct = '${idproduct}',
  likee = '${likee}'
  WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _deleteLike = (req, res) => {
  let iduser = req.params.iduser;
  const sql = `DELETE FROM likee  WHERE iduser = '${iduser}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getLike,
  _saveLike,
  _putLike,
  _deleteLike,
};
