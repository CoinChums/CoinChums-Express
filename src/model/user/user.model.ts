import mongoose, { Document, Model } from "mongoose";
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  countryCode: number;
  selectedCurrencyCode: number;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Please enter your name"],
      text: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email id"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Passwords must have at least 6 characters in length"],
    },
    countryCode: {
      type: Number,
      required: true,
    },
    selectedCurrencyCode: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (
  this: Model<IUser>,
  email: string,
  password: string
): Promise<IUser> {
  const user = await this.findOne({
    email,
  });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Incorrect Password");
  }
  throw new Error("Incorrect Email ID");
};

const User = mongoose.model<IUser>("User", UserSchema);

module.exports = { User };
