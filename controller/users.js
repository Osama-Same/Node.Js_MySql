const connection = require("../connection/connection");
const cloudinary = require("../connection/cloudinary");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _getUsers = (req, res) => {
  let sql = `select * from users`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _saveUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let phone = req.body.phone;
  let img = null;
  if (req.file) {
    img = await cloudinary.uploader.upload(req.file.path, {
      folder: "CRUD/User",
    });
  }
  let image = img?.secure_url;
  let cloudinary_id = img?.public_id;
  password = bcrypt.hashSync(password, Number("salt"));
  const sql = `INSERT INTO users (name, email, password,phone,image ,cloudinary_id , authorization)
    VALUES ('${name}', '${email}', '${password}','${phone}','${image}','${cloudinary_id}' , 'user')`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.json({ err: " You have entered invalid  Email" });
    }
    if (result) {
      res.json({ result: "User Register sucessfully" });
    }
  });
};

const _putUser = async (req, res) => {
  let id = req.params.id;
  let sql = `select * from users where id = '${id}'`;
  connection.query(sql, async (err, result) => {
    if (err) {
      res.json(err);
    }

    if (result) {
      const user = result.find((e) => e.id);
      if (user) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
          return res.json({ error: error.array()[0].msg });
        }
        let name = req.body.name || user.name;
        let email = req.body.email || user.email;
        let phone = req.body.phone || user.phone;
        let img = null;

        if (req.file) {
          await cloudinary.uploader.destroy(user.cloudinary_id);
          img = await cloudinary.uploader.upload(req.file.path, {
            folder: "CRUD/User",
          });
        }
        let image = img?.secure_url || user.image;
        let cloudinary_id = img?.public_id || user.cloudinary_id;
        let sql = `update users set 
           name = '${name}',
           email = '${email}',
           phone = '${phone}',
           image = '${image}',
           cloudinary_id = '${cloudinary_id}',
           authorization = "user"
           where id = '${id}'`;
        connection.query(sql, (err, result) => {
          if (err) {
            res.json({ err: " You have entered invalid  Email" });
          } else {
            res.json(result);
          }
        });
      }
    }
  });
};

const _deleteUser = (req, res) => {
  const id = req.params.id;
  let sql = `select * from users where id='${id}'`;
  connection.query(sql, async (err, result) => {
    if (err) {
      res.json(err);
    }
    if (result) {
      const user = result.find((e) => e.id);
      await cloudinary.uploader.destroy(user.cloudinary_id);
      let sql = `delete from users where id='${id}'`;
      connection.query(sql, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

const login = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  const email = req.body.email;
  const sql = `select * from users where email ='${email}' `;

  connection.query(sql, async (err, result) => {
    if (err) {
      res.json({ err: "You have entered invalid  email " });
    }

    if (result) {
      const findUser = result.find((u) => u.id);
      if (findUser) {
        const id = findUser.id;
        if (await bcrypt.compare(req.body.password, findUser.password)) {
          const token = jwt.sign({ id }, "jwtSecret", {
            expiresIn: process.env.TOKEN_EXPIRATION,
          });
          res.json({
            result: result,
            token: token,
          });
        } else {
          res.json({ err: "You have entered invalid  Password Or Email" });
        }
      } else {
        res.json({ err: "You have entered invalid  Email " });
      }
    }
  });
};
module.exports = {
  _getUsers,
  _saveUser,
  _putUser,
  _deleteUser,
  login,
};
