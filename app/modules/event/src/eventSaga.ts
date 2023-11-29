import { cancel, fork, put, take, call } from 'redux-saga/effects';
import { eventActions } from './eventActions';
import { getEvents } from './eventApi';

export function* eventMainRuntime(): any {
    while (true) {
        try {
            const { payload } = yield take(eventActions.enterEventList);
            const task = yield fork(eventListRuntime, payload);
            yield take(eventActions.exitEventList);
            yield cancel(task);
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
