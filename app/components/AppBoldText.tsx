import { StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';
import { COLORS } from '../modules/main/src/mainConstants';

interface AppBoldTextProps {
    title: string;
    style?: any;
    variant?: VariantProp<string>;
    numberOfLines?: number;
}

const AppBoldText = (props: AppBoldTextProps) => {
    return (
        <Text numberOfLines={props.numberOfLines} variant={props.variant} style={[styles.text, props.style]}>
            {props.title}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
    },
});

export default AppBoldText;
