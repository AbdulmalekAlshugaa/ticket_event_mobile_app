import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import ProductNavigation from '../product/view/productNavigation';

export default function MainAppNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <ProductNavigation />
    </NavigationContainer>
  );
};
