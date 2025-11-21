const Profile = require('../Models/profileModel');




const getProfilesForUser = async (req, res) => {
  console.log("req is ->",req);
  console.log("req.user is ->",req.user);
  const { userId } = req.user;
  console.log("user id is ->",userId);

  try {
    const profiles = await Profile.getProfilesByUser(userId);
    res.status(200).json({ profiles });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


const deleteProfile = async (req, res) => {
  const { userId } = req.user;
  const { profileId } = req.params;

  if (!profileId) {
    return res.status(400).json({ error: "Missing profileId in params" });
  }

  try {
    await Profile.deleteProfileIfOwned({ userId, profileId });
    res.status(200).json({ message: "Profile deleted" });
  } catch (e) {
    const code = e.message === "Unauthorized" ? 403 : 400;
    res.status(code).json({ error: e.message });
  }
};


const getProfileById = async (req, res) => {
  const { userId } = req.user;
  const { profileId } = req.params;

  if (!profileId) {
    return res.status(400).json({ error: "Missing profileId in params" });
  }

  try {
    const profile = await Profile.getProfileByProfileId(profileId);
    if (!profile || profile.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.status(200).json({ profile });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getProfilesForUser,
  deleteProfile,
  getProfileById
};
