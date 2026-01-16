const mongoose = require("mongoose");
import bcrypt from "bcryptjs";
import { mailSender } from "../config/services/mailSender";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        Type: Date,
        default: Date.now,
        expiry: 60*5, // OTP expires in 5 minutes
    }, 
    otp_type: {
        type: String,
        enum: ['phone', "email", 'reset_password', 'reset_pin'],
        required: true,
    },
});
 
otpSchema.pre('save', async function(next){
    if(this.isNew){
        const salt = await bcrypt.genSalt(10);
        await sendVerificationMail(this.email, this.otp, this.otp_type);
        this.otp = await bcrypt.hash(this.otp, salt);
    } 
    next();
});

otpSchema.method.campareOtp = async function(enteredOtp){
    return await bcrypt.compare(enteredOtp, this.otp);
};

async function sendVerificationMail(email, otp, otp_type){
    try {
        const mailResponse =  await mailSender(email, otp, otp_type);
    }
    catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
}
const Otp = mongoose.model("Otp", otpSchema);
export default Otp;