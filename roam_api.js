```javascript
const axios = require('axios');

const ROAM_API = 'https://roamresearch.com/#/app/developer-documentation/page/W4Po8pcHQ';

class RoamAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async getPage(pageName) {
        const response = await axios.get(`${ROAM_API}/page/${pageName}`, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`
            }
        });
        return response.data;
    }

    async confirmPersonPage(pageName) {
        const page = await this.getPage(pageName);
        return page.tags.includes('#people');
    }

    async getContactFrequency(pageName) {
        const page = await this.getPage(pageName);
        return page.attributes['Tags::'];
    }

    async setReminder(pageName, reminder) {
        const response = await axios.post(`${ROAM_API}/page/${pageName}/reminder`, {
            reminder: reminder
        }, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`
            }
        });
        return response.data;
    }

    async getBirthday(pageName) {
        const page = await this.getPage(pageName);
        return page.attributes['Birthday::'];
    }

    async addTodo(pageName, todo) {
        const response = await axios.post(`${ROAM_API}/page/${pageName}/todo`, {
            todo: todo
        }, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`
            }
        });
        return response.data;
    }

    async hideDoneBlocks(pageName) {
        const response = await axios.post(`${ROAM_API}/page/${pageName}/filter`, {
            filter: '{{DONE}}'
        }, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`
            }
        });
        return response.data;
    }
}

module.exports = RoamAPI;
```
