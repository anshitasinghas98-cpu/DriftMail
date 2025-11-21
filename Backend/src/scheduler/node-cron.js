const cron = require('node-cron');
const runRulesForAllProfiles=require('../utilities/ruleRunner');

const scheduler= async ()=>{
    cron.schedule(' */20 * * * *', async () => {
  await runRulesForAllProfiles();
});
}

module.exports=scheduler
