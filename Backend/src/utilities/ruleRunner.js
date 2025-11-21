const Rule = require('../Models/ruleModel');
const Profile = require('../Models/profileModel');
const refreshAccessToken = require('../utilities/refreshAccessToken');
const fetchEmails = require('../utilities/fetchMail');
const sendEmailAlert = require('../services/sendEmailAlert');
const SentAlert = require('../Models/sentAlertModel');

const runRulesForAllProfiles = async () => {
  const rules = await Rule.find({ isActive: true }).populate('profile_Id');
  console.log('Checking all active rules...');

  for (const rule of rules) {

    const profile = await refreshAccessToken(rule.profile_Id);

    const q = [];
    if (rule.condition.from) q.push(`from:${rule.condition.from}`);
    if (rule.condition.subjectIncludes.length)
      q.push(rule.condition.subjectIncludes.map(s => `subject:${s}`).join(' '));
    if (rule.condition.bodyIncludes.length)
      q.push(rule.condition.bodyIncludes.map(s => `"${s}"`).join(' '));
    if (rule.condition.isUnread) q.push('is:unread');
    if (rule.condition.delayHours)
      q.push(`older_than:${rule.condition.delayHours}h`);

    const query = q.join(' ');
    let emails = await fetchEmails({ accessToken: profile.accessToken, query });

    if (!emails || !emails.messages || emails.messages.length === 0) continue;

    const messages = emails.messages;

    console.log(`Rule ${rule._id} matched ${messages.length} emails.`);

    if (rule.action.type === 'email') {

      for (const email of messages) {
        const alreadySent = await SentAlert.hasAlertBeenSent({
          messageId: email.id,
          ruleId: rule._id
        });

        if (alreadySent) continue;

        await sendEmailAlert({
          to: rule.action.recipient,
          subject: 'MailDrift Alert: Matched Email',
          text: rule.action.messageTemplate || 'You have a new email match.'
        });

        await SentAlert.logAlert({
          messageId: email.id,
          ruleId: rule._id,
          profileId: profile._id
        });

      }


    }

  }

  console.log('Finished checking all rules.');
};

module.exports = runRulesForAllProfiles;
