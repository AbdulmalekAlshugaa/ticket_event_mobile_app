import { View, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../main/src/mainConstants';
import AppSearch from '../../../components/AppSearch';
import EventItem from './EventItem';
import { MainLoadingScreen, MainSafeAreaScreen, MainErrorsScreen } from '../../main/view';
import { navigateTo } from '../../navigation/RootNavigation';
import EventCountrySelectionModal from './EventCountrySelectionModal';
import { AppIcon } from '../../../components';
import { useAppDispatch } from '../../main/src/configureStore';
import { eventActions } from '../src/eventActions';
import { useSelector } from 'react-redux';
import {
    getEventsSelector,
    isLoadingSelector,
    errorMessagesSelector,
    getTotalPagesSelector,
} from '../src/eventSelectors';
import { ActivityIndicator } from 'react-native-paper';
import { useDebounce } from '../../../modules/main/hooks/useDebounce';
import EventFilteringModal from './EventFilteringModal';

const EventListingItemScreen = () => {
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const [countryCode, setCountryCode] = useState('US');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);

    const enterProductListItem = (countryCode: string, page: number, keyword?: string) =>
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
    const isLoading: boolean = useSelector(isLoadingSelector);
    const errorMessages: string = useSelector(errorMessagesSelector);
    const totalPages: number = useSelector(getTotalPagesSelector);

    useEffect(() => {
        enterProductListItem(countryCode, page);
        return () => {
            exist();
        };
    }, []);

    const renderEvents = (item: any) => (
        <EventItem
            onPress={() => navigateTo('EventListingItemDetails', { item })}
            title={item.name}
            image={item.images[0].url}
            body={item?.promoter?.description}
            type={item.type}
            country={item._embedded.venues[0].country.name}
        />
    );
    const renderCountrySelection = () => (
        <EventCountrySelectionModal
            countryCode={(countryCode: string) => {
                init();
                exist();
                setCountryCode(countryCode);
                enterProductListItem(countryCode, 1);
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
        enterProductListItem(countryCode, page + 1);
        setPage(page + 1);
    };

    const renderFooter = () => {
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: '#CED0CE',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
        );
    };
    const hideModal = () => {
        setModalVisible(false);
    };
    const renderFilterModal = () => <EventFilteringModal visible={isModalVisible} hideModal={hideModal} />;
    const applySearch = useDebounce((value: string) => {
        console.log('value', value);
        exist();
        enterProductListItem(countryCode, page + 1, value);
    }, 700); // delay in ms

    const renderEventsList = () => (
        <FlatList
            data={eventsData}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            renderItem={({ item }) => {
                //  console.log("item", item.id);
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
                    refreshing={isRefetching}
                    onRefresh={() => {
                        setIsRefetching(true);
                        init();
                        exist();
                        enterProductListItem('US', 1);
                        setPage(1);
                        setIsRefetching(false);
                    }}
                />
            }
        />
    );
    return (
        <>
            {renderFilterModal()}
            {renderSearchContainer()}
            {renderCountrySelection()}
            {isLoading && page === 1 ? (
                <MainLoadingScreen />
            ) : eventsData.length > 0 ? (
                <MainSafeAreaScreen>{renderEventsList()}</MainSafeAreaScreen>
            ) : (
                <>
                    <MainSafeAreaScreen>
                        <MainErrorsScreen title={errorMessages} />
                    </MainSafeAreaScreen>
                </>
            )}
        </>
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
});

export default EventListingItemScreen;
