import { cancel, fork, put, take, call } from 'redux-saga/effects';
import { eventActions } from './eventActions';
import { getEvents } from './eventApi';
import { navigateTo,goBack } from '../../navigation/RootNavigation';

export function* eventMainRuntime(): any {
    while (true) {
        try {
            const { payload } = yield take(eventActions.enterEventList);
            const task = yield fork(eventListRuntime, payload);
            const eventDetailsTask = yield fork(eventDetails);
            yield take(eventActions.exitEventList);
            yield cancel([task, eventDetailsTask]);
        } catch (error: any) {
            yield put(eventActions.eventListFailure(error.message));
        }
    }
}

export function* eventListRuntime(payload: eventsDiscovery.eventRequest) {
    while (true) {
        try {
            const response: eventsDiscovery.state = yield call(getEvents, payload);
            yield put(eventActions.eventListSuccess(response.data));
            if (payload.keyword && payload.keyword.length > 0) {
                yield put(eventActions.latestEventSearch(response.data._embedded.events));
            }
            yield take(eventActions.exitEventList);
        } catch (error: any) {
            yield put(eventActions.eventListFailure(error.message));
        }
    }
}

export function* eventDetails(): any {
    while (true) {
        const { payload } = yield take(eventActions.enterEventDetails);
        navigateTo('EventListingItemDetails', { item: payload });
        const dropOffEventDetails = yield fork(eventDropOffRuntime);
        yield take(eventActions.exitEventDetails);
        yield cancel(dropOffEventDetails);
    }
}

export function* eventDropOffRuntime() {
    while (true) {
      yield take(eventActions.dropOffEventDetails);
      // it safe to call goBack() 
      goBack();
    }
  }