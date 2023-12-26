# Personal CRM in Roam Research

This project is a system built inside Roam Research to maintain contact with people categorized into different lists based on their importance. It also includes features like birthday reminders, Google Calendar integration, Apple device integration, automated task insertion, task filtering, and CSS modifications.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installing

1. Clone the repository
```bash
git clone https://github.com/yourusername/your-repo-name.git
```

2. Install NPM packages
```bash
npm install
```

## Usage

### Roam API

The `roam_api.js` file contains the RoamAPI class which is used to interact with the Roam Research API. It includes methods to get a page, confirm if a page is for a person, get the contact frequency for a person, and set reminders.

```javascript
const RoamAPI = require('./roam_api.js');
const roamApi = new RoamAPI('your-roam-api-key');
```

### Google Calendar

The `google_calendar.js` file contains the GoogleCalendar class which is used to interact with the Google Calendar API. It includes methods to get events and create Roam blocks for events.

```javascript
const GoogleCalendar = require('./google_calendar.js');
const googleCalendar = new GoogleCalendar('your-google-api-key', 'your-roam-api-key');
```

### Apple Integration

The `apple_integration.js` file contains functions to sync Roam pages with Apple Contacts and create widgets for Apple devices.

```javascript
const { syncWithAppleContacts } = require('./apple_integration.js');
syncWithAppleContacts(roamData);
```

### Agenda Adder

The `agenda_adder.js` file contains the AgendaAdder class which is used to automate the insertion of TODOs into relevant pages in a graph system.

```javascript
const AgendaAdder = require('./agenda_adder.js');
const agendaAdder = new AgendaAdder('your-roam-api-key');
```

### Done Filter

The `done_filter.js` file contains functions to automatically filter out completed tasks.

```javascript
const { filterDoneTasks } = require('./done_filter.js');
filterDoneTasks(roamData);
```

### Highlight CSS Modification

The `highlight_css_modification.css` file contains CSS styles to enhance the visual aesthetics of the system.

## Running the tests

Explain how to run the automated tests for this system

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Node.js](https://nodejs.org/) - The runtime environment used
* [npm](https://www.npmjs.com/) - Dependency Management

## Authors

* **Your Name** - *Initial work* - [YourUsername](https://github.com/yourusername)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
