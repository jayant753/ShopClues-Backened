// import express from "express";
// import { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct} from "../controllers/product.controller.js";
// import { authentication } from "../middlewares/user.middlewares.js";

// const productRouter = express.Router();

// productRouter.get("/products", getAllProducts);
// productRouter.get("/:id", getProduct);
// productRouter.post("/create", authentication, createProduct);
// productRouter.patch("/:id", updateProduct);
// productRouter.delete("/:id", deleteProduct);

// export default productRouter;


import express from "express";
import { 
    getAllProducts, 
    createProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct,
    getProductsByCategory 
} from "../controllers/product.controller.js";
import { authentication } from "../middlewares/user.middlewares.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/category/:category", getProductsByCategory); // New route to get products by category
productRouter.get("/:id", getProduct); // Adjusted to match endpoint pattern
productRouter.post("/create", authentication, createProduct); // Adjusted to match endpoint pattern
productRouter.patch("/:id", updateProduct); // Adjusted to match endpoint pattern
productRouter.delete("/:id", deleteProduct); // Adjusted to match endpoint pattern

export default productRouter;
