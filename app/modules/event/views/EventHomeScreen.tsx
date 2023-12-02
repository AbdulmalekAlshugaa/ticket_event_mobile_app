import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { AppIcon, AppSearch } from '../../../components';
import { COLORS, SIZES } from '../../main/src/mainConstants';
import { useAppDispatch } from '../../main/src/configureStore';
import { eventActions } from '../src/eventActions';
import { useSelector } from 'react-redux';
import { getEventsSelector } from '../src/eventSelectors';
// import Carousel from 'react-native-reanimated-carousel';

// TODO: we have to have the same search section
// TODO: we have to have the same filter section
// TODO: we have to have a section to render an and render the first three events
const EventHomeScreen = () => {
    const dispatch = useAppDispatch();
    const enterEventListItem = (page: number, countryCode?: string, keyword?: string) =>
        dispatch(
            eventActions.enterEventList({
                page: page,
                size: 20,
                countryCode: countryCode,
                keyword: keyword,
            }),
        );
    const exist = () => dispatch(eventActions.exitEventList());
    const init = () => dispatch(eventActions.eventResetState());

    const eventsData = useSelector(getEventsSelector);

    const renderSearchContainer = () => (
        <View style={styles.searchContainer}>
            <AppSearch style={styles.appSearch} />
        </View>
    );

    const renderItem = ({}: any) => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: COLORS.black }}>{'kdFNJKSBDFSDFSDF'}</Text>
            </View>
        );
    };

    const renderHeaderContainer = () => (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* <Carousel
                loop
                width={SIZES.width}
                height={SIZES.width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            /> */}
        </View>
    );

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {renderSearchContainer()}
            {renderHeaderContainer()}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filterContainer: {
        width: 50,
        height: 50,
        borderRadius: SIZES.S_8,
        backgroundColor: COLORS.lightGrey,
        marginVertical: SIZES.S_5,
        marginEnd: SIZES.S_2,
        justifyContent: 'center',
    },
    appSearch: {
        marginVertical: SIZES.S_5,
        marginHorizontal: SIZES.S_5,
        borderRadius: SIZES.S_8,
        backgroundColor: COLORS.lightGrey,
        flex: 1,
    },
    containerStyle: {
        justifyContent: 'flex-end',
        marginHorizontal: SIZES.S_7,
        backgroundColor: COLORS.secondary,
    },
    footer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#CED0CE',
        justifyContent: 'center',
    },
});

export default EventHomeScreen;
