import {
    eventSelector,
    getEventsSelector,
    isLoadingSelector,
    errorMessagesSelector,
    getTotalPagesSelector,
} from '../src/eventSelectors';
describe('Test :: event selectors Selectors', () => {
    test('should select the feature state', () => {
        const result = eventSelector({
            eventsDiscovery: {
                events: {},
                eventFilter: {},
            },
        });
        expect(result).toEqual({});
    });

    test('should select the events', () => {
        const result = getEventsSelector({
            eventsDiscovery: {
                events: {
                    data: {
                        _embedded: {
                            events: [],
                        },
                    },
                },
                eventFilter: {},
            },
        });
        expect(result).toEqual([]);
    });

    test('should select the isLoading', () => {
        const result = isLoadingSelector({
            eventsDiscovery: {
                events: {
                    isLoading: false,
                },
                eventFilter: {},
            },
        });
        expect(result).toEqual(false);
    });

    test('should select the errorMessages', () => {
        const result = errorMessagesSelector({
            eventsDiscovery: {
                events: {
                    problem: '',
                },
                eventFilter: {},
            },
        });
        expect(result).toEqual('error');
    });

    test('should select the getTotalPages', () => {
        const result = getTotalPagesSelector({
            eventsDiscovery: {
                events: {
                    data: {
                        page: {
                            totalPages: 0,
                        },
                    },
                },
                eventFilter: {},
            },
        });
        expect(result).toEqual(0);
    });
});
