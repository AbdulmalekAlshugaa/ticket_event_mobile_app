import { cancel, fork, put, take, call } from 'redux-saga/effects';
import { eventActions } from './eventActions';
import { getEvents } from './eventApi';
import { navigateTo, goBack } from '../../navigation/RootNavigation';

export function* eventMainRuntime(): any {
    while (true) {
        try {
             yield take(eventActions.enterHome);
            yield fork(searchRuntime);
        } catch (error: any) {
            yield put(eventActions.eventListFailure(error.message));
        }
    }
}
export function* searchRuntime(): any {
    while (true) {
        try {
            const { payload } = yield take(eventActions.enterEventList);
            const dropOffEventList = yield fork(eventListingDropOffRuntime);
            const eventDetailsTask = yield fork(eventDetailsRuntime);
            yield call(eventListFlow, payload);
            yield take(eventActions.exitEventList);
            yield cancel([eventDetailsTask,dropOffEventList]);
        } catch (error: any) {
            yield put(eventActions.eventListFailure(error.message));
        }
    }
}

export function* eventListFlow(payload: eventsDiscovery.eventRequest): any {
    const response: eventsDiscovery.state = yield call(getEvents, payload);
    yield put(eventActions.eventListSuccess(response.data));
    if (payload.keyword && payload.keyword.length > 0) {
        yield put(eventActions.latestEventSearch(response.data._embedded.events));
    }
}

export function* eventDetailsRuntime(): any {
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

export function* eventListingDropOffRuntime() {
    while (true) {
        yield take(eventActions.dropOffEventList);
        // it safe to call goBack()
        goBack();
    }
}
