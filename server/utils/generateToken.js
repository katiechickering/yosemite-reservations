import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 1000 * 60 * 60 * 24
        })
    } catch (error) {
        res.status(500).json({ message: 'Token generation failed' })
    }
}

export default generateToken