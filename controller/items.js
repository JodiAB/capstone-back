// controller.js
import express from 'express';
import bodyParser from 'body-parser';
// import Basket from '../models/basket.js';
import login from '../middleware/Auth.js';
import { getProducts, getProduct, addProduct, upProduct, deleteProduct } from '../models/database.js';

const routes = express.Router();
// const cart = new Basket();

// routes.use(bodyParser.json());

// routes.post('/add_to_cart', bodyParser.json(), (req, res) => {
//   verifyAToken(req, res, () => {
//     const { prodID, quantity } = req.body;
//     cart.addItem(prodID, quantity);
//     res.json({ status: res.statusCode, message: 'Item added to cart successfully' });
//   });
// });

// routes.delete('/remove_from_cart/:prodID', (req, res) => {
//   verifyAToken(req, res, () => {
//     const { prodID } = req.params;
//     cart.removeItem(prodID);
//     res.json({ status: res.statusCode, message: 'Item removed from cart successfully' });
//   });
// });

// routes.get('/view_cart', (req, res) => {
//   verifyAToken(req, res, () => {
//     const cartItems = cart.getItems();
//     res.json({ status: res.statusCode, cart: cartItems });
//   });
// });

export {
  routes, 
  getMany,
  postMany,
  getFew,
  deleteMany,
  patchMany
};

routes.post("/login", bodyParser.json(), login);

routes.get("/products", getMany);
routes.post("/products", postMany);
routes.get("/product/:id", getFew);
routes.delete("/product/:id", deleteMany);
routes.patch("/product/:id", patchMany);

async function getMany(req, res) {
  res.send(await getProducts());
}

async function postMany(req, res) {
  const { productName, productDes, productPrice, productIMG, productQuan } = req.body;
  await addProduct(productName, productDes, productPrice, productIMG, productQuan);
  res.send(await getProducts());
}

async function getFew(req, res) {
  const id = +req.params.id;
  const item = await getProduct(id);
  res.send(item);
}

async function deleteMany(req, res) {
  try {
    const id = +req.params.id;
    await deleteProduct(id)
    const product = await getProducts()
    res.json({
      msg: 'Product deleted successfully', product
    })
  } catch (error) {
    console.error('Error deleting product');
    res.status(404).json({ error: 'error deleting product' });
  }
}

async function patchMany(req, res) {
  const id = +req.params.id;
  const product = await getProduct(id);
  const { productName, productDes, productPrice, productIMG, productQuan } = req.body;

  const updatedProductName = productName || product.productName;
  const updatedProductDes = productDes || product.productDes;
  const updatedProductPrice = productPrice || product.productPrice;
  const updatedProductIMG = productIMG || product.productIMG;
  const updatedProductQuan = productQuan || product.productQuan;

  await upProduct(updatedProductName, updatedProductDes, updatedProductPrice, updatedProductIMG, updatedProductQuan, id);
  res.json(await getProducts());
}

export default routes;
