import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// show login page
const login = (req, res) => {
res.render("auth/login");
};

// validate login
const validateUser = async (req, res) => {
const { email, password } = req.body;

const user = await userModel.findOne({ email });

if (!user) {
return res.redirect("/auth/login");
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
return res.redirect("/auth/login");
}

// create session
req.session.user = user;

res.redirect("/"); // or "/"
};

// show register page
const register = (req, res) => {
res.render("auth/register");
};

// register new user
const registerUser = async (req, res) => {
try {
const { name, email, password, role } = req.body;

const hashedPassword = await bcrypt.hash(password, 10);

await userModel.create({
  name,
  email,
  password: hashedPassword,
  role,
});

// after register go to login page
res.redirect("/auth/login");

} catch (error) {
console.log(error);
res.redirect("/auth/register");
}
};

// logout
const logout = (req, res) => {
req.session.destroy(() => {
res.redirect("/auth/login");
});
};

export { login, validateUser, register, registerUser, logout };
