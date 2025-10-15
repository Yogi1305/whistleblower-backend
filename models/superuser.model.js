import mongoose, { Schema } from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SuperUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true },
);

SuperUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 13);
  next();
});

SuperUserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

SuperUserSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullname: this.fullname
  },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "100d"
    }
  );
};

const SuperUser = mongoose.model("SuperUser", SuperUserSchema);

export default SuperUser;