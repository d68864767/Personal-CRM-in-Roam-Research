const axios = require('axios');
const cron = require('node-cron');
const { appleContactsAPI, appleRemindersAPI } = require('./config');

// Function to sync Roam pages with Apple Contacts
const syncWithAppleContacts = async (roamData) => {
  const peoplePages = roamData.filter(page => page.tags.includes('#people'));

  for (let page of peoplePages) {
    const { name, phone, email, address, birthday } = page;

    const contactData = {
      name,
      phone,
      email,
      address,
      birthday
    };

    try {
      await axios.post(appleContactsAPI, contactData);
      console.log(`Synced ${name} with Apple Contacts`);
    } catch (error) {
      console.error(`Failed to sync ${name} with Apple Contacts: ${error}`);
    }
  }
};

// Function to create iOS widget with today's plans and priorities
const createiOSWidget = async (roamData) => {
  const today = new Date().toISOString().split('T')[0];
  const todayData = roamData.find(page => page.date === today);

  if (todayData) {
    const { plans, priorities } = todayData;

    const widgetData = {
      plans,
      priorities
    };

    try {
      await axios.post(appleRemindersAPI, widgetData);
      console.log('Created iOS widget with today\'s plans and priorities');
    } catch (error) {
      console.error(`Failed to create iOS widget: ${error}`);
    }
  }
};

// Schedule the tasks to run once a day
cron.schedule('0 0 * * *', async () => {
  const roamData = await getRoamData();

  await syncWithAppleContacts(roamData);
  await createiOSWidget(roamData);
});

module.exports = {
  syncWithAppleContacts,
  createiOSWidget
};
