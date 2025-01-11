import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { registerUser, loginUser } from "./handlers";
import { handleValidationErrors } from "./middleware/validation";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.send('root');
});

router.get("/test", (_req: Request, res: Response): void => {
  res.send('test');
});

router.post("/auth/register", [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("password").isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("email").isEmail().withMessage("Invalid email"),
  body("handle").isString().notEmpty().withMessage("Handle is required"),
], handleValidationErrors, registerUser);

router.post("/auth/login", [
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
], handleValidationErrors, loginUser);
    
export default router;
