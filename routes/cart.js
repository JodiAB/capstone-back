
import express from 'express';
import {addCart,updateCartItem,getCartItems,removeFromCart,} from '../controller/cart.js'; 

const cartRouter = express.Router();


cartRouter.post('/cart/add', addCart);
cartRouter.patch('/cart/update/:cartItemId', updateCartItem);
cartRouter.get('/cart/:userId/items', getCartItems);
cartRouter.delete('/cart/remove/:cartItemId', removeFromCart);

export default cartRouter;
