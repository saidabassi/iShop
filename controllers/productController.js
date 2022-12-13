import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user.userId });
    res.status(200).json({
      products,
      totalProducts: products.length,
      numOfPages: 1,  
    });
    console.log(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
export const addProduct = async (req, res) => {
  const { name, quantity, price, description } = req.body;
  if (!name || !quantity || !price || !description) {
    throw new BadRequestError("Please provide all values");
  }
  let imageUrl = "";
  if (req.file) {
    imageUrl = req.file.filename;
  }

  req.body.createdBy = req.user.userId;
  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({
    product,
  });   
  console.log(product);
};
export const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    await Product.findOneAndDelete({ _id });
    res.status(200).send({ msg: "Product deleted" });
  } catch (error) {
    res.status(400).send({ msg: "cannot delete this Product", error });
  }
};
