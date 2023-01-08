const connection = require("../connection/connection");
const cloudinary = require("../connection/cloudinary");
const { validationResult } = require("express-validator");

const _getProducts = (req, res) => {
  let sql = `select * from products`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const _saveProduct = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let iduser = req.body.iduser;
  let idcategory = req.body.idcategory;
  let name = req.body.name;
  let country = req.body.country;
  let price = req.body.price;
  let date = req.body.date;
  let description = req.body.description;
  let img = null;
  if (req.file) {
    img = await cloudinary.uploader.upload(req.file.path, {
      folder: "CRUD/Post",
    });
  }
  let images = img?.secure_url;
  let cloudinary_id = img?.public_id;
 
  const sql = `INSERT INTO products (iduser, idcategory , name,country,images,price ,date,description, cloudinary_id )
  VALUES ('${iduser}', '${idcategory}', '${name}','${country}','${images}','${price}','${date}','${description}', '${cloudinary_id}'  )`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const _putProduct = async (req, res) => {
  let id = req.params.id;
  let sql = `select * from products where id = ${id}`;
  connection.query(sql, async (err, result) => {
    if (err) {
      res.json(err);
    }

    if (result) {
      const findPost = result.find((e) => e.id);
      if (findPost) {
        const post = result.find((e) => e.id);
        let iduser = req.body.iduser || post.iduser;
        let idcategory = req.body.idcategory || post.idcategory;
        let name = req.body.name;
        let country = req.body.country || post.country;
        let price = req.body.price || post.price;
        let date = req.body.date || post.date;
        let description = req.body.description || post.description;
        let img;
        await cloudinary.uploader.destroy(post.cloudinary_id);
        if (req.file) {
          await cloudinary.uploader.destroy(post.cloudinary_id);
          img = await cloudinary.uploader.upload(req.file.path, {
            folder: "CRUD/Post",
          });
        }
        let images = img?.secure_url || post.images;
        let cloudinary_id = img?.public_id || post.cloudinary_id;

        let sql = `update products set 
        iduser = '${iduser}',
        idcategory = '${idcategory}',
        name = '${name}',
        country = '${country}',
        images = '${images}',
        price = '${price}',
        date = '${date}',
        description = '${description}',
        cloudinary_id = '${cloudinary_id}'
        where id = '${id}'`;
        connection.query(sql, (err, result) => {
          if (err) {
            res.json(err);
          } else {
            res.json(result);
          }
        });
      }
    }
  });
};


const _deleteProduct = (req, res) => {
  const id = req.params.id;
  let sql = `select * from products where id='${id}'`;
  connection.query(sql, async (err, result) => {
    if (err) {
      res.json(err);
    }
    if (result) {
      const post = result.find((e) => e.id);
      await cloudinary.uploader.destroy(post.cloudinary_id);
      let sql = `delete from products where id='${id}'`;
      connection.query(sql, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json("Delete Account");
        }
      });
    }
  });
};
module.exports = {
  _getProducts,
  _saveProduct,
  _putProduct,
  _deleteProduct,

};
