import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { eventActions } from './eventActions';
import { EVENT_INIT_STATE,EVENT_FILTER_INIT_STATE } from './eventInitState';

const events = createReducer(EVENT_INIT_STATE, builder => {
    builder
        .addCase(eventActions.eventResetState, state => {
            // Reset the state when resetState action is dispatched
            state.isLoading = false;
            state.data._embedded.events = [];
            state.data._links = {};
            state.data.page = {
                size: 0,
                totalElements: 0,
                totalPages: 0,
                number: 0,
            };
            state.ok = true;
        })
        .addCase(eventActions.enterEventList, state => {
            state.isLoading = true;
        })
        .addCase(eventActions.eventListSuccess, (state, action) => {
            state.isLoading = false;
            if (action.payload && action.payload._embedded) {
                state.data._embedded.events = state.data._embedded.events.concat(action.payload._embedded.events);
            } else {
                state.data._embedded.events = [];
            }
            state.data._links = action.payload._links;
            state.data.page = action.payload.page;
            state.ok = true;
        })
        .addCase(eventActions.dropOffEvent, (state, action) => {
            state.data._embedded = action.payload;
            state.isLoading = false;
            state.ok = false;
        });
});

const eventFilter = createReducer(EVENT_FILTER_INIT_STATE, builder => {
    builder
        .addCase(eventActions.enterEventList, (state, action) => {
            state.page = action.payload.page;
            state.size = action.payload.size;
            state.search = action.payload.search;
            state.countryCode = action.payload.countryCode;
            state.keyword = action.payload.keyword;
            state.includeTBA = action.payload.includeTBA;
            state.includeTBD = action.payload.includeTBD;
        })
        .addCase(eventActions.dropOffEvent, (state) => {
            state.page = 0;
            state.size = 10;
            state.search = '';
            state.countryCode = '';
            state.keyword = '';
            state.includeTBA = 'no';
            state.includeTBD = 'no';
        });
});

const eventsDiscovery = combineReducers({
    events,
    eventFilter,
});

export default eventsDiscovery;
