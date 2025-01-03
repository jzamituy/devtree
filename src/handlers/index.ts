import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils";


// Handler examples most basic architecture

export const registerUser = async (req: Request, res: Response) => {
    const { name = 'jorge', password = '1234', email = 'jorge@jorge.com' } = req.body;

    const user = new User({ name, password, email });
    user.password = await hashPassword(password);
    user.save();
    res.json(user);
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    res.json(user);
};