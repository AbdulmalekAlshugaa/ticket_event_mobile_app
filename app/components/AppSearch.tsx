import {  StyleSheet } from "react-native";
import React, { useState } from 'react';
import { Searchbar } from "react-native-paper";
import { COLORS } from "app/modules/main/src/mainConstants";

interface AppSearchProps {
  inputString?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onCancel?: () => void;
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
        if (props.onFocus) { props.onFocus(); }
    };

  return (
    <Searchbar
      value={inputString}
      style={styles.container}
      inputStyle={{ fontSize: 14 }}
      onChangeText={_onChangeText}
      allowFontScaling={true}
      placeholderTextColor={COLORS.gray}
      placeholder={"Search"}
      ref={(ref) => (inputRef = ref)}
      onFocus={_onFocus}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default AppSearch;
