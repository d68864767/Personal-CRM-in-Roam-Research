```javascript
const axios = require('axios');
const { google } = require('googleapis');
const RoamAPI = require('./roam_api');

const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';
const GOOGLE_CALENDAR_ID = 'primary'; // replace with your Google Calendar ID

class GoogleCalendar {
    constructor(apiKey, roamApiKey) {
        this.apiKey = apiKey;
        this.roamApi = new RoamAPI(roamApiKey);
        this.calendar = google.calendar({ version: 'v3', auth: this.apiKey });
    }

    async getEvents() {
        const response = await this.calendar.events.list({
            calendarId: GOOGLE_CALENDAR_ID,
            singleEvents: true,
            orderBy: 'startTime',
        });
        return response.data.items;
    }

    async createRoamBlockForEvent(event) {
        const attendees = event.attendees;
        if (attendees.length < 2) {
            return;
        }

        const confirmedAttendees = attendees.filter(attendee => attendee.responseStatus === 'accepted');
        if (confirmedAttendees.length < 2) {
            return;
        }

        const eventName = event.summary;
        const eventDescription = event.description || '';
        const eventDate = new Date(event.start.dateTime || event.start.date);

        const blockContent = `[[Call]] with ${confirmedAttendees.map(a => `[[${a.email}]]`).join(', ')} about ${eventName}\n- Notes::\n- \n- Next Actions::`;
        await this.roamApi.addTodo(eventDate.toISOString().split('T')[0], blockContent);
    }

    async syncEventsWithRoam() {
        const events = await this.getEvents();
        for (const event of events) {
            await this.createRoamBlockForEvent(event);
        }
    }
}

module.exports = GoogleCalendar;
```
