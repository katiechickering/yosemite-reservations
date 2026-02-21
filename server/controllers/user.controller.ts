import { Request, Response } from 'express';
import User, { IUser } from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

interface AuthRequest extends Request {
    user?: {
        _id: string;
    };
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const USERS = await User.find().select(`-password`);
        res.status(200).json(USERS);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName }) as IUser | null;
    
    if (user && (await user.matchPassword(password))) {
        const data = {
            _id: user._id,
            userName: user.userName,
        };
        generateToken(res, user._id.toString());
        res.status(200).json(data);
    } else {
        res.status(401).json("User password or email is not valid.");
    }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const USER = await User.create(req.body) as IUser;
        
        generateToken(res, USER._id.toString());
        
        const userObj = USER.toObject();
        delete (userObj as any).password;
        
        res.status(201).json(userObj);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const logOutUser = async (req: Request, res: Response): Promise<void> => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully.' });
};

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void | Response> => {
    try {
        const USER = await User.findById(req.user?._id).select(`-password`);
        if (!USER) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(USER);
    } catch (error: any) {
        res.status(400).json({ message: error.message || 'An error occurred while fetching the profile.' });
    }
};

export const checkUserName = async (req: Request, res: Response): Promise<void> => {
    try {
        const userName = req.query.userName as string;
        const USER = await User.findOne({ userName });
        res.status(200).json({ exists: !!USER });
    } catch (error: any) {
        res.status(400).json({ message: error.message || 'An error occurred while fetching users.' });
    }
};
