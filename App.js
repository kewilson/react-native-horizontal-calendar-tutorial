// @flow strict-local

"use strict";

import React from 'react';

import {
    StyleSheet,
    StatusBar,
    View,
} from 'react-native';

import Calendar from './src/calendar/Calendar';
import Events from './src/events/Events';
import type Moment from 'moment';

import { getEvents } from './src/calendar/gcal'

export type EventType = {
    date: Moment,
    start: Moment,
    end: Moment,
    title: string,
    description: string,
    image: string,
};

// Filter events by date
const filterEvents = (date: Moment, events): ?Array<EventType> =>
    events.filter(event => event.date.isSame(date, 'day'));

export default class App extends React.Component {

    constructor () {
        super();
        this.state = {
            events: []
        };
    }
    componentDidMount () {
        getEvents((events) => {
            this.setState({events});
        });
    }

    onSelectDate = (date: Moment) => {
        this.setState({events: filterEvents(date, this.state.events)});
    };

    render() {
        const {events} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <Calendar onSelectDate={this.onSelectDate}/>
                <Events events={events}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F53B1',
        paddingTop: 20,
    },
});
