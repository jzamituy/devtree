import { Request, Response } from "express";

import { Router } from "express";
import { registerUser, loginUser } from "./handlers";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send('root');
});

router.get("/test", (req: Request, res: Response) => {
    res.send('test');
  });

router.post("/auth/register", (req: Request, res: Response  ) => {
  registerUser(req, res);
});

router.post("/auth/login", (req: Request, res: Response) => {
  loginUser(req, res);
});
  
export default router;
