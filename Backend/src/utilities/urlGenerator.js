const oauth2Client=require('../config/googleClient')
const jwt=require('jsonwebtoken')
const urlGenerator = async function(req,res){
    const {userId}=req.query;

     const scopes = [                                                    
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];

  console.log("before encoding ", userId);


const state = encodeURIComponent(userId)

   const url = oauth2Client.generateAuthUrl({                         
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
    state:  state
  });

  return res.redirect(url);
}

module.exports=urlGenerator;