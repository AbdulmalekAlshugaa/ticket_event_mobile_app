import {createAction} from '@reduxjs/toolkit';

export const eventActions = {
    // ** GET products params that will be passed two vars id and status  **
    enterEventList: createAction<eventsDiscovery.eventRequest>('EVENT/ENTER_EVENT_LIST'),
    eventListSuccess: createAction<eventsDiscovery.eventResponse>('EVENT/EVENT_LIST_SUCCESS'),
   

    dropOffEventList: createAction('EVENT/DROP_OFF_EVENT_LIST'),
    exitEventList: createAction('EVENT/EXIT_EVENT_LIST'),
    getEvents: createAction<{id: number}>('EVENT/GET_EVENTS'),
    dropOffEvent: createAction('EVENT/DROP_OFF_EVENT'),
    exitEvent: createAction('EVENT/EXIT_EVENT'),
    getEventDetail: createAction<{id: number}>('EVENT/GET_EVENT_DETAIL'),
    
} as const;