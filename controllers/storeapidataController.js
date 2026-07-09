import axios from "axios";
import { productModel } from "../models/product.js";

// Import FakeStore products (run once)
 const storeapidata = async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");

    const products = response.data;

    for (const item of products) {
      const exists = await productModel.findOne({
        name: item.title,
      });

      if (!exists) {
        await productModel.create({
          name: item.title,
          description: item.description,
          price: item.price,
          category: item.category,
          image: item.image,
          rating: item.rating.rate,
          stock: 100,
        });
      }
    }

    res.status(200).json({
      message: "Products imported successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get all products
 const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    res.status(200).json(products);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get single product
 const getSingleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export {storeapidata,getProducts,getSingleProduct}