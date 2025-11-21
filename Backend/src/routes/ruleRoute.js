const express = require('express');
const router = express.Router({ mergeParams: true });
const { createNewRule, updateRule, getRulesForProfile, deleteRule,getRuleById }=require('../controllers/ruleController');


router.post('/createrule',createNewRule)
router.put('/:id',updateRule)
router.get('/rule-list',getRulesForProfile)
router.get('/:id',getRuleById);
router.delete('/:id',deleteRule);


module.exports=router;