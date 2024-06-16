// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./src/config/db.js";
// import cookieParser from "cookie-parser";
// import userRouter from "./src/routes/user.routes.js";
// import productRouter from "./src/routes/product.routes.js";
// import categoryRouter from "./src/routes/category.routes.js";
// import cartRouter from "./src/routes/cart.routes.js";


// dotenv.config();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/api/user", userRouter);
// app.use("/api/products", productRouter);
// app.use("/api/category", categoryRouter);
// app.use("/api/cart", cartRouter);

// app.get("/", (req, res) => {
//     res.send(200).send("Welcome to Home Page");
// })

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, ()=>{
//     connectDB();
//     console.log(`Server is listening on ${PORT}`)
// })

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.routes.js";
import productRouter from "./src/routes/product.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import cartRouter from "./src/routes/cart.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to Home Page");
});

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
