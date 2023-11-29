import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { eventActions } from "./eventActions";

const EVENT_INIT_STATE: eventsDiscovery.state = {
  data: {
    _embedded: {
        events: [],
    },
    _links: {},
    page: {},
  },
  ok: true,
  problem: "",
  isLoading: false,
};

const eventsDiscovery = createReducer(EVENT_INIT_STATE, (builder) => {
  builder
    .addCase(eventActions.enterEventList, (state) => {
      state.isLoading = true;
    })
    .addCase(eventActions.eventListSuccess, (state, action) => {
      state.isLoading = false;
      if (action.payload && action.payload._embedded) {
        state.data._embedded.events = state.data._embedded.events.concat(action.payload._embedded.events);
      }else {
        state.data._embedded.events = [];
      }
      state.ok = true;
    })
    .addCase(eventActions.dropOffEvent, (state, action) => {
      state.data._embedded = action.payload;
      state.isLoading = false;
      state.ok = false;
    });
});

export default eventsDiscovery;
