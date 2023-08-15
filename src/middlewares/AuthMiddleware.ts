import { Request, Response, NextFunction } from "express";
import AuthenticationService from "../services/AuthenticationService";
import UserRepository from "../repository/UserRepository";

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const cookie = req.headers.cookie;

    if (!cookie) {
      return res.status(401).json({
        "message": "Unauthenticated"
      });
    }

    const token = cookie.split('token=')[1];

    if (!token) {
      return res.status(401).json({
        "message": "Unauthenticated"
      });
    }

    const credential = AuthenticationService.decodeToken(token);

    req.app.locals.credential = credential;

    next();

  } catch (error) {
    return res.status(401).send(error);
  }
};
