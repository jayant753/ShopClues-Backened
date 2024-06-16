import Cart from "../models/cart.model.js";

const getAllCartItems = async (req, res) => {
  try {
    const allCartItems = await Cart.find({ userId: req.user._id })
      .populate({ path: "userId", select: ["firstname"] })
      .populate("Products");
    return res.status(200).send(allCartItems);
  } catch (error) {
    return res
      .status(500)
      .send({
        message: "Error in getting all Cart Items",
        error: error.message,
      });
  }
};

const getCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await Cart.findById(id);
    return res.status(200).send(cartItem);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in getting Cart Item", error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const allCartItems = await Cart.find({ userId: req.user._id });
    if (allCartItems.length > 0) {
      allCartItems[0].products.push(req.params.id);
      await allCartItems[0].save();
    } else {
      await Cart.create({
        userId: req.user._id,
        products: [req.params.id],
      });
    }
    return res
      .status(201)
      .send({ message: "Product added to Cart successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({
        message: "Error in adding product to Cart",
        error: error.message,
      });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Cart.findByIdAndDelete(id);
    return res
      .status(200)
      .send({ message: "Product removed from Cart successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in getting Product", error: error.message });
  }
};

export { 
    getAllCartItems, 
    getCartItem, 
    addProduct, 
    removeProduct 
};
