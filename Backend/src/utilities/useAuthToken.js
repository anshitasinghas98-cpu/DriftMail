const oauth2Client=require('../config/googleClient')
const dotenv=require('dotenv');
const Profile=require('../Models/profileModel');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
dotenv.config();

const useAuthToken = async (req,res)=>{

    const { code, state } = req.query;  


let userId;

  try {
  const decodedToken = decodeURIComponent(state);  
  console.log("decode token is ->", decodedToken);     
  const decoded = jwt.verify(decodedToken, process.env.JWT_SECRET); 
   userId = decoded.id;
} catch (err) {
  console.log("error is ", err);
  return res.status(401).json({ error: "Invalid or expired token"});
}




  
  try {
    const { tokens } = await oauth2Client.getToken(code);               
    oauth2Client.setCredentials(tokens);                                

    const { google } = require('googleapis');                       
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get(); 

    const existing = await Profile.findOne({ emailAddress: data.email });
    if (existing) {
      return res.redirect(`${process.env.FRONTEND_URL}/profile/${existing.profileId}`);
    }

const newProfileId=uuid.v4();
    await Profile.createProfileForUser({
            profileId:newProfileId,
            userId,
            emailAddress:data.email,
            displayName:data.name,
            refreshToken:tokens.refresh_token,
            accessToken:tokens.access_token,
            tokenExpiry:tokens.expiry_date
    })


    return res.redirect(`${process.env.FRONTEND_URL}/profile/${newProfileId}`);  
  } catch (err) {
    console.error(err);
    res.status(500).send('OAuth failed',err);
  }
}

module.exports=useAuthToken;