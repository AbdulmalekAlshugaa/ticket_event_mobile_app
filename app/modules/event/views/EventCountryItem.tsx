import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../main/src/mainConstants';
import AppBodyText from '../../../components/AppBodyText';
import AppBoldText from '../../../components/AppBoldText';
import { Card, Text } from 'react-native-paper';

interface EventListItemProps {
    countryName: string;
    countryCode: string;
    onPress?: () => void;
}

const EventCountryItem = (props: EventListItemProps) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Card style={styles.container}>
                <Card.Content style={styles.bodyContent}>
                    <AppBoldText style={styles.titleText} title={props.countryName} />
                    <AppBodyText style={styles.titleText} title={props.countryCode} />
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.S_8,
        marginVertical: SIZES.S_2,
        marginHorizontal: SIZES.S_3,
    },
    titleText: {
        marginEnd: SIZES.S_2,
    },
    bodyContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default EventCountryItem;
