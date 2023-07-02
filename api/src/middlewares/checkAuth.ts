import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { User } from "../models/user";

interface IPayload {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

export const chekAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = Jwt.verify(
        token,
        process.env.JWT_SECRET || "cirilla456852"
      ) as IPayload;
      const user = await User.findOne({
        where: { id: decoded.id },
        attributes: {
          exclude: ["password"],
        },
      });
      if (!user) res.status(404).json({ message: "User not found" });
      const dateExp = new Date(decoded.exp * 1000);
      const date = new Date();

      if (dateExp < date) {
        res.status(401).json("Token Expired");
      }
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(404).json({ message: "Missing authorization headers" });
  }
};
