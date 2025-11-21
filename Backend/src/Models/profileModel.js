const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  profileId: { type: String, required: true, unique: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emailAddress: { type: String, required: true ,unique:true},
  displayName: { type: String },
  refreshToken: { type: String, required: true },
  accessToken: { type: String, required: true },
  tokenExpiry: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});


profileSchema.statics.createProfileForUser = async function ({
  profileId,
  userId,
  emailAddress,
  displayName,
  refreshToken,
  accessToken,
  tokenExpiry
}) {

  console.log("data received in model is ->",  profileId,
  userId,
  emailAddress,
  displayName,
  refreshToken,
  accessToken,
  tokenExpiry);
  const existing = await this.findOne({ userId, emailAddress });
  if (existing) throw new Error("Profile already exists for this email");

  return await this.create({
    profileId,
    userId,
    emailAddress,
    displayName,
    refreshToken,
    accessToken,
    tokenExpiry
  });
};

// Get all profiles by user
profileSchema.statics.getProfilesByUser = async function (userId) {
  console.log("asked for profiles with user id ->",userId);
  return await this.find({ userId });
};

// Delete profile if owned (by profileId)
profileSchema.statics.deleteProfileIfOwned = async function ({ userId, profileId }) {
  const profile = await this.findOne({ profileId });
  if (!profile) throw new Error("Profile not found");
  if (profile.userId.toString() !== userId) throw new Error("Unauthorized");

  await this.deleteOne({ profileId });
};


profileSchema.statics.getProfileByProfileId = async function (profileId) {
  const profile = await this.findOne({ profileId });
  if (!profile) throw new Error("Profile not found");
  return profile;
};

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
