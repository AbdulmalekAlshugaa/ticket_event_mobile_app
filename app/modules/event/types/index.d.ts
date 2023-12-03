declare namespace eventsDiscovery {
    type includeTBAOrTBD = 'yes' | 'no';

    interface state {
        data: eventResponse;
        ok: boolean;
        problem: string;
        isLoading: boolean;
        errorMessages?: string;
        latestSearch?: [];
    }

    interface eventRequest {
        page: number;
        size: number;
        search?: string;
        countryCode?: string;
        keyword?: string;
        includeTBA?: includeTBAOrTBD;
        includeTBD?: includeTBAOrTBD;
        sort?: string;
    }

    interface eventResponse {
        _embedded?: any;
        _links: any;
        page: any;
    }

    interface country {
        name: string;
        code: string;
    }

    interface eventSortingParams {
        label: string;
        value: string;
        type: string;
    }
}
