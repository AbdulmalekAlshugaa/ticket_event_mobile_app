import { cancel, fork, put, take, call } from 'redux-saga/effects';
import { eventActions } from './eventActions';
import { getEvents } from './eventApi';
import { navigateTo } from '../../navigation/RootNavigation';

export function* eventMainRuntime(): any {
    while (true) {
        try {
            const { payload } = yield take(eventActions.enterEventList);
            const task = yield fork(eventListRuntime, payload);
            const eventDetailsTask = yield fork(eventDetails);
            yield take(eventActions.exitEventList);
            yield cancel([task, eventDetailsTask]);
        } catch (error) {
            console.log(error);
        }
    }
}

export function* eventListRuntime(payload: eventsDiscovery.eventRequest): any {
    while (true) {
        try {
            const response: eventsDiscovery.state = yield call(getEvents, payload);
            yield put(eventActions.eventListSuccess(response.data));
            yield take(eventActions.exitEventList);
        } catch (error) {
            console.log(error);
        }
    }
}

export function* eventDetails(): any {
    while (true) {
        const { payload } = yield take(eventActions.enterEventDetails);
        navigateTo('EventListingItemDetails', { item: payload });
        yield take(eventActions.exitEventDetails);
    }
}
