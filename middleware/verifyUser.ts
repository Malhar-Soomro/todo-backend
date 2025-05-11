import {NextFunction, Request, Response} from "express";
import {JsonWebTokenError} from "jsonwebtoken";
import {IUser} from "../models/User";

const jwt = require("jsonwebtoken");

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_SEC,
      (error: JsonWebTokenError, user: IUser) => {
        if (error) {
          // error
          res.status(403).json("token is invalid!");
          return;
        }
        // success
        req.user = user;
        next();
      }
    );
  } else {
    res.status(401).json("You are not authenticated");
    return; 
  }
};

export default verifyUser;
