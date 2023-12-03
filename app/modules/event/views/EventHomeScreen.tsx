import { View, StyleSheet, Image, Linking, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { AppBodyText, AppBoldText, AppButton, AppSearch } from '../../../components';
import { COLORS, SIZES } from '../../main/src/mainConstants';
import { useAppDispatch } from '../../main/src/configureStore';
import { eventActions } from '../src/eventActions';
import { useSelector } from 'react-redux';
import { getEventsSelector, getLatestSearchSelector } from '../src/eventSelectors';
import Carousel from 'react-native-reanimated-carousel';
import EventHomeCarousel from './EventHomeCarousel';
import { formatDateString } from '../src/eventUtils';
import { Card } from 'react-native-paper';
import App from 'App';
import { navigateTo } from '../../navigation/RootNavigation';
import { EVENT_SCREEN_NAMES } from '../src/eventConstant';
import EventItem from './EventItem';

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
    // selectors
    const eventsData = useSelector(getEventsSelector);
    const latestSearch = useSelector(getLatestSearchSelector);
    console.log(latestSearch);

    useEffect(() => {
        enterEventListItem(1);
        return () => {
            exist();
        };
    }, []);

    const renderItem = ({ item }: any) => {
        const date = formatDateString(item.dates.start.dateTime, 'DD MMMM, YYYY');
        return (
            <EventHomeCarousel
                eventName={item.name}
                eventDate={date}
                image={item.images[0].url}
                onPress={() => {
                    console.log('item', item);
                }}
            />
        );
    };

    const renderHeaderContainer = () => (
        <View>
            <View style={styles.upComingEvent}>
                <AppBoldText style={styles.text} title={'Up Coming Events'} />
                <TouchableOpacity onPress={() => navigateTo(EVENT_SCREEN_NAMES.EVENT_LISTING_ITEM)}>
                    <AppBodyText style={styles.text} title={'See All'} />
                </TouchableOpacity>
            </View>
            <Carousel
                loop
                width={SIZES.width}
                height={SIZES.width / 2}
                autoPlay={true}
                data={eventsData}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => renderItem({ item })}
            />
        </View>
    );

    const renderEvents = (item: any) => (
        <EventItem
            onPress={() => navigateTo(EVENT_SCREEN_NAMES.EVENT_LISTING_ITEM_DETAILS, { item: item })}
            title={item.name}
            image={item.images[0].url}
            body={item?.promoter?.description}
            type={item.type}
            country={item?._embedded?.venues[0]?.country.name}
        />
    );

    const renderLatestSearchContainer = () => (
        <View>
            <AppBoldText style={styles.text} title="Latest Search" />
            {latestSearch.length > 0 ? (
                <FlatList
                    horizontal
                    data={latestSearch.slice(0, 3)}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    renderItem={({ item }) => {
                        return renderEvents(item);
                    }}
                    keyExtractor={item => `${item.id}`}
                    contentContainerStyle={{
                        paddingBottom: 10,
                    }}
                    onEndReachedThreshold={0.1}
                    ListFooterComponentStyle={{
                        paddingBottom: 10,
                    }}
                />
            ) : (
                <View
                    style={{
                        marginVertical: SIZES.S_2,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}
                >
                    <AppBodyText style={styles.text} title="No Search Found" />
                </View>
            )}
        </View>
    );

    const renderMyPortfolioContainer = () => (
        <Card style={styles.myPortfolioContainer}>
            <Card.Content
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <AppBoldText style={styles.text} title={'Please check my portfolio  '} />
                <Image style={styles.myPortfolioImage} source={require('../../../../assets/MyPortfolio.jpeg')} />
            </Card.Content>
            <AppButton
                label="Visit "
                style={{
                    marginHorizontal: SIZES.S_5,
                    marginVertical: SIZES.S_6,
                }}
                oPress={() => Linking.openURL('https://abdulmalik-rho.vercel.app/')}
            />
        </Card>
    );

    return (
        <View style={styles.screen}>
            {renderHeaderContainer()}
            {renderMyPortfolioContainer()}
            {renderLatestSearchContainer()}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    upComingEvent: {
        marginHorizontal: SIZES.S_4,
        marginVertical: SIZES.S_2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        marginHorizontal: SIZES.S_4,
        marginVertical: SIZES.S_2,
    },
    myPortfolioContainer: {
        marginHorizontal: SIZES.S_2,
        marginVertical: SIZES.S_2,
        borderRadius: SIZES.S_8,
        backgroundColor: COLORS.white,
        elevation: SIZES.S_2,
    },
    myPortfolioImage: {
        width: 50,
        height: 50,
        borderRadius: SIZES.S_8,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EventHomeScreen;
