import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters long"],
        },
        lastName:{
            type: String,
            minLength: [3, "Last name must be at least 3 characters long"]
        },
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
        minLength:[6, "Password must be at least 6 characters long"],
    },
    socketId:{
        type: String,
    }
});
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
const User = mongoose.model("User", userSchema);
export default User;