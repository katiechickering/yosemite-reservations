import User from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"

// Read All
export const getUsers = async(req, res) => {
    try {
        const USERS = await User.find().select(`-password`)
        res.status(200).json(USERS)
    } catch (error){ res.status(400).json(error) }
}

// Login
export const loginUser = async(req, res) => {
    const { userName, password } = req.body
    const user = await User.findOne({ userName })
    if( user && (await user.matchPassword(password)) ){
        const data = {
            _id : user._id,
            userName : user.userName,
        }
        generateToken(res, user._id)
        res.status(200).json(data)
    }
    else {res.status(401).json("User password or email is not valid.") }
}

// Create
export const registerUser = async(req, res) => {
    try {
        const USER = await User.create(req.body)
        generateToken(res, USER._id)
        delete USER.password
        res.status(201).json( USER )
    } catch (error){ res.status(400).json(error) }
}

// Logout
export const logOutUser = async(req, res) => {
    res.cookie('jwt','', {httpOnly: true, expires: new Date(0)})
    res.status(200).json({message: 'Logged out successfully.'})
}

// Read One
export const getUserProfile = async (req, res) => {
    try {
        const USER = await User.findById(req.user._id).select(`-password`)
        if (!USER) {
            return res.status(404).json({ message: 'User not found.' })
        }
        res.status(200).json(USER)
    } catch (error) {
        res.status(400).json({ message: error.message || 'An error occurred while fetching the profile.' })
    }
}

// Check if userName exists
export const checkUserName = async (req, res) => {
    try {
        const {userName} = req.query
        const USER = await User.findOne({ userName });
        res.status(200).json({ exists: !!USER })
    } catch (error) {
        res.status(400).json({ message: error.message || 'An error occurred while fetching users.' })
    }

}