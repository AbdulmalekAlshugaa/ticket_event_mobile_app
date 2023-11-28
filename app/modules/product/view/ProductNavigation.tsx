import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mainAppRouteOptions, mainAppRoutes } from 'app/modules/navigation/mainScreenRoutes';
import ProductListItemScreen from './ProductListItemScreen';
import ProductLisDetailsScreen from './ProductItemDetailsScreen';

const Stack = createNativeStackNavigator();

export default function ProductNavigation() {
  return (
    
      <Stack.Navigator initialRouteName={mainAppRoutes.productList}>
        <Stack.Screen name={mainAppRoutes.productList} options={mainAppRouteOptions.ProductList} component={ProductListItemScreen} />
        <Stack.Screen name={mainAppRoutes.productDetail} options={mainAppRouteOptions.ProductDetail} component={ProductLisDetailsScreen} />
      </Stack.Navigator>
  );
};
