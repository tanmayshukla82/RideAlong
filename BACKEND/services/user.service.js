import User from "../models/user.model.js";

const createUserService = async ({firstName, lastName, email, password}) => {
    try{
        if(!firstName || !lastName || !email || !password){
            throw new Error("All fields are required");
        }
        const user = new User({
            fullName:{
                firstName,
                lastName
            },
            email,
            password
        });
        await user.save();
        return {message: "User registered successfully"};
    }catch(error){
        return {message: "Internal server error"};
    }
};
export {
    createUserService
}