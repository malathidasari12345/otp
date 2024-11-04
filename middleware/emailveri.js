const { transporter } = require('./Email')


const SendVerificationCode = async(email,verificationCode )=>{
    try{
        const response= await transporter.sendMail({
            from: '"Malathi Dasari" <malathidasari30@gmail.com>', 
            to: email, 
            subject: "OTP Verification", 
            text: "Verify Your Email", 
            html: verificationCode, 
          });
          console.log("email send successfully")
    }catch(err){
        console.log(err)
    }
}


const WelcomeEmail = async(email,name)=>{
    try{
        const response= await transporter.sendMail({
            from: '"Malathi Dasari" <malathidasari30@gmail.com>', 
            to: email, 
            subject: "OTP Verification", 
            text: "Verify Your Email", 
            html:`${name}, your email verified successfully`, 
          });
          console.log("email veriffied successfully")
    }catch(err){
        console.log(err)
    }
}

module.exports ={
    SendVerificationCode,WelcomeEmail
}