const connection = require("../connection/connection");
const cloudinary = require("../connection/cloudinary");

const _getCategories = (req, res) => {
  let sql = `select * from categories`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const _saveCategory = async (req, res) => {
  let name = req.body.name;
  let img = null;
  if (req.file) {
    img = await cloudinary.uploader.upload(req.file.path, {
      folder: "CRUD/Category",
    });
  }

  let logo = img?.secure_url;
  let cloudinary_id = img?.public_id;
  const sql = `INSERT INTO categories (name ,logo,cloudinary_id )
  VALUES ( '${name}','${logo}' , '${cloudinary_id}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json({ err: " You have entered invalid  Email" });
    }
    if (result) {
      res.json({ result: "Categories sucessfully" });
    }
  });
};

// update category
const _putCategory = async (req, res) => {
  let id = req.params.id;
  let sql = `select * from categories where id = '${id}'`;
  connection.query(sql, async (err, result) => {
    if (err) {
      res.json(err);
    }
    if (result) {
      const category = result.find((e) => e.id);
      console.log(category);
      if (category) {
        let name = req.body.name || category.name;
        let img = null;
        if (req.file) {
          await cloudinary.uploader.destroy(category.cloudinary_id);
          img = await cloudinary.uploader.upload(req.file.path, {
            folder: "CRUD/Category",
          });
        }
        let logo = img?.secure_url || category.logo;
        let cloudinary_id = img?.public_id || category.cloudinary_id;
        let sql = `update categories set 
                   name = '${name}',
                   logo = '${logo}',
                   cloudinary_id = '${cloudinary_id}'
                   where id = '${id}'`;
        connection.query(sql, (err, result) => {
          if (err) {
            res.json(err);
          }
          if (result) {
            res.json(result);
          }
        });
      }
    }
  });
};

const _deleteCategory = (req, res) => {
  const id = req.params.id;
  let sql = `select * from categories where id='${id}'`;
  connection.query(sql, async (err, result) => {
    if (err) {
      res.json(err);
    }
    if (result) {
      const category = result.find((e) => e.id);
      await cloudinary.uploader.destroy(category.cloudinary_id);
      let sql = `delete from categories where id='${id}'`;
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
module.exports = {
  _getCategories,
  _saveCategory,
  _putCategory,
  _deleteCategory,
};
