```javascript
const RoamAPI = require('./roam_api.js');

class AgendaAdder {
    constructor(apiKey) {
        this.roamApi = new RoamAPI(apiKey);
    }

    async addTodoToAgenda(pageName, todo) {
        // Check if the page is a person
        const isPerson = await this.roamApi.confirmPersonPage(pageName);
        if (!isPerson) {
            console.log(`Page ${pageName} is not a person.`);
            return;
        }

        // Add the todo to the person's agenda
        const response = await this.roamApi.addTodo(pageName, todo);
        console.log(`Added todo to ${pageName}'s agenda: ${response}`);
    }

    async processBlock(block) {
        // Extract the page names and todos from the block
        const pageNames = block.match(/#\[\[(.*?)\]\]/g).map(name => name.slice(3, -2));
        const todos = block.match(/{{\[\[TODO\]\]}} (.*?)(?={{\[\[TODO\]\]}}|$)/g).map(todo => todo.slice(13));

        // Add each todo to each person's agenda
        for (const pageName of pageNames) {
            for (const todo of todos) {
                await this.addTodoToAgenda(pageName, todo);
            }
        }
    }

    async processBlocks(blocks) {
        for (const block of blocks) {
            await this.processBlock(block);
        }
    }
}

module.exports = AgendaAdder;
```
