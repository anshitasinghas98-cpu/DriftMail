const Rule = require('../Models/ruleModel');
const Profile = require('../Models/profileModel');
const mongoose = require('mongoose');



function parseConditionAndAction(rawCondition, rawAction) {
  // Parse delayHours (e.g., '18 hr' → 18)
  const parsedDelay = parseInt(rawCondition.delayHours);

  // Convert isUnread string to boolean
  const parsedIsUnread = rawCondition.isUnread === 'true' || rawCondition.isUnread === true;

  // Ensure bodyIncludes is array (even if given as string)
  const parsedBodyIncludes = Array.isArray(rawCondition.bodyIncludes)
    ? rawCondition.bodyIncludes
    : rawCondition.bodyIncludes
        ?.split(',')
        .map(s => s.trim())
        .filter(Boolean);

  const parsedCondition = {
    from: rawCondition.from || '',
    cc: rawCondition.cc || '',
    bcc: rawCondition.bcc || '',
    subjectIncludes: Array.isArray(rawCondition.subjectIncludes)
      ? rawCondition.subjectIncludes
      : [],
    bodyIncludes: parsedBodyIncludes,
    delayHours: isNaN(parsedDelay) ? 0 : parsedDelay,
    isUnread: parsedIsUnread,
  };

  const parsedAction = {
    type: rawAction.type || 'email',
    recipient: rawAction.recipient || '',
    messageTemplate: rawAction.messageTemplate || '',
  };

  return { parsedCondition, parsedAction };
}




// checked 
const createNewRule = async function (req, res) {
    const { profileId } = req.params;
    const { ruleName, condition, action, isActive = true } = req.body;
    console.log("inside create new rule controller ", profileId, ruleName, condition, action);

    if (!profileId) {
        return res.status(400).json({ error: `User Profile:${profileId} not found!` });
    }

    if (!ruleName || !condition || !action) {
        return res.status(400).json({ error: `ruleName, condition, and action are required` });
    }


    const profile = await Profile.findOne({ profileId });

    console.log("profile found is ", typeof profile._id , profile._id)


    try {

         const parsedCondition = {
      ...condition,
      delayHours: parseInt(condition.delayHours), 
      isUnread: condition.isUnread === 'true' || condition.isUnread === true,
      subjectIncludes: Array.isArray(condition.subjectIncludes)
        ? condition.subjectIncludes
        : condition.subjectIncludes?.split(',').map(s => s.trim()).filter(Boolean),
      bodyIncludes: Array.isArray(condition.bodyIncludes)
        ? condition.bodyIncludes
        : condition.bodyIncludes?.split(',').map(s => s.trim()).filter(Boolean),
    };

        const newRule = await Rule.createNewRule({ profile_Id: profile._id, ruleName, condition:parsedCondition, action, isActive:true });
        return res.status(200).json({ message: "Rule created successfully", rule: newRule });
    } catch (e) {
        return res.status(400).json({ error: `Unable to create new rule: ${e.message}` });
    }
};

// checked 
const getRulesForProfile = async function (req, res) {
    const { profileId } = req.params;
    const { userId } = req.user;

console.log("inside the controller trying to get rule list for ", req.params);

    if (!profileId) {
        return res.status(400).json({ error: `User Profile:${profileId} not found!` });
    }
    try {
        const profile = await Profile.findOne({ profileId }); 
if (!profile) {
  return res.status(404).json({ error: "Profile not found" });
}
if(profile.userId!=userId){

    return res.status(403).json({ error: "Forbidden Page" });
    
}
        const rules = await Rule.getAllRulesForProfile({ profile_Id: profile._id  });
        return res.status(200).json({ rules });
    } catch (e) {
        return res.status(400).json({ error: `Unable to fetch rules: ${e.message}` });
    }
};


// checked 
const updateRule = async function (req, res) {
    const { userId } = req.user;
    const { id: ruleId } = req.params;
    const { ruleName, condition, action, isActive = true } = req.body;


    console.log("inside rule update controller ", userId, ruleId, ruleName, condition , action, isActive);

    if (!ruleId) {
        return res.status(400).json({ error: `Rule not found!` });
    }

    console.group("tryiingggg");
    const rule = await Rule.findById(new mongoose.Types.ObjectId(ruleId));
    console.log("rule found ", rule);

    if (!rule) {
        return res.status(400).json({ error: `Rule not found!` });
    }

    const profile = await Profile.findById(rule.profile_Id);
    if (!profile || profile.userId.toString() !== userId) {
        return res.status(403).json({ error: "Unauthorized to update this rule" });
    }

    if (!ruleName || !condition || !action) {
        return res.status(400).json({ error: `ruleName, condition and action are required` });
    }


    try {
        console.log("trying to find rule ")
        const { parsedCondition, parsedAction }= parseConditionAndAction(condition, action);
        const updatedRule = await Rule.updateRuleById({ ruleId:rule._id, ruleName, profile_Id: profile._id,condition:parsedCondition, action :parsedAction, isActive });
        console.log("trying to find updated rule rule ", updatedRule);
        return res.status(200).json({ message: "Rule updated successfully", rule: updatedRule });
    } catch (e) {
        return res.status(400).json({ error: `Unable to update rule: ${e.message}` });
    }
};



const deleteRule = async function (req, res) {
    const { userId } = req.user;
    const { id: ruleId } = req.params;

    if (!ruleId) {
        return res.status(400).json({ error: `Rule not found!` });
    }

    const rule = await Rule.findById(new mongoose.Types.ObjectId(ruleId));
    if (!rule) {
        return res.status(400).json({ error: `Rule not found!` });
    }

    const profile = await Profile.findById(rule.profile_Id);
    if (!profile || profile.userId.toString() !== userId) {
        return res.status(403).json({ error: "Unauthorized to delete this rule" });
    }

    try {
        await Rule.deleteRuleById({ ruleId:new mongoose.Types.ObjectId(ruleId) });
        return res.status(200).json({ message: "Rule deleted successfully" });
    } catch (e) {
        return res.status(400).json({ error: `Unable to delete rule: ${e.message}` });
    }
};


const getRuleById = async function (req, res) {

    const { userId } = req.user;
    const { id: ruleId } = req.params;

    console.log("we are inside getruleby id controller with param as ", req.params);

    if (!ruleId) {
        return res.status(400).json({ error: `Rule ID not provided` });
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(ruleId)) {
            console.log("invalid rule id ")
  return res.status(400).json({ error: "Invalid rule ID format" });
}

        // console.log("trying to find rule" ,typeof mongoose.Types.ObjectId(ruleId))
        const rule = await Rule.findById(new mongoose.Types.ObjectId(ruleId));
        console.log("rule found is ",rule);
        if (!rule) {
            return res.status(404).json({ error: `Rule not found` });
        }

        const profile = await Profile.findById(rule.profile_Id);

        if (!profile || profile.userId.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized to access this rule" });
        }
        return res.status(200).json({ rule });

    } catch (err) {
        console.log("failed to fetch rule ", err);
        return res.status(500).json({ error: `Failed to fetch rule: ${err.message}` });
    }
};


module.exports = { createNewRule, updateRule, getRulesForProfile, deleteRule,getRuleById };
