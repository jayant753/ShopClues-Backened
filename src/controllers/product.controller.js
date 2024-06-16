// import Products from "../models/product.model.js";

// const getAllProducts = async (req, res) => {
//     try {
//         const products = await Products.find({}).populate("category").populate({path : "userId", select: "firstname"});;
//         return res.status(200).send(products);
//     } catch (error) {
//         return res.status(500).send({
//             message : "Error in getting all products",
//             error : error.message
//         })
//     }
// }

// const createProduct = async (req, res) => {
//     try {
//         req.body.userId = req.user._id;
//         const Product = await Products.create(req.body);
//         return res.status(201).send({message : "Product created successfully"}, Product);
//     } catch (error) {
//         return res.status(500).send({
//             message : "Error in creating Product",
//             error : error.message
//         })
//     }
// }

// const getProduct = async (req, res) => {
//     const {id} = req.params;
//     try {
//         const Product = await Products.findById(id);
//         return res.status(200).send(Product);
//     } catch (error) {
//         return res.status(500).send({
//             message : "Error in getting Product",
//             error : error.message
//         })
//     }
// }

// const updateProduct = async (req, res) => {
//     const {id} = req.params;
//     try {
//         const Product = await Products.findByIdAndUpdate(id, req.body, {new:true});
//         return res.status(200).send({message : "Product updated successfully"})
//     }
//     catch(error) {
//         return res.status(500).send({
//             message : "Error in updating Product",
//             error : error.message
//         })
//     }
// }

// const deleteProduct = async (req, res) => {
//     const {id} = req.params;
//     try {
//         const Product = await Products.findByIdAndDelete(id);
//         return res.status(200).send({message : "Product deleted successfully"})
//     } catch (error) {
//         return res.status(500).send({
//             message : "Error in deleting Product",
//             error : error.message
//         })
//     }
// }


// export {
//     getAllProducts, 
//     createProduct,
//     getProduct, 
//     updateProduct,
//     deleteProduct
// }

import Product from "../models/product.model.js";

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send({
            message: "Error in getting all products",
            error: error.message
        });
    }
}

// const createProduct = async (req, res) => {
//     try {
//         const newProduct = new Product(req.body);
//         const savedProduct = await newProduct.save();
//         return res.status(201).send({ message: "Product created successfully", product: savedProduct });
//     } catch (error) {
//         return res.status(500).send({
//             message: "Error in creating product",
//             error: error.message
//         });
//     }
// }

const createProduct = async (req, res) => {
    try {
        const { id, title, price, description, category, image, rating } = req.body;
        const newProduct = new Product({
            id,
            title,
            price,
            description,
            category,
            image,
            rating: {
                rate: rating.rate,
                count: rating.count
            }
        });

        const savedProduct = await newProduct.save();
        return res.status(201).send({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
        return res.status(500).send({
            message: "Error in creating product",
            error: error.message
        });
    }
};

const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({
            message: "Error in getting product",
            error: error.message
        });
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        return res.status(200).send({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        return res.status(500).send({
            message: "Error in updating product",
            error: error.message
        });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        return res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).send({
            message: "Error in deleting product",
            error: error.message
        });
    }
}

const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        if (!products.length) {
            return res.status(404).send({ message: "No products found in this category" });
        }
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send({
            message: "Error in getting products by category",
            error: error.message
        });
    }
}

export {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
}
