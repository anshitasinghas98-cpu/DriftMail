const mongoose = require('mongoose');

const conditionSchema = new mongoose.Schema({
  from: { type: String },
  cc: { type: String },
  bcc: { type: String },
  subjectIncludes: [String],
  bodyIncludes: [String],
  delayHours: { type: Number, required: true },
  isUnread: { type: Boolean, default: true },
});

const actionSchema = new mongoose.Schema({
  type: { type: String, default: 'email' },
  recipient: { type: String, required: true },
  messageTemplate: { type: String, required: true }
});

const ruleSchema = new mongoose.Schema({
  profile_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  ruleName: { type: String, required: true }, 
  condition: conditionSchema,
  action: actionSchema,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});


ruleSchema.statics.createNewRule = async function ({ profile_Id, ruleName, condition, action, isActive }) {
  console.log("trying to create new rule in model ",profile_Id, ruleName, condition, action, isActive )
  const res= await this.create({ profile_Id, ruleName, condition, action, isActive });
  console.log("created rule is ", res);
  return res;
};

ruleSchema.statics.getAllRulesForProfile = async function ({ profile_Id }) {
  console.log("inside model trying for profileid ",profile_Id);
  if(!profile_Id) return new Error("invalid profile id");
  // const profileObjectId = new mongoose.Types.ObjectId(profile_Id);
  // console.log("converted object id ", profileObjectId);
  const resu=await this.find({ profile_Id });
  console.log("rules fetched for ",profile_Id," are ", resu);
  return resu;
};

ruleSchema.statics.updateRuleById = async function ({ ruleId, ruleName, condition, action, isActive }) {
  const updates = {};

  if (ruleName) updates.ruleName = ruleName;
  if (condition) updates.condition = condition;
  if (action) updates.action = action;
  if (typeof isActive === 'boolean') updates.isActive = isActive;

  console.log("inside rule model trying to update rule ", ruleId, updates);

  return await this.findByIdAndUpdate(ruleId, updates, { new: true });
};

ruleSchema.statics.deleteRuleById = async function ({ ruleId }) {
  return await this.findByIdAndDelete(ruleId);
};

const Rule = mongoose.model('Rule', ruleSchema);
module.exports = Rule;
