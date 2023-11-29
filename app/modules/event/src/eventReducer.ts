import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { eventActions } from './eventActions';

const EVENT_INIT_STATE: eventsDiscovery.state = {
    data: {
        _embedded: {
            events: [],
        },
        _links: {},
        page: {
            size: 0,
            totalElements: 0,
            totalPages: 0,
            number: 0,
        },
    },
    ok: true,
    problem: '',
    isLoading: false,
};

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

const resetState = () => ({ type: eventActions.eventResetState.type });

// Export the main reducer and the action creator
export { resetState };

const eventsDiscovery = combineReducers({
    events,
});

export default eventsDiscovery;
