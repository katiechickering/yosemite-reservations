import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (res: Response, userId: string): void => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24
        });
    } catch (error) {
        res.status(500).json({ message: 'Token generation failed' });
    }
};

export default generateToken;
