"use strict"

const User = require("../models/userModel")

const sendMail = async (receiver, content)=>{

    const nodemailer = require("nodemailer");//Nodemailer modülünü kurduktan sonra projeye dahil etme

    const owner = await User.findOne({isOwner: true }, { _id: 0, email: 1, emailPasword:1 })

    const transfer = nodemailer.createTransport({
        service:"gmail",//gönderen mailin kullandığı servis
        auth:{//gönderecek kişinin mail bilgileri
            user:owner.email,//Gönderecek kişinin mail adresi
            pass:owner.emailPasword////Gönderecek kişinin mail şifresi
        }
    });
    
    const mailInfo = {
        from:owner.email, //Gönderecek kişinin mail adresi
        to:receiver, //Gönderilecek kişinin mail adresi
        subject:"Reservation",//Gönderecek mailin konusu
        text:content,//Gönderecek mailin içeriği
     
    };
    
    transfer.sendMail(mailInfo,function(error){//Mail gönderme işlemi
        if(error) console.log(error, owner, receiver, content);
        else console.log("Mailiniz gönderildi!");
    });

}


module.exports = sendMail
