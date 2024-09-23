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
      userModel.emailExist.mockResolvedValue(false);
      bcrypt.hash.mockResolvedValue(passwordHash);
      userModel.createUser.mockResolvedValue({
        user_id: 1,
        username: "test",
        email: "test@email.com",
        password: passwordHash,
      });

      await userRegister(req, res);

      expect(userModel.emailExist).toHaveBeenCalledWith("test@email.com");
      expect(bcrypt.hash).toHaveBeenCalledWith("test123", expect.any(Number));
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
      req.body = {
        username: "teste",
        email: "existente@email.com",
        password: "senha123",
      };
      userModel.emailExist.mockResolvedValue(true);

      await userRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Email already exists" });
    });
  });

  describe("Users Login", () => {
    describe("");
  });
});
