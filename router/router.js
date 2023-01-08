const express = require("express");
const { check } = require("express-validator");
const { upload } = require("../connection/upload");
const {
  _getCheckOut,
  _saveCheckOut,
  _deleteCheckOut,
  _putCheckOut,
} = require("../controller/checkout");
const {
  _getUsers,
  _saveUser,
  _putUser,
  _deleteUser,
  login,
} = require("../controller/users");
const {
  _getProducts,
  _saveProduct,
  _putProduct,
  _deleteProduct,
} = require("../controller/products");

const {
  _getCategories,
  _saveCategory,
  _putCategory,
  _deleteCategory,
} = require("../controller/categories");
const {
  _getContact,
  _saveContact,
  _putContact,
  _deleteContact,
} = require("../controller/contact");
const {
  _getNews,
  _saveNews,
  _putNews,
  _deleteNews,
} = require("../controller/news");
const {
  _getComment,
  _saveComment,
  _putComment,
  _deleteComment,
} = require("../controller/comment");
const {
  _getLike,
  _saveLike,
  _putLike,
  _deleteLike,
} = require("../controller/likee");
const {
  _getOrders,
  _saveOrders,
  _putOrders,
  _deleteOrders,
} = require("../controller/orders");
const {
  _getSave,
  _putSave,
  _save,
  _deleteSave,
} = require("../controller/save");

const router = express.Router();

//--------------------------------------------------------------------------

// Contact

router.get("/contact", _getContact);
router.post(
  "/contact",
  [
    check("email", "email field is required").isLength({ min: 3 }),
    check("massage", "massage field is required").isLength({ min: 3 }),
  ],
  _saveContact
);
router.put(
  "/contact/:id",
  [
    check("email", "email field is required").isLength({ min: 3 }),
    check("massage", "massage field is required").isLength({ min: 3 }),
  ],
  _putContact
);
router.delete("/contact/:id", _deleteContact);
//--------------------------------------------------------------------------

//  News

router.get("/news", _getNews);
router.post(
  "/news",
  [check("email", "email field is required").isLength({ min: 3 })],
  _saveNews
);
router.put(
  "/news/:id",
  [check("email", "email field is required").isLength({ min: 3 })],
  _putNews
);
router.delete("/news/:id", _deleteNews);

// ---------------------------------------------------------------------

// Like

router.get("/like", _getLike);
router.post("/like", _saveLike);
router.put("/like/:id", _putLike);
router.delete("/like/:id", _deleteLike);

//---------------------------------------------------------------------

// orders

router.get("/orders", _getOrders);
router.post("/orders", _saveOrders);
router.put("/orders/:id", _putOrders);
router.delete("/orders/:id", _deleteOrders);

// --------------------------------------------------------------------

// comment

router.get("/comment", _getComment);
router.post(
  "/comment",
  [
    check("comment", "comment field is required").isLength({ min: 3 }),
    check("date", "date field is required").isLength({ min: 3 }),
  ],
  _saveComment
);
router.put(
  "/comment/:id",
  [
    check("comment", "comment field is required").isLength({ min: 3 }),
    check("date", "date field is required").isLength({ min: 3 }),
  ],
  _putComment
);
router.delete("/comment/:id", _deleteComment);
//-----------------------------------------------------------------------------

// categories

router.get("/categories", _getCategories);
router.post(
  "/categories",
  [check("name", "name field is required").isLength({ min: 2 })],
  upload.single("logo"),
  _saveCategory
);
router.put("/categories/:id", upload.single("logo"), _putCategory);
router.delete("/categories/:id", upload.single("logo"), _deleteCategory);

//------------------------------------------------------------------
// Products

router.get("/products", _getProducts);

router.post(
  "/products",
  upload.single("images"),
  [
    check("name", "name field is required").isLength({ min: 3 }),
    check("country", "country field is required").isLength({ min: 3 }),
    check("price", "price field is required").isLength({ min: 3 }),
    check("date", "date field is required").isLength({ min: 3 }),
    check("description", "description field is required").isLength({ min: 3 }),
  ],
  _saveProduct
);

router.put("/products/:id", upload.single("images"), _putProduct);

router.delete("/products/:id", _deleteProduct);

//-------------------------------------------------------------------

// users

router.get("/users", _getUsers);

router.post(
  "/users",
  upload.single("image"),
  [
    check("name", "name field is required").isLength({ min: 3 }),
    check("email", "Email field is required").isEmail(),
    check("password", "Passowrd field is required").isLength({ min: 4 }),
    check("phone", "Phone field is required").isLength({ min: 10 }),
  ],
  _saveUser
);

router.put(
  "/users/:id",
  upload.single("image"),
  [
    check("name", "name field is required").isLength({ min: 3 }),
    check("email", "Email field is required").isEmail(),
    check("phone", "Phone field is required").isLength({ min: 10 }),
  ],
  _putUser
);

router.delete("/users/:id", _deleteUser);

router.post(
  "/login",
  [
    check("email", "Email field is required").isEmail(),
    check("password", "Passowrd field is required").isLength({ min: 4 }),
  ],
  login
);

//-------------------------------------------------------------------

// save

router.get("/save", _getSave);
router.post("/save", _save);
router.put("/save/:id", _putSave);
router.delete("/save/:id", _deleteSave);
//-------------------------------------------------------------------
// check Out
router.get("/checkOut", _getCheckOut);
router.post(
  "/checkOut",
  [
    check("CreditCardNumber", "credit Card Number field is required").isLength({
      min: 16,
      max: 16,
    }),
    check("cvv", "cvv field is required").isLength({ min: 3, max: 3 }),
  ],
  _saveCheckOut
);
router.put(
  "/checkOut/:id",
  /* [
    check("CreditCardNumber", "credit Card Number field is required").isLength({
      min: 16,
      max: 16,
    }),
    check("cvv", "cvv field is required").isLength({ min: 3, max: 3 }),
  ], */
  _putCheckOut
);
router.delete("/checkOut/:id", _deleteCheckOut);

module.exports = router;
