import mongoose, {Schema} from "mongoose";

const cartSchema  = new Schema(
    {
        userId : {type: Schema.Types.ObjectId, ref: "User", required: true},
        products : [{type: Schema.Types.ObjectId, ref: "Products", required: true}],
    }
)

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;