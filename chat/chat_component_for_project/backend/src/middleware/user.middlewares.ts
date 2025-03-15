import { asyncHandler } from "../utils/asyncHandler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import prisma from "../prisma_client";
import { Request } from "express";

//TODO: add type to the user
interface User {
  id: string;
  email: string;
}
interface CustomRequest extends Request {
  user?: any;
}

export const verifyUser = asyncHandler(
  async (req: CustomRequest, res, next) => {
    const token: string =
      req.cookies.AuthToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        message: "token not found error Request",
      });
    }

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as Secret,
      ) as JwtPayload;
      const userDetails = jwt.decode(token);

      if (userDetails && typeof userDetails === "object") {
        const user = await prisma.user.findUnique({
          where: {
            email: userDetails.email,
          },
        });
        req.user = user;
      }

      next();
    } catch (error) {
      console.error("Verification failed:", error);
      return res.status(500).json({
        message: "Verification failed",
      });
    }
  },
);
