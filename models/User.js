import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide your email"],
      validate: {
        validator: validator.isEmail,
        message: "please privide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      select: false,
    },
    lastName: {
      type: String,
      default: "lastName",
    },
    location: {
      type: String,
      default: "My city",
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};
export default mongoose.model("User", UserSchema);
