import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface AppDropDownProps {
    placeholder: string;
    data: eventsDiscovery.eventSortingParams[];
    sortingValue: (value: string) => void;
}

const AppDropDown = (props: AppDropDownProps) => {
    const [value, setValue] = useState('');

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={props.data}
            labelField="label"
            valueField="value"
            placeholder={props.placeholder}
            value={value}
            onChange={item => {
                setValue(item.value);
                props.sortingValue(`${item.type},${item.value}`);
            }}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginBottom: 15,
        marginHorizontal: 10,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default AppDropDown;
