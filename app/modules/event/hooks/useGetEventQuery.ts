import { useQuery } from '@tanstack/react-query';
import { EventApiRoute } from '../src/eventRoutes';
import networkApi from '../../network/src/networkApi';

export const useGetEvents = () => {
    const staleTime = 60 * 1000; // 1 minute time is modifiable and it base on business requirements
    return useQuery({
        queryKey: [EventApiRoute.getEvents],
        queryFn: async () => {
            try {
                const response = await networkApi.get(EventApiRoute.getEvents);
                if (!response.ok) {
                    return 'error';
                } else {
                    return response.data;
                }
            } catch (error: any) {
                return 'error';
            }
        },
        cacheTime: staleTime,
        staleTime,
        refetchOnReconnect: true,
        useErrorBoundary: true,
    });
};
