import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number, 
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    }, 
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default:'pending',
},
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);


        