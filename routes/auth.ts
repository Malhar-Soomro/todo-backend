import {Request, Response} from "express";
import bcrypt from "bcrypt";

const router = require("express").Router();
import User from "../models/User";

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
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(401).json("Wrong Credentials");
    }

    // compare the passwords
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
       return res.status(401).json("Wrong Credentials");
    }

    const { password, ...others } = user.toObject();
    return res.status(200).json({ ...others });
    
  } catch (error) {
    console.log("error ->", error);
    return res.status(500).json(error);
  }
});

module.exports = router;
