const cartsServices = require("../services/cartsServices.js");
const CartsServices = new cartsServices();
const productsServices = require("../services/productsServices.js");
const ProductsServices = new productsServices();

class CartsController {
  async createCart(req, res) {
    try {
      const newCart = await CartsServices.createCart();
      return newCart;
    } catch (error) {
      res.json(error);
    }
  }

  async getCartById(req, res) {
    try {
      const cart = await CartsServices.getCartById(req.session.user.cartId);
      return cart;
    } catch (error) {
      res.json(error);
    }
  }

  async addProductToCart(req, res) {
    try {
      const cart = await CartsServices.getCartById(req.session.user.cartId);
      const product = await ProductsServices.productExists(req.params.pid);
      const quantity = 1;
      const newCart = await cartsServices.addProductToCart(
        cart,
        product,
        quantity
      );

      res.redirect("/products");
      return newCart;
    } catch (error) {
      res.json(error);
    }
  }

  async deleteProductInCart(req, res) {
    try {
      const cart = await CartsServices.getCartById(req.session.user.cartId);
      const product = await ProductsServices.productExists(req.params.pid);
      const newCart = await CartsServices.deleteProductInCart(cart, product);
      return newCart;
    } catch (error) {
      res.json(error);
    }
  }
  async emptyCart(req, res) {
    try {
      const newCart = await CartsServices.emptyCart(req.session.user.cartId);
      return newCart;
    } catch (error) {
      res.json(error);
    }
  }
}
module.exports = CartsController;
