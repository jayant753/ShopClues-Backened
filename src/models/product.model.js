// import mongoose from "mongoose";

// const ratingSchema = new mongoose.Schema({
//     rate: { type: Number, required: true },
//     count: { type: Number, required: true }
// });

// const productSchema = new mongoose.Schema({
//     id: { type: Number, required: true, unique: true },
//     title: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String, required: true },
//     category : {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Category"
//     },
//     userId : {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     image: { type: String, required: true },
//     rating: { type: ratingSchema, required: true }
// });

// const Products = mongoose.model('Products', productSchema);

// export default Products;

import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    rate: { type: Number, required: true },
    count: { type: Number, required: true }
});

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, 
    image: { type: String, required: true },
    rating: { type: ratingSchema, required: true }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
