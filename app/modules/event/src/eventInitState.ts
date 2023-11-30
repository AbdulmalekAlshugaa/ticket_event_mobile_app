export const EVENT_INIT_STATE: eventsDiscovery.state = {
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

export const EVENT_FILTER_INIT_STATE: eventsDiscovery.eventRequest = {
    page: 0,
    size: 10,
    search: '',
    countryCode: '',
    keyword: '',
    includeTBA: 'no',
    includeTBD: 'no',
};