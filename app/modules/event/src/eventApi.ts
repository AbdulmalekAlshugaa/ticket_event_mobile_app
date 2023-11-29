import networkApi from '../../network/src/networkApi';
import { call, select } from 'redux-saga/effects';

export const EVENT_ROUTES = {
    getEvents: '/events.json?apikey=2TGDaTsM8xoX7zLzU770xgTBha11az6R',
};

export function* getEvents(payload: eventsDiscovery.eventRequest) {
    const request = `${EVENT_ROUTES.getEvents}`;
    const response: eventsDiscovery.state = yield call(networkApi.get, request, payload);
    return response;
}
