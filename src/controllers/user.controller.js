import User from "../models/user.model.js";
import { sendEmail } from "../utilities/email.js";
import { createToken } from "../utilities/jwt.js";

// const register = async (req, res) => {
//   try {
//     const { firstname, lastname, email, number, password } = req.body;
//     const user = await User.create({
//       firstname,
//       lastname,
//       email,
//       number,
//       password,
//     });
//     const option = {
//       from: "jayantpachpohe123@gmail.com",
//       to: email,
//       subject: "Welcome to ShopClues",
//       html: `<h1>Welcome ${firstname}</h1> 
//             <p>Thanks for registering on ShopClues</p>
//             <p>Now you can login to ShopClues with your email and password</p>
//             <p>Thank You</p>`,
//     };
//     sendEmail(option)
//     return res.status(201).send({ message: "User registered Successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .send({ message: "Error registering user", error: error.message });
//   }
// };

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, number, password } = req.body;
    const user = await User.create({
      firstname,
      lastname,
      email,
      number,
      password,
    });
    const option = {
      from: "jayantpachpohe123@gmail.com",
      to: email,
      subject: "Welcome to ShopClues",
      html: `<h1>Welcome ${firstname}</h1> 
            <p>Thanks for registering on ShopClues</p>
            <p>Now you can login to ShopClues with your email and password</p>
            <p>Thank You</p>`,
    };
    sendEmail(option);
    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in register:", error); // Log the error
    return res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    const token = createToken({ id: user._id });
    res.cookie("authToken", token, {
      path: "/",
      expires: new Date(Date.now() + 3600000),
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });
    return res
      .status(200)
      .send({ message: "User logged in successfully", token });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in logging the user", error: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("authToken");
  return res.status(200).send({ message: "User logged out successfully" });
};

const deleteUser = async (req, res) => {
  try {
    console.log(req.user);
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(200)
      .send({ message: "Error in deleting the user", error: error.message });
  }
};

export { register, login, logout, deleteUser };