import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils";
import slugify from "slugify";
import { validationResult } from "express-validator";
import { validatePassword } from "../utils";
// Handler examples most basic architecture

export const registerUser = async (req: Request, res: Response): Promise<void> => {

    const { name , password , email , handle} = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
         res.status(409).json({ message: "User already exists for this email" });
         return;
    }

    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        res.status(409).json({ message: "Handle already exists" });  
        return;
    }

    const user = new User({ name, password, email, handle });
    user.password = await hashPassword(password);
    user.handle = slugify(handle, '');
    user.save();
    res.status(201).json({ message: "User created successfully" });
    return;
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    res.status(200).json({ message: "Login successful" });
    return;
};