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
        const token = User.generateToken();
        res.status(201).json({user, token});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}
export {
    registerUser
}