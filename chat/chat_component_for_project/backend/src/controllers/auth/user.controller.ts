import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { Request } from "express";
import jwt, { Secret } from "jsonwebtoken";
import prisma from "../../prisma_client";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  LoginDataType,
  LoginValidator,
  RegisterDataType,
  RegisterDataValidator,
  changePasswordValidator,
  resetPasswordValidator,
} from "../../validators/user/user.validator";
dotenv.config();

interface UserInter {
  id: string;
  email: string;
}

type UserType = UserInter | null;

export interface CustomRequest extends Request {
  user?: UserType;
}
const registerUser = asyncHandler(async (req: CustomRequest, res) => {
  try {
    const { username, email, password }: RegisterDataType =
      RegisterDataValidator(req.body);
    if (!username || !email || !password) {
      res.status(500).json({
        message: "Username or Email or Password is Missing",
      });
    }
    const userexisted = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });
    if (userexisted) {
      res.status(400).json({
        message: "User already existed with this email or username ",
      });
    }
    const profilePicture = `https://avatar.iran.liara.run/username?username=${username}`;
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: await bcrypt.hash(password, Number(process.env.HashKey)),
        profilePic: profilePicture,
      },
      select: {
        email: true,
        username: true,
      },
    });

    res.status(201).json({
      user,
      message: "User created Successfully",
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === "Invalid data provided. Please check your input."
    ) {
      return res.status(400).json({ message: "Enter Valid Data" });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
});

const loginUser = asyncHandler(async (req: CustomRequest, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(500).json({ message: "  Email or password is missing " });
    }
    const logindata = LoginValidator(req.body);
    if (logindata.success) {
      const userdetails = await prisma.user.findUnique({
        where: {
          email: logindata.data.email,
        },
      });
      if (userdetails !== null) {
        const passwordvalid = await bcrypt.compare(
          logindata.data.password,
          userdetails.password,
        );

        if (!passwordvalid) {
          res.status(400).json({
            message: "Password is Incorrect",
          });
        }

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ email }, secret as Secret, {
          expiresIn: "15d",
        });
        res.cookie("AuthToken", token, {
          maxAge: 15 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
        });

        res.status(200).json({
          userData: {
            id: userdetails.id,
            username: userdetails.username,
            profilePic: userdetails.profilePic,
          },
          message: "User LoggedIn",
        });
      }
      res.status(400).json({
        message: "user can't found",
      });
    } else {
      res.status(500).json({ message: "Validation failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Error with the login",
    });
  }
});

const getCurrentUser = asyncHandler(async (req: CustomRequest, res) => {
  res.status(200).json({
    user: req.user,
    message: "Users Details Feteched Successfully",
  });
});

const logoutUser = asyncHandler(async (req: CustomRequest, res) => {
  //TODO: clear the local store as well
  res.status(200).clearCookie("AuthToken").json({
    message: "User logged Out Successfully",
  });
});

const changePassword = asyncHandler(async (req: CustomRequest, res) => {
  try {
    console.log(req.body);
    const { newPassword, oldPassword } = req.body;
    console.log(newPassword);
    console.log(oldPassword);

    if (!newPassword || !oldPassword) {
      res.status(401).json({
        message: "Either or Both password field is empty",
      });
    }
    const bodychecker = changePasswordValidator(req.body);
    if (!bodychecker.success) {
      res.status(401).json({
        message: "Enter valid Password ",
      });
    }
    const userId: UserType = req.user as UserType;
    if (userId && userId.id !== null) {
      const userDeatials = await prisma.user.findUnique({
        where: {
          id: userId.id,
        },
      });
      const password: {
        oldPassword: string;
        newPassword: string;
      } = req.body;
      if (userDeatials) {
        const isOldPasswordCorrect = await bcrypt.compare(
          password.oldPassword,
          userDeatials.password,
        );
        if (!isOldPasswordCorrect) {
          res.status(401).json({
            message: "Old Password Is Incorrect",
          });
        }
      }
      await prisma.user.update({
        where: {
          id: userId.id,
        },
        data: {
          password: await bcrypt.hash(
            password.newPassword,
            Number(process.env.HashKey),
          ),
        },
      });
      res.status(200).json({
        message: "Password Updated",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Enter valid password ",
    });
  }
});

//TODO: this route will not work like this
const resetPassword = asyncHandler(async (req: CustomRequest, res) => {
  try {
    const bodychecker = resetPasswordValidator(req.body);
    if (!bodychecker.success) {
      res.status(401).json({
        message: "Enter valid new Password",
      });
    }
    const userId: UserType = req.user as UserType;
    if (userId && userId.id !== null) {
      const { newPassword } = req.body;
      await prisma.user.update({
        where: {
          id: userId.id,
        },
        data: {
          password: await bcrypt.hash(newPassword, Number(process.env.HashKey)),
        },
      });
      res.status(200).json({
        message: "Password Reset Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Error while Resetting Password Try Again",
    });
  }
});

const getUsers = asyncHandler(async (req: CustomRequest, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      where: {
        NOT: {
          id: req.user?.id,
        },
      },
      select: {
        id: true,
        username: true,
        profilePic: true,
      },
    });
    res.status(200).json({
      allUsers,
    });
  } catch (error) {
    console.error("Error from the getUsers controller", error);
    res.status(401).json({
      message: "Internal server error",
    });
  }
});
export {
  changePassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  getUsers,
};
