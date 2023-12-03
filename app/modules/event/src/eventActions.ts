import { createAction } from '@reduxjs/toolkit';

export const eventActions = {
    // Home Actions 
    enterHome: createAction('EVENT/ENTER_HOME'),
    exitHome: createAction('EVENT/EXIT_HOME'),
    dropOffHome: createAction('EVENT/DROP_OFF_HOME'),
    
    // ** GET events params that will be passed two vars id and status  **
    enterEventList: createAction<eventsDiscovery.eventRequest>('EVENT/ENTER_EVENT_LIST'),
    eventListSuccess: createAction<eventsDiscovery.eventResponse>('EVENT/EVENT_LIST_SUCCESS'),
    eventListFailure: createAction<string>('EVENT/EVENT_LIST_FAILURE'),
    eventResetState: createAction('EVENT/RESET_STATE'),
    exitEventList: createAction('EVENT/EXIT_EVENT_LIST'),
    latestEventSearch: createAction<[]>('EVENT/LATEST_EVENT_SEARCH'),
    dropOffEventList: createAction('EVENT/DROP_OFF_EVENT_LIST'),
    

    enterEventDetails: createAction<any>('EVENT/ENTER_EVENT_DETAILS'),
    exitEventDetails: createAction('EVENT/EXIT_EVENT_DETAILS'),
    dropOffEventDetails: createAction('EVENT/DROP_OFF_EVENT_DETAILS'),
} as const;
