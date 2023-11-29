declare namespace eventsDiscovery {

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
  
