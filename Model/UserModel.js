import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// * user schema
const UserModel = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [3, "Username must be at least 3 characters."],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Email must be a valid email address"],
    unique: [true, "This email is used already"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters."],
  },
});

//* hashing before save passwrod
UserModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// * compare password method
UserModel.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

// * delete password from the result
UserModel.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export default mongoose.model("User", UserModel);
