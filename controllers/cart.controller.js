const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const ProductInCart = require('../models/prodictInCart.model');
const Product = require('../models/product.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.addProductToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { cart } = req;

  const productInCart = await ProductInCart.create({
    cartId: cart.id,
    productId,
    quantity,
  });

  res.status(201).json({
    status: 'success',
    message: 'The product has been added',
    productInCart,
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const { newQty } = req.body;
  const { productInCart } = req;

  if (newQty < 0) {
    return next(new AppError('The quantity must be greater than 0', 400));
  }

  if (newQty === 0) {
    await productInCart.update({ quantity: newQty, status: 'removed' });
  } else {
    await productInCart.update({ quantity: newQty, status: 'active' });
  }

  res.status(200).json({
    status: 'success',
    message: 'The product in cart has been updated',
  });
});

exports.removeProductToCart = catchAsync(async (req, res, next) => {
  const { productInCart } = req;

  await productInCart.update({ quantity: 0, status: 'removed' });

  res.status(200).json({
    status: 'success',
    message: 'The product in cart has been removed',
  });
});

exports.buyProductOnCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  //1. buscar el carrito del usuario

  const cart = await Cart.findOne({
    attributes: ['id', 'userId'],
    where: {
      userId: sessionUser.id,
      status: 'active',
    },
    include: [
      {
        model: ProductInCart,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          status: 'active',
        },
        include: [
          {
            model: Product,
            attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
          },
        ],
      },
    ],
  });

  if (!cart) {
    return next(new AppError('There are not products in cart', 400));
  }

  //2. calcular el precio total a pagar
  let totalPrice = 0;

  cart.productInCarts.forEach(productInCart => {
    totalPrice += productInCart.quantity * productInCart.product.price;
  });

  //3. vamos a actualizar el stock o cantidad del modelo Product
  const purchasedProductPromises = cart.productInCarts.map(
    async productInCart => {
      //1 buscar el producto para actualizar su información
      const product = await Product.findOne({
        where: {
          id: productInCart.productId,
        },
      });
      //2 calcular la cantidad de productos que me quedan en la tiendan
      //TODO: verificar cantidad para no agregar mas
      const newStock = product.quantity - productInCart.quantity;
      //3 actualizabamos la informacion y la retornabamos
      return await product.update({ quantity: newStock });
    }
  );

  await Promise.all(purchasedProductPromises);

  const statusProductInCartPromises = cart.productInCarts.map(
    async productInCart => {
      const productInCartFoundIt = await ProductInCart.findOne({
        where: {
          id: productInCart.id,
          status: 'active',
        },
      });

      return await productInCartFoundIt.update({ status: 'purchased' });
    }
  );

  await Promise.all(statusProductInCartPromises);

  await cart.update({ status: 'purchased' });

  const order = await Order.create({
    userId: sessionUser.id,
    cartId: cart.id,
    totalPrice,
  });

  res.status(201).json({
    message: 'The order has been generated succesfully',
    order,
  });
});
