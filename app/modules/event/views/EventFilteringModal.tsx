import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AppModal from '../../../components/AppModal';
import { COLORS, SIZES } from '../../../modules/main/src/mainConstants';
import { AppChip, AppBoldText, AppButton, AppIcon,AppDropDown } from '../../../components';
import { useAppDispatch } from '../../main/src/configureStore';
import { eventActions } from '../src/eventActions';
import { useSelector } from 'react-redux';
import { getEventFilterSelector } from '../src/eventSelectors';
import { EVENT_SORTING_PARAMS } from '../src/eventConstant';

interface EventFilteringModalProps {
    visible: boolean;
    hideModal: () => void;
    eventRequest?: eventsDiscovery.eventRequest;
}

const EventFilteringModal = (props: EventFilteringModalProps) => {
    const [includeTBA, setIncludeTBA] = useState<eventsDiscovery.includeTBAOrTBD>('no');
    const [includeTBD, setIncludeTBD] = useState<eventsDiscovery.includeTBAOrTBD>('no');
    const [sortingValue, setSortingValue] = useState<string>('');
    const eventFilter: eventsDiscovery.eventRequest = useSelector(getEventFilterSelector);

    const dispatch = useAppDispatch();
    const exist = () => dispatch(eventActions.exitEventList());
    const init = () => dispatch(eventActions.eventResetState());

    const enterProductListItem = (event: eventsDiscovery.eventRequest) =>
        dispatch(
            eventActions.enterEventList({
                page: event.page,
                size: event.size,
                countryCode: event.countryCode,
                keyword: event.keyword,
                includeTBA: event.includeTBA,
                includeTBD: event.includeTBD,
                sort: event.sort,
            }),
        );

    const handleTBAChipPress = () => {
        setIncludeTBA(includeTBA == 'yes' ? 'no' : 'yes');
    };
    const handleTBDChipPress = () => {
        setIncludeTBD(includeTBD == 'yes' ? 'no' : 'yes');
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.iconContainer}>
                <AppIcon onPress={() => props.hideModal()} color={COLORS.gray} name="close" size={24} />
            </View>
            <AppBoldText title="Filtering" />
        </View>
    );

    const renderBottom = () => (
        <View style={styles.bottomContainer}>
            <AppButton
                style={styles.button}
                label="Apply Filter"
                oPress={() => {
                   
                    init();
                    exist();
                    enterProductListItem({
                        page: 1,
                        size: 20,
                        includeTBA: includeTBA,
                        includeTBD: includeTBD,
                        countryCode: eventFilter.countryCode,
                        keyword: eventFilter.keyword,
                        sort: sortingValue,
                    });
                    props.hideModal();
                }}
            />
        </View>
    );

    const renderFiltrationBody = () => (
        <View style={styles.filterContainer}>
            <AppBoldText style={styles.text} title="Filter By" />
            <View style={styles.filterChips}>
                <AppChip
                    style={[styles.chip, { backgroundColor: includeTBA == 'yes' ? COLORS.primary : COLORS.lightGrey }]}
                    selectedColor={COLORS.black}
                    name="includeTBA"
                    selected
                    onPress={handleTBAChipPress}
                />
                <AppChip
                    style={[styles.chip, { backgroundColor: includeTBD == 'yes' ? COLORS.primary : COLORS.lightGrey }]}
                    selectedColor={COLORS.black}
                    name="includeTBD"
                    selected
                    onPress={handleTBDChipPress}
                />
            </View>
        </View>
    );

    const renderSortingBody = () => (
        <View style={styles.sortingContainer}>
            <AppBoldText style={styles.text} title="Sort" />
            <AppDropDown sortingValue={(sortingValue)=>{
                setSortingValue(sortingValue);
            }} data={EVENT_SORTING_PARAMS} placeholder={"Sort By"}  />
          
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
            {renderFiltrationBody()}
            {renderSortingBody()}
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
        justifyContent: 'flex-end',
        flexGrow: 1,
        marginBottom: SIZES.S_5,
    },
    filterContainer: {},
    sortingContainer: {},
    filterChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        marginHorizontal: SIZES.S_2,
        marginVertical: SIZES.S_2,
    },
    text: {
        marginHorizontal: SIZES.S_2,
        marginVertical: SIZES.S_2,
    },
});

export default EventFilteringModal;
