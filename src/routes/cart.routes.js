import express from "express";
import { getAllCartItems, getCartItem, addProduct, removeProduct } from '../controllers/cart.controller.js';
import { authentication } from '../middlewares/user.middlewares.js';

const cartRouter = express.Router();

cartRouter.post('/:id',authentication, addProduct);
cartRouter.get("/details", authentication, getAllCartItems);
cartRouter.get("/:id", getCartItem);
cartRouter.delete("/:id", removeProduct);

export default cartRouter;