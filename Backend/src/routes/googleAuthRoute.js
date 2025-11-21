const express = require('express');
const router = express.Router();
const urlGenerator=require('../utilities/urlGenerator');
const useAuthToken=require('../utilities/useAuthToken');

router.get('/google',urlGenerator);
router.get('/google/callback',useAuthToken);

module.exports=router;