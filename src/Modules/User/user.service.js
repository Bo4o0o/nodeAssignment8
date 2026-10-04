import UserModel from "../../DB/Models/user.model.js"

export const signUp = async(req,res)=>{
    try {
        const{name,email,password,phone, age}= req.body;
        const userEmail = await UserModel.findOne({email});
        if(userEmail) return res.status(404).json({message:"Email already Exist"});
        const user = await UserModel.create({name,email,password,phone, age});
        res.status(201).json({status: "success" , message: "User created successfully" , user : user});
    } catch (error) {
        res.status(400).json({status: "fail" , message: error.message});
    }
}

export const login = async(req,res)=>{
    try {
        const{email,password}= req.body;
        const user = await UserModel.findOne({email , password});
        if(!user) return res.status(404).json({message:"Invalid Email or password"});
        res.status(200).json({status: "success",message: "Login successful", user: user});
    } catch (error) {
        res.status(400).json({status: "fail" , message: error.message});
    }
}

export const updateUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        if (email && email !== user.email) {
            const userEmail = await UserModel.findOne({ email });
            if (userEmail) {
                return res.status(409).json({
                    message: "Email Already Exist"
                });
            }
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    email,
                    age
                }
            },
            {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const deleteUser = async(req,res)=>{
    try {
        const{id}= req.query;
        const user = await UserModel.findByIdAndDelete({_id:id});
        if(!user) return res.status(404).json({message:"User Not Found "});
        res.status(200).json({status: "success",message: "User deleted successfully"});
    } catch (error) {
        res.status(400).json({status: "fail" , message: error.message});
    }
}
export const getUserById = async(req,res)=>{
    try {
        const{id}= req.query;
        const user = await UserModel.findById(id);
        if(!user) return res.status(404).json({message:"User Not Found "});
        res.status(200).json({status: "success",message: "User found", user: user});
    } catch (error) {
        
    }
}

