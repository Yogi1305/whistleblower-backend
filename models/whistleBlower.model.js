

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const WhistleBlowerSchema = new mongoose.Schema({
  username: {
    type: String,
    required:true,
  },
  password: {
    type: String,
    required: true,
  },
});

WhistleBlowerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 13);
  next();
});

WhistleBlowerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

WhistleBlowerSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    username: this.username,
  },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "100d"
    }
  );
};

const WhistleBlower = mongoose.model("WhistleBlower", WhistleBlowerSchema);

export default WhistleBlower;
