
import { TouchableOpacity,StyleSheet, View } from 'react-native';
import { COLORS } from '../modules/main/src/mainConstants';
import * as React from 'react';
import AppIcon from './AppIcon';
import AppBoldText from './AppBoldText';

interface AppCustomHeaderProps {
    title: string;
    onPress?: () => void;
    }

const AppCustomHeader = (props: AppCustomHeaderProps) => {
  return (
    <View style={styles.container}>
            <AppIcon
                style={styles.icon}
                name="close"
                size={24}
                onPress={props.onPress}
                color={COLORS.gray}
            />
            <AppBoldText
                style={styles.title}
                title={props.title}
            />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: COLORS.white
    },
    icon: {
        margin: 5,
        alignSelf: 'center',
    },
    title: {
        alignSelf: 'center',
        margin: 5,
        color: COLORS.black
    }
  });

export default AppCustomHeader;


