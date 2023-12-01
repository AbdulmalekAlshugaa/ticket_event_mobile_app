import { createSelector } from '@reduxjs/toolkit';

export const eventSelector = (state: any) => state.eventsDiscovery.events;

export const getEventsSelector = createSelector(eventSelector, events => {
    if (events.data && events.data._embedded) {
        return events.data._embedded.events;
    }
    return [];
});

export const isLoadingSelector = createSelector(eventSelector, events => events.isLoading);

export const isOkSelector = createSelector(eventSelector, events => events.ok);

export const errorMessagesSelector = createSelector(eventSelector, events => {
  
    if (events.problem) {
        return 'something went wrong';
    } else if (events.data && events.data._embedded && events.data._embedded.events.length === 0) {
        return 'No events found';
    }
    return 'error';
});

export const getErrorMessages = (state: any) => state.eventsDiscovery.events.errorMessages;


export const getTotalPagesSelector = createSelector(eventSelector, events => {
    if (events.data && events.data.page) {
        return events.data.page.totalPages;
    }
    return 0;
});

export const getEventFilterSelector = (state: any) => state.eventsDiscovery.eventFilter;


