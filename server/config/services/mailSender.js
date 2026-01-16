import otpgenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import fs from 'fs';
import inlineCss from 'inline-css';

export const mailSender = async (email,otp, otp_type) => {
    let htmlContent = fs.readFileSync('otp_templates.html', 'utf-8');
    htmlContent = htmlContent.replace('tradevault_otp', otp);
    htmlContent = htmlContent.replace('tradevault_otp2', otp_type);

    const options ={
        url: ' ',
    };
     htmlContent = await inlineCss(htmlContent, options);

     try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        }); 
        let result =  await transporter.sendMail({
            from: process.env.Mail_from,
            to: email, 
            subject: "Trading APP OTP Verification",
            html: htmlContent,
        });
        return result;
    } catch (error) {
         console.error("Error sending email:", error);
        throw error
     }
};


export const generateOTP = () => {
    const otp = otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    return otp;
}


