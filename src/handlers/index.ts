import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils";
import slugify from "slugify";
import { validationResult } from "express-validator";
import { validatePassword } from "../utils";
// Handler examples most basic architecture

export const registerUser = async (req: Request, res: Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name , password , email , handle} = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(409).json({ message: "User already exists for this email" });
    }

    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        return res.status(409).json({ message: "Handle already exists" });  
    }

    const user = new User({ name, password, email, handle });
    user.password = await hashPassword(password);
    user.handle = slugify(handle, '');
    user.save();
    res.json(user);
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json(user);
};