const { SendVerificationCode,WelcomeEmail } = require("../middleware/emailveri");
const USER = require("../models/Auth")
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if the user already exists
        let user = await USER.findOne({ email });
        if (user) {
            return res.status(408).json({
                success: false,
                message: "User already exists"
            });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random()*900000).toString()
        // Create a new user
        user = await USER.create({
            name,
            email,
            password: hashedPassword,
            verificationCode
        });
        await user.save()
        SendVerificationCode(user.email, user.verificationCode )
        res.status(200).json({
            success: true,
            message: "Registered Successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message,
        });
    }
};
// verify email

const VerfiyEmail=async(req,res)=>{
    try {
        const {code}=req.body 
        const user= await USER.findOne({
            verificationCode:code,
            // verficationTokenExpiresAt:{$gt:Date.now()}
        })
        if (!user) {
            return res.status(400).json({success:false,message:"Inavlid or Expired Code"})
       
            }
          
     user.isVerified=true;
     user.verificationCode=undefined;
    //  user.verficationTokenExpiresAt=undefined;
     await user.save()
     await WelcomeEmail(user.email,user.name)
     return res.status(200).json({success:true,message:"Email Verifed Successfully"})
           
    } catch (error) {
        console.log(error)
        return res.status(400).json({success:false,message:"internal server error"})
    }
}



module.exports = {
    register,
    VerfiyEmail
}