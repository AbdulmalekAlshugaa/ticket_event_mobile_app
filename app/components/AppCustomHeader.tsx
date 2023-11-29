import { StyleSheet, View } from 'react-native';
import { COLORS } from '../modules/main/src/mainConstants';
import * as React from 'react';
import AppIcon from './AppIcon';
import AppBoldText from './AppBoldText';

interface AppCustomHeaderProps {
  title: string;
  onPress?: () => void;
  icon: string;
}

const AppCustomHeader = (props: AppCustomHeaderProps) => {
  return (
    <View style={styles.container}>
      <AppIcon
        style={styles.icon}
        name={props.icon}
        size={24}
        onPress={props.onPress}
        color={COLORS.gray}
      />
      <AppBoldText style={styles.title} title={props.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // Center vertically
    backgroundColor: COLORS.white,
  },
  icon: {
    margin: 5,
  },
  title: {
    flex: 1, // Take up remaining space
    alignSelf: 'center',
  },
});

export default AppCustomHeader;
