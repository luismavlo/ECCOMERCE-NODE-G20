const Cart = require('./cart.model');
const Category = require('./category.model');
const Order = require('./order.model');
const ProductInCart = require('./prodictInCart.model');
const Product = require('./product.model');
const ProductImg = require('./productImg.model');
const User = require('./user.model');

const initModel = () => {
  /* 1User <--------> M product */
  User.hasMany(Product);
  Product.belongsTo(User);

  /* 1User <--------> M Order */
  User.hasMany(Order);
  Order.belongsTo(User);

  /* 1User <--------> 1 Cart */
  User.hasOne(Cart);
  Cart.belongsTo(User);

  /* 1Product <--------> M productImg */
  Product.hasMany(ProductImg);
  ProductImg.belongsTo(Product);

  /*1Category <--------> M Product*/
  Category.hasMany(Product);
  Product.belongsTo(Category);

  /*1Cart <--------> M productsIncart*/
  Cart.hasMany(ProductInCart);
  ProductInCart.belongsTo(Cart);

  // 1 Product <--------> 1 ProductInCart
  Product.hasOne(ProductInCart);
  ProductInCart.belongsTo(Product);

  /* 1Order <--------> 1Cart */
  Cart.hasOne(Order);
  Order.belongsTo(Cart);
};

module.exports = initModel;
