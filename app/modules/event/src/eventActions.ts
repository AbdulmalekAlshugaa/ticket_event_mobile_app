import { createAction } from '@reduxjs/toolkit';

export const eventActions = {
    // ** GET products params that will be passed two vars id and status  **
    enterEventList: createAction<eventsDiscovery.eventRequest>('EVENT/ENTER_EVENT_LIST'),
    eventListSuccess: createAction<eventsDiscovery.eventResponse>('EVENT/EVENT_LIST_SUCCESS'),
    eventListFailure: createAction<string>('EVENT/EVENT_LIST_FAILURE'),
    eventResetState: createAction('EVENT/RESET_STATE'),
    exitEventList: createAction('EVENT/EXIT_EVENT_LIST'),
    latestEventSearch: createAction<[]>('EVENT/LATEST_EVENT_SEARCH'),
    

    enterEventDetails: createAction<any>('EVENT/ENTER_EVENT_DETAILS'),
    exitEventDetails: createAction('EVENT/EXIT_EVENT_DETAILS'),
    dropOffEventDetails: createAction('EVENT/DROP_OFF_EVENT_DETAILS'),
} as const;
