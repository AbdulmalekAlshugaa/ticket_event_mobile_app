import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AppModal from '../../../components/AppModal';
import { COLORS, SIZES } from '../../../modules/main/src/mainConstants';
import { AppChip, AppBoldText, AppButton, AppIcon } from '../../../components';
import { useAppDispatch } from '../../main/src/configureStore';
import { eventActions } from '../src/eventActions';
import { useSelector } from 'react-redux';
import { getEventFilterSelector } from '../src/eventSelectors';
interface EventFilteringModalProps {
    visible: boolean;
    hideModal: () => void;
    eventRequest?: eventsDiscovery.eventRequest;
}

const EventFilteringModal = (props: EventFilteringModalProps) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [includeTBA, setIncludeTBA] = useState<eventsDiscovery.includeTBAOrTBD>('no');
    const [includeTBD, setIncludeTBD] = useState<eventsDiscovery.includeTBAOrTBD>('no');
    const eventFilter: eventsDiscovery.eventRequest = useSelector(getEventFilterSelector);

    const dispatch = useAppDispatch();

    const init = () => dispatch(eventActions.eventResetState());
    const exist = () => dispatch(eventActions.exitEventList());
    const enterProductListItem = (event: eventsDiscovery.eventRequest) =>
        dispatch(
            eventActions.enterEventList({
                page: event.page,
                size: 10,
                countryCode: event.countryCode,
                keyword: event.keyword,
                includeTBA: event.includeTBA,
                includeTBD: event.includeTBD,
            }),
        );

    const handleChipPress = () => {
        setIsSelected(!isSelected);
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.iconContainer}>
                <AppIcon color={COLORS.gray} name="close" size={24} />
            </View>
            <AppBoldText title="Filtering" />
        </View>
    );

    const renderBottom = () => (
        <View style={styles.bottomContainer}>
            <AppButton
                style={styles.button}
                label="Result"
                oPress={() => {
                    exist();
                    enterProductListItem({
                        page: 1,
                        size: 10,
                        includeTBA: includeTBA,
                        includeTBD: includeTBD,
                        countryCode: eventFilter.countryCode,
                        keyword: eventFilter.keyword,
                    });
                    props.hideModal();
                }}
            />
        </View>
    );

    const renderBody = () => (
        <View style={styles.filterChips}>
            <AppChip
                style={[styles.chip, { backgroundColor: isSelected ? COLORS.gray : COLORS.secondary }]}
                selectedColor={COLORS.black}
                name="includeTBA"
                selected
                onPress={() => {
                    handleChipPress();
                    setIncludeTBA(prev => (prev === 'no' ? 'yes' : 'no'));
                }}
            />
            <AppChip
                style={styles.chip}
                selectedColor={COLORS.black}
                name="includeTBD"
                selected
                onPress={() => console.log('pressed')}
            />
        </View>
    );

    return (
        <AppModal
            maxHeight={SIZES.height / 2}
            contentStyle={styles.contentStyle}
            containerStyle={styles.containerStyle}
            visible={props.visible}
            hideModal={props.hideModal}
        >
            {renderHeader()}
            {renderBody()}
            {renderBottom()}
        </AppModal>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: COLORS.black,
    },
    contentStyle: {
        width: SIZES.width,
        backgroundColor: COLORS.white,
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.width * 0.1,
        backgroundColor: COLORS.lightGrey,
        marginEnd: SIZES.S_3,
    },
    button: {
        width: SIZES.width * 0.9,
        marginVertical: SIZES.S_5,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: SIZES.S_10,
    },
    filterChips: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: SIZES.S_10,
    },
    chip: {
        marginHorizontal: SIZES.S_2,
        marginVertical: SIZES.S_2,
    },
});

export default EventFilteringModal;
