import express, { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Generate Token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SEC || "secret", { expiresIn: "1d" });
};

// register
router.post("/register", async (req: Request, res: Response) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login
router.post("/login", async (req: Request, res: Response) => {

  console.log(req.body);

  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
       res.status(401).json("user not found");
       return;
    }

    // compare the passwords
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        res.status(401).json("Wrong Credentials");
        return;
    }

    // generate token
    const token = generateToken(user._id.toString());

    const { password, ...others } = user.toObject();
    res.status(200).json({ ...others, token });
    return; 
    
  } catch (error) {
    console.log("error ->", error);
    res.status(500).json(error);
    return;
  }
});

module.exports = router;
