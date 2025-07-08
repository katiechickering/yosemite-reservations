import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protect = async (req, res, next) => {
    let token = req.cookies.jwt
    if( token ){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.userId).select('-password')
            if (!user) {
                return res.status(401).json('User not found')
            }
            req.user = user
            next()
        }catch(error){res.status(401).json('Not Authorized, token failed')}
    }
    else {
        res.status(401).json('Not Authorized, no token')
    }
}