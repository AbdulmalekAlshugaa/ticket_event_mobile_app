declare namespace eventsDiscovery {

  type includeTBAOrTBD = 'yes' | 'no';

    interface state {
      data: eventResponse;
      ok: boolean;
      problem: string;
      isLoading: boolean;
    }

    interface eventRequest {
      page: number;
      size: number;
      search?: string;
      countryCode?: string;
      keyword?: string;
      includeTBA?: includeTBAOrTBD;
      includeTBD?: includeTBAOrTBD;
    }
  
    interface eventResponse {
      _embedded?: any;
      _links: any;
       page: any;
    }

    interface country{
        name: string,
        code: string
    }
  
  
  }
  
