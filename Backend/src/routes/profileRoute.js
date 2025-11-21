const express = require('express');
const router = express.Router();
const ruleRouter=require('./ruleRoute');
const {
  getProfilesForUser,
  deleteProfile,
  getProfileById
}=require('../controllers/profileController')


router.get('/profileslist',getProfilesForUser);
router.delete('/:profileId',deleteProfile);
router.get('/:profileId',getProfileById);
router.use('/:profileId/rule',ruleRouter)


module.exports=router;