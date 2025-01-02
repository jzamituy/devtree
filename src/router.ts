import { Router } from "express";
import User from "./models/User";

const router = Router();

router.get("/", (req, res) => {
  res.send('root');
});

router.get("/test", (req, res) => {
    res.send('test');
  });

router.post("/auth/register", (req, res) => {
  const user = new User({name:'test', email:'test@test.com', password:'test'})
  user.save()
  res.send('registered');
});

router.post("/auth/login", (req, res) => {
  res.send('login');
});
  
export default router;
