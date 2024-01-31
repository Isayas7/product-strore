import Jwt from "jsonwebtoken";
import { createError } from "./createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "You are not authorized!"));
  }
  Jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Your token is  invalid"));
    req.user = user;
    next();
  });
};

export const verifyStoreManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "sm") {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.role === "sm" ||
      req.user.role === "admin" ||
      req.user.role === "super"
    ) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin" || req.user.role === "super") {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
