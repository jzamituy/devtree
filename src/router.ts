import { Request, Response } from "express";
import { body } from "express-validator";
import { Router } from "express";
import { registerUser, loginUser } from "./handlers";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send('root');
});

router.get("/test", (req: Request, res: Response) => {
    res.send('test');
  });

router.post("/auth/register", [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("password").isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("email").isEmail().withMessage("Invalid email"),
  body("handle").isString().notEmpty().withMessage("Handle is required"),
], (req: Request, res: Response  ) => {
  registerUser(req, res);
});

router.post("/auth/login", (req: Request, res: Response) => {
  loginUser(req, res);
});
  
export default router;
