import { createUserService } from "../services/user.service.js";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";
const registerUser = async(req, res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {firstName,lastName, email, password} = req.body;
        const hashPassword = await User.hashPassword(password);
        const user = await createUserService({firstName,lastName, email, password: hashPassword});
        console.log(user);
        const token = user.generateToken();
        res.status(201).json({user, token});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}
const loginUser = async (req, res) => {
    try {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array()});
        }
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(404).json({message: "Invalid email or password"});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = user.generateToken();
        return res.status(200).json({user, token});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}
const showProfile = (req, res) => {
    return res.status(200).json({user: req.user});
}
export { registerUser, loginUser, showProfile };