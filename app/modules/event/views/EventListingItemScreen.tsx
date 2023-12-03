import { View, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../main/src/mainConstants';
import AppSearch from '../../../components/AppSearch';
import EventItem from './EventItem';
import { MainLoadingScreen, MainSafeAreaScreen, MainErrorsScreen } from '../../main/view';
import EventCountrySelectionModal from './EventCountrySelectionModal';
import { AppCustomHeader, AppIcon } from '../../../components';
import { useAppDispatch } from '../../main/src/configureStore';
import { eventActions } from '../src/eventActions';
import { useSelector } from 'react-redux';
import {
    getEventsSelector,
    isLoadingSelector,
    errorMessagesSelector,
    getTotalPagesSelector,
    getErrorMessages,
} from '../src/eventSelectors';
import { ActivityIndicator } from 'react-native-paper';
import { useDebounce } from '../../../modules/main/hooks/useDebounce';
import EventFilteringModal from './EventFilteringModal';

const EventListingItemScreen = () => {
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const [countryCode, setCountryCode] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    // Actions
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
    const enterEventDetails = (item: any) => dispatch(eventActions.enterEventDetails(item));
    const dropOff = () => dispatch(eventActions.dropOffEventList());

    // Selectors
    const eventsData = useSelector(getEventsSelector);
    const isLoading: boolean = useSelector(isLoadingSelector);
    const getError = useSelector(getErrorMessages);
    const errorMessages: string = useSelector(errorMessagesSelector);
    const totalPages: number = useSelector(getTotalPagesSelector);
  

    const renderEvents = (item: any) => (
        <EventItem
            onPress={() => enterEventDetails(item)}
            title={item.name}
            image={item.images[0].url}
            body={item?.promoter?.description}
            type={item.type}
            country={item?._embedded?.venues[0]?.country.name}
        />
    );
    const renderCountrySelection = () => (
        <EventCountrySelectionModal
            countryCode={(countryCode: string) => {
                init();
                exist();
                setCountryCode(countryCode);
                enterEventListItem(1, countryCode);
                setPage(1);
            }}
        />
    );

    const renderFilter = () => (
        <TouchableOpacity style={styles.filterContainer}>
            <AppIcon
                onPress={() => setModalVisible(true)}
                style={{ alignSelf: 'center' }}
                name={'filter'}
                color={COLORS.black}
                size={24}
            />
        </TouchableOpacity>
    );
    const renderSearchContainer = () => (
        <View style={styles.searchContainer}>
            <AppSearch style={styles.appSearch} onChangeText={applySearch} />
            {renderFilter()}
        </View>
    );
    const handleOnEndReached = () => {
        if (page === totalPages) return;
        exist();
        enterEventListItem(page + 1, countryCode && countryCode);
        setPage(page + 1);
    };

    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
        );
    };
    const hideModal = () => {
        setModalVisible(false);
    };
    const renderFilterModal = () => <EventFilteringModal visible={isModalVisible} hideModal={hideModal} />;
    const applySearch = useDebounce((value: string) => {
        init();
        exist();
        enterEventListItem(page + 1, countryCode && countryCode, value);
    }, 700); // delay in ms

    const renderEventsList = () => (
        <FlatList
            data={eventsData}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            renderItem={({ item }) => {
                return renderEvents(item);
            }}
            keyExtractor={item => `${item.id}`}
            onEndReached={handleOnEndReached}
            contentContainerStyle={{
                paddingBottom: 10,
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponentStyle={{
                paddingBottom: 10,
            }}
            ListFooterComponent={() => {
                if (totalPages > page) {
                    return renderFooter();
                }
                return null;
            }}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={() => {
                        init();
                        exist();
                        enterEventListItem(1);
                        setPage(1);
                    }}
                />
            }
        />
    );
    const renderError = () => {
        if (getError) {
            return <MainErrorsScreen title={errorMessages} />;
        }
    };
    return (
        <MainSafeAreaScreen>
            <View style={{
                marginHorizontal: SIZES.S_5,
            }}>
            <AppCustomHeader onPress={dropOff}  title={'Search '} icon="arrow-left" />
            </View>

            {renderFilterModal()}
            {renderSearchContainer()}
            {renderCountrySelection()}
            {renderError()}
            {isLoading && page === 1 ? <MainLoadingScreen /> : <View>{renderEventsList()}</View>}
        </MainSafeAreaScreen>
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
    iconContainer: {
        position: 'absolute',
        top: SIZES.S_5,
        left: SIZES.S_5,
        zIndex: 1,
    },
});

export default EventListingItemScreen;
