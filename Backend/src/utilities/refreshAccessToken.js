// const fetch = require('node-fetch');
const Profile = require('../Models/profileModel');

const refreshAccessToken = async (profile) => {
  if (new Date() < profile.tokenExpiry) return profile;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: profile.refreshToken,
      grant_type: 'refresh_token'
    })
  });

  const data = await res.json();

  profile.accessToken = data.access_token;
  profile.tokenExpiry = new Date(Date.now() + data.expires_in * 1000);
  await profile.save();

  return profile;
};

module.exports = refreshAccessToken;
