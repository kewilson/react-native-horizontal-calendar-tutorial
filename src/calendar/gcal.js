// @flow strict-local

import request from 'superagent';
import faker from 'faker';
import moment from 'moment';
import type {EventType} from '../../App';

const CALENDAR_ID = "<CALENDAR_ID>";
const API_KEY = "<API_KEY>";
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

export function getEvents(callback) {
    request
        .get(url)
        .end((err, resp) => {
            if (!err) {
                //const events = []
                const events: ?Array<EventType> = [];
                JSON.parse(resp.text).items.map((event) => {
                    const startDay = moment().subtract(5, 'days').startOf('day');
                    events.push({
                        date: startDay.add(4, 'hours').clone(),
                        start: event.start.date || event.start.dateTime,
                        end: event.end.date || event.end.dateTime,
                        title: event.summary,
                        description: event.description,
                        image: faker.image.nightlife(Math.floor(Math.random() * 200) + 100, Math.floor(Math.random() * 200) + 100)
                    })
                });
                callback(events);
            }
        });
}
