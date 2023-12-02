import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EVENT_SCREEN_NAMES } from '../event/src/eventConstant';
import { mainAppRouteOptions } from './mainScreenRoutes';
import EventListingItemScreen from '../event/views/EventListingItemScreen';
import EventListingItemDetailsScreen from '../event/views/EventListingItemDetailsScreen';
import EventHomeScreen from '../event/views/EventHomeScreen';

const Stack = createNativeStackNavigator();

export default function MainAppNavigation() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={EVENT_SCREEN_NAMES.EVENT_HOME_SCREEN}>
            <Stack.Screen
                    name={EVENT_SCREEN_NAMES.EVENT_HOME_SCREEN}
                    options={{
                        headerShown: true,
                        headerTitle: 'Home',
                        headerTitleStyle: {
                            color: '#000',
                            fontSize: 18,
                            fontWeight: 'bold',
                        },
                        headerStyle: {
                            backgroundColor: '#fff',
                        },
                    }}
                    component={EventHomeScreen}
                />
                <Stack.Screen
                    name={EVENT_SCREEN_NAMES.EVENT_LISTING_ITEM}
                    options={{
                        headerShown: true,
                        headerTitle: 'Search Event',
                        headerTitleStyle: {
                            color: '#000',
                            fontSize: 18,
                            fontWeight: 'bold',
                        },
                        headerStyle: {
                            backgroundColor: '#fff',
                        },
                    }}
                    component={EventListingItemScreen}
                />
                <Stack.Screen
                    name={EVENT_SCREEN_NAMES.EVENT_LISTING_ITEM_DETAILS}
                    options={mainAppRouteOptions.header}
                    component={EventListingItemDetailsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
