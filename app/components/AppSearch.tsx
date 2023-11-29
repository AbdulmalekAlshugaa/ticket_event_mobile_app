import { StyleSheet, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { COLORS, SIZES } from '../modules/main/src/mainConstants';

interface AppSearchProps {
    inputString?: string;
    onChangeText?: (text: string) => void;
    onFocus?: () => void;
    onCancel?: () => void;
    style?: ViewStyle;
}

const AppSearch = (props: AppSearchProps) => {
    const [inputString, setInputString] = useState('');
    let inputRef: any = null;

    const _onChangeText = (text: string) => {
        setInputString(text);
        if (props.onChangeText) {
            props.onChangeText(text);
        }
    };

    const _onFocus = () => {
        if (props.onFocus) {
            props.onFocus();
        }
    };

    return (
        <Searchbar
            value={inputString}
            style={[styles.container, props.style]}
            inputStyle={{ fontSize: 14, height: 20, color: COLORS.black }}
            inputMode="text"
            onChangeText={_onChangeText}
            allowFontScaling={true}
            placeholderTextColor={COLORS.gray}
            placeholder={'Search'}
            iconColor={COLORS.primary}
            ref={ref => (inputRef = ref)}
            onFocus={_onFocus}
            textAlign="left"
            clearIcon="close"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: SIZES.S_1,
        elevation: SIZES.S_2,
        backgroundColor: COLORS.white,
    },
});

export default AppSearch;
