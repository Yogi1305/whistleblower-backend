import mongoose, { Schema } from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
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
        fullname: {
            type: String,
            trim: true,
            index: true
        },
        department: {
            type: String,
            ref: "Department",
        },
        avatar: {
            type: String,
            default: "https://res.cloudinary.com/dh8kz1otb/image/upload/v1736774750/yeychjvobach4nsoufus.jpg"
        },
        coverImage: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
    },
    { timestamps: true },
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 13);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
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

const User = mongoose.model("User", userSchema);
export default User