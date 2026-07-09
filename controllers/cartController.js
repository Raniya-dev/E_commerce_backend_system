import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const userId = req.user.id;

    const existingItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();

      return res.json({
        message: "Quantity updated",
        cart: existingItem,
      });
    }

    const cart = await Cart.create({
      user: userId,
      product: productId,
      quantity: 1,
    });

    res.status(201).json({
      message: "Added to cart",
      cart,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.find({
      user: userId,
    }).populate("product");

    res.json(cart);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


export const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Removed from cart",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};