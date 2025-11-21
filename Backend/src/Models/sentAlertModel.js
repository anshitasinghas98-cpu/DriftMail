const mongoose = require('mongoose');

const sentAlertSchema = new mongoose.Schema({
  messageId: { type: String, required: true },
  ruleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rule', required: true },
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  alertedAt: { type: Date, default: Date.now }
});


sentAlertSchema.statics.hasAlertBeenSent = async function ({ messageId, ruleId }) {
  return await this.exists({ messageId, ruleId });
};


sentAlertSchema.statics.logAlert = async function ({ messageId, ruleId, profileId }) {
  return await this.create({ messageId, ruleId, profileId });
};

const SentAlert = mongoose.model('SentAlert', sentAlertSchema);
module.exports = SentAlert;
