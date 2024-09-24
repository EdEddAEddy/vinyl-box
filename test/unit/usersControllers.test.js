import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userModel from "@/models/users/userModel.js";
import {
  userRegister,
  userLogin,
  getUser,
  updateMeUser,
  getPlaylistsById,
} from "@/controllers/usersControllers.js";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("@/models/users/userModel.js");

describe("Users Controllers", () => {
  let req, res;
  beforeEach(() => {
    req = {
      body: {},
      user: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("userRegister", () => {
    it("should successfully register a new user", async () => {
      const passwordHash = "PasswordHash123";

      req.body = {
        username: "test",
        email: "test@email.com",
        password: "test123",
      };

      const mockUser = {
        user_id: 1,
        username: "test",
        email: "test@email.com",
        password: passwordHash,
      };

      userModel.emailExist.mockResolvedValue(false);
      bcrypt.hash.mockResolvedValue(passwordHash);
      userModel.createUser.mockResolvedValue(mockUser);

      await userRegister(req, res);

      expect(userModel.emailExist).toHaveBeenCalledWith(req.body.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(
        req.body.password,
        expect.any(Number)
      );
      expect(userModel.createUser).toHaveBeenCalledWith(
        "test",
        "test@email.com",
        passwordHash
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          user_id: 1,
          username: "test",
          email: "test@email.com",
        })
      );
    });
    it("should return an error if the email already exists", async () => {
      userModel.emailExist.mockResolvedValue(true);

      await userRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Email already exists" });
    });

    it("should return 500 if error occurs", async () => {
      userModel.emailExist.mockRejectedValue(new Error("Database Error"));

      await userRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error.",
      });
    });
  });

  describe("userLogin", () => {
    it("should successfully log in a user", async () => {
      req.body = {
        email: "test@email.com",
        password: "password123",
      };

      const mockUser = {
        user_id: 1,
        email: "test@email.com",
        password: "hashedPassword",
        role: "user",
      };

      userModel.findUserByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token");

      await userLogin(req, res);

      expect(userModel.findUserByEmail).toHaveBeenCalledWith(req.body.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        req.body.password,
        mockUser.password
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser.user_id, role: mockUser.role },
        expect.any(String),
        { expiresIn: "24h" }
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: "token" });
    });

    it("should return an error if user not exists", async () => {
      userModel.findUserByEmail.mockResolvedValue(null);

      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not exists" });
    });

    it("should return an error if password incorrect", async () => {
      bcrypt.compare.mockResolvedValue(false);

      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not exists" });
    });

    it("should return 500 if error occurs", async () => {
      userModel.findUserByEmail.mockRejectedValue(new Error("Database error"));

      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });

  describe("getUser", () => {
    it("should return the logged in user", async () => {
      req.user = {
        userId: 1,
      };

      const mockUser = {
        user_id: req.user.userId,
        username: "test",
        email: "test@email.com",
        cover_url: "test.jpg",
        role: "test",
      };

      userModel.findUserById.mockResolvedValue(mockUser);

      await getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  });
});
