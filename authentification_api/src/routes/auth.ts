import { Request, Response } from "express";
const router = require("express").Router();
const User = require("../../Model/User");
require("dotenv").config();

const jwt = require("jsonwebtoken");

router.post("/register", async (req: Request, res: Response) => {
  const alreadyExistUser = await User.findOne({
    where: { email: req.body.email },
  });

  if (alreadyExistUser) {
    return res.status(400).json({ error: "This email is already used." });
  }

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  const savedUser = await newUser.save().catch((error: any) => {
    res.status(400).json({
      error: "User can't be registered now. Please try again later.",
      error2: error,
    });
  });

  if (savedUser) {
    res.status(201).json({ message: "User have been registered." });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return res.status(400).json({ error: "Email or password incorrect." });
  }

  if (user.password !== req.body.password) {
    return res.status(400).json({ error: "Email or password incorrect." });
  }

  const userToken = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.header("auth-token", token).json({ token: token, expiresAt: Date.now() });
});

router.put("/edit", authenticateToken, async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { id: req.body.tokeninfo.id } });
  if (!user) {
    return res.status(400).json({ error: "User is unfindable." });
  }

  user.set(req.body);

  await user.save();
  return res.status(200).send("User has been modified");
});

router.get(
  "/getinformations",
  authenticateToken,
  async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { id: req.body.tokeninfo.id } });
    if (!user) {
      return res.status(400).json({ error: "This user does not exist." });
    } else {
      delete user.dataValues.password;
      return res.status(200).send(user);
    }
  }
);

router.delete(
  "/delete",
  authenticateToken,
  async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { id: req.body.tokeninfo.id } });
    if (!user || !req.body.password) {
      return res.status(400).json({ error: "This user does not exist." });
    }
    if (user.dataValues.password !== req.body.password) {
      return res.status(400).json({ error: "Wrong password." });
    }

    user.destroy();
    return res.status(200).json({ message: "User has been deleted." });
  }
);

function authenticateToken(req: Request, res: Response, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401);
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error: Error, user: object) => {
      if (error) {
        return res.status(401);
      }
      req.body.tokeninfo = user;
    }
  );
  next();
}
module.exports = router;
