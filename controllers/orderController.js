import orderModel from "../models/orderModel.js";


// PLACE ORDER
const placeOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount, address } = req.body;

    const order = await orderModel.create({
      userId,
      products,
      totalAmount,
      address,
      status: "Pending",
    });

    res.json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};



// GET ALL ORDERS (ADMIN)
const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("userId")
      .populate("products.productId");

    res.json(orders);
  } catch (error) {
    res.json({ error: error.message });
  }
};



// // GET USER ORDERS
// const getUserOrders = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const orders = await orderModel.find({ userId });

//     res.json(orders);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// };



// UPDATE ORDER STATUS
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};



export { placeOrder, getOrders, updateOrder };