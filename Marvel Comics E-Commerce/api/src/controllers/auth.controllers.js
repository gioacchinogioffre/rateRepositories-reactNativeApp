import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config'
import Role from '../models/Role';


export const signup = async (req,res)=>{
    try{
        const {username, email, password, roles}= req.body;
        if(!username || !email || !password){
           return res.status(400).json({message: "Missing data"})
        }
        let newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })
    
        if(roles){
            const foundRoles = await Role.find({name: {$in: roles}})
            newUser.roles = foundRoles.map(role=> role._id)
        }
        else{
            const role = await Role.findOne({name:"user"})
            newUser.roles = [role._id]
        }
        const savedUser = await newUser.save();
        console.log(savedUser)
        const token = jwt.sign({id:savedUser._id}, config.SECRET, {
            expiresIn: 86400 //24h
        })
        res.status(200).json({token})
    }catch(error){
        res.status(400).json({message:`${error}`})
    }
   
}

export const signin = async (req,res)=>{
    try{
        const {email} = req.body
        const userFound = await User.findOne({email: email}).populate("roles")
        if(!userFound) return res.status(400).json({message:"User not Found"})
        
        const matchPassword = await User.comparePassword(req.body.password, userFound.password)
        
        if(!matchPassword) return res.status(401).json({token: null, message:"Invalid Password"})
        const token = jwt.sign({id: userFound._id}, config.SECRET,{
            expiresIn: 86400
        })
        res.json({token})
    }catch(error){
        res.status(400).json({message:`${error}`})
    }
   
}