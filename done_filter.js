```javascript
const RoamAPI = require('./roam_api.js');

class DoneFilter {
    constructor(apiKey) {
        this.roamApi = new RoamAPI(apiKey);
    }

    async filterDoneBlocks(pageName) {
        // Check if the page is a person
        const isPerson = await this.roamApi.confirmPersonPage(pageName);
        if (!isPerson) {
            console.log(`Page ${pageName} is not a person.`);
            return;
        }

        // Filter out done blocks
        const response = await this.roamApi.hideDoneBlocks(pageName);
        console.log(`Filtered done blocks on ${pageName}'s page: ${response}`);
    }

    async processPages(pages) {
        for (const pageName of pages) {
            await this.filterDoneBlocks(pageName);
        }
    }
}

module.exports = DoneFilter;
```
