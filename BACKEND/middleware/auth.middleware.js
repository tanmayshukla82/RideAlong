import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authUser = async(req, res, next) => {
    const token = req.header('Authorization').split(' ')[1] || req.cookies.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyUser) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(verifyUser._id);
        console.log(user);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

export {
    authUser
}