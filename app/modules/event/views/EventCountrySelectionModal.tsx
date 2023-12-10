import { StyleSheet, Modal, Animated, TouchableOpacity, FlatList } from 'react-native';
import React,{useState} from 'react';

import { AppBoldText, AppCustomHeader, AppIcon } from '../../../components';
import { MainSafeAreaScreen } from '../../../modules/main/view';
import { COLORS, SIZES } from '../../main/src/mainConstants';
import { COUNTRIES } from '../src/eventConstant';
import EventCountryItem from './EventCountryItem';

interface EventCountrySelectionModalProps {
    countryCode: any;
}

const EventCountrySelectionModal = (props: EventCountrySelectionModalProps) => {
    const [visible, setVisible] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [country, setCountry] = useState('Country');

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
        setVisible(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const renderFilter = () => (
        <TouchableOpacity onPress={show} style={styles.filterContainer}>
            <AppBoldText title={country} />
            <AppIcon name={'chevron-down'} size={24}  color={COLORS.black} />
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
