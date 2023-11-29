import { StyleSheet, Modal, Animated, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';

import { AppBoldText, AppCustomHeader, AppIcon } from '../../../components';
import { MainSafeAreaScreen } from '../../../modules/main/view';
import { COLORS, SIZES } from '../../main/src/mainConstants';
import { COUNTRIES } from '../src/eventConstant';
import EventCountryItem from './EventCountryItem';

interface EventCountrySelectionModalProps {
    countryCode: any;
}

const EventCountrySelectionModal = (props: EventCountrySelectionModalProps) => {
    const [visible, setVisible] = React.useState(false);
    const [fadeAnim] = React.useState(new Animated.Value(0));
    const [country, setCountry] = React.useState('Country');

    const renderCountries = (item: eventsDiscovery.country) => (
        <EventCountryItem
            countryName={item.name}
            countryCode={item.code}
            onPress={() => {
                props.countryCode(item.code);
                setCountry(item.name);
                dismiss();
            }}
        />
    );

    const renderCountriesList = () => (
        <FlatList
            data={COUNTRIES}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            renderItem={({ item }) => renderCountries(item)}
            keyExtractor={item => item.code.toString()}
        />
    );

    const dismiss = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };

    const show = () => {
        console.log('show');
        setVisible(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const renderFilter = () => (
        <TouchableOpacity style={styles.filterContainer}>
            <AppBoldText title={country} />
            <AppIcon name={'chevron-down'} size={24} onPress={show} color={COLORS.black} />
        </TouchableOpacity>
    );

    return (
        <Animated.View>
            <Modal visible={visible} transparent={true} animationType={'slide'} onRequestClose={dismiss}>
                <MainSafeAreaScreen>
                    <AppCustomHeader onPress={dismiss} title={'Filter'} icon="close" />
                    <AppBoldText style={styles.countrySelection} title={'Select Country'} />
                    {renderCountriesList()}
                </MainSafeAreaScreen>
            </Modal>

            {renderFilter()}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    countrySelection: {
        alignSelf: 'center',
        margin: 5,
        color: COLORS.black,
    },
});

export default EventCountrySelectionModal;
