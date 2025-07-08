import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 69 * 24
        })
    } catch (error) {
        res.status(500).json({ message: 'Token generation failed' })
    }
}

export default generateToken