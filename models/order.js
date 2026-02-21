import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
    {
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  shippingData: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  totalPrice: { type: Number, required: true },
});
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
