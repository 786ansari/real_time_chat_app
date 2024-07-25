const userModel = require("../models/users.models");
const AuthUtils = require("../utils/Auth");
const Auth = {};
Auth.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({
      email: new RegExp(`^${email.toLowerCase()}$`, "i"),
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already Exits", status: false });
    }
    const userpassword = await AuthUtils.encryptPassword(password);
    const newuser = new userModel({
      email: email,
      name: name,
      password: userpassword,
    });
    await newuser.save();
    return res.json({ message: "User successfully register!!", status: true });
  } catch (error) {
    return res.status(500).json({ error: error, status: false });
  }
};
Auth.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const valid = await userModel.findOne({
      email: new RegExp(`^${email.toLowerCase()}$`, "i"),
    });
    console.log("object", valid);
    if (!valid) {
      return res
        .status(401)
        .json({ status: false, message: "User dont exist" });
    }
    const isPasswordValid = await AuthUtils.comparePassword(
      password,
      valid.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Password not matched!!", status: false });
    }

    return res
      .status(200)
      .json({ message: "Succssfully joined!!", status: true });
  } catch (error) {
    return res.status(500).json({ error: error, status: false });
  }
};
Auth.getProfile = async (req, res) => {
  const { email } = req.body;
  try {
    const valid = await userModel.findOne({
      email: new RegExp(`^${email.toLowerCase()}$`, "i"),
    });
    if (!valid) {
      return res
        .status(200)
        .json({ status: false, message: "User dont exist" });
    }

    return res
      .status(200)
      .json({
        message: "User found successfully!!",
        status: true,
        data: valid,
      });
  } catch (error) {
    return res.status(500).json({ error: error, status: false });
  }
};

Auth.getAllUsers = async (dbId,io) => {
  try {
    console.log("getusergetuser",dbId)
    const found = await userModel.find({ _id: { $ne: dbId } }).lean();
    io.to(dbId).emit("allusers",found)
  } catch (error) {
    console.log(error);
  }
};

module.exports = Auth;
