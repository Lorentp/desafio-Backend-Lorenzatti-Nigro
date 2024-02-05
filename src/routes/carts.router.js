const express = require("express");
const router = express.Router();

const CartManager = require("../dao/db/carts-manager-db.js");
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    await cartManager.newCart();
    res.send({ status: "success", message: "Carrito creado" });
  } catch (error) {
    res.send(error);
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartsProducts(cid);
    if (cart) {
      res.json(cart);
    } else {
      res.json({
        message: "No se encontro el carrito, revise el ID solicitado",
      });
    }
  } catch (error) {
    res.send("Error del servidor");
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    await cartManager.addProductToCart(cid, pid, quantity);
    res.send("Producto agregado al carrito");
  } catch (error) {
    res.send("Error, no se pudo agregar el producto al carrito");
  }
});

module.exports = router;
