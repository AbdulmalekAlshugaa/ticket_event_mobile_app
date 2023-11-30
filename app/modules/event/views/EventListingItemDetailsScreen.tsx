import { View,  StyleSheet, ImageBackground, ScrollView } from 'react-native';
import React,{useEffect} from 'react';
import { MainSafeAreaScreen } from '../../main/view';
import { COLORS, SIZES } from '../../main/src/mainConstants';
import AppIcon from '../../../components/AppIcon';
import { goBack } from '../../navigation/RootNavigation';
import { AppBodyText, AppBoldText, AppButton } from '../../../components';
import EventItemDetails from './EventItemDetails';
import { formatDateString } from '../src/eventUtils';
import { useAppDispatch } from '../../main/src/configureStore';
import { eventActions } from '../src/eventActions';

const EventListingItemDetailsScreen = ({ route }) => {
    const item = route.params.item;
    const dispatch = useAppDispatch();

    const exist = () => dispatch(eventActions.exitEventDetails());
    const dropOff = () => dispatch(eventActions.dropOffEventDetails());

    useEffect(() => {
        return () => {
            exist();
        };
    }, []);

    const renderEventImage = () => (
        <MainSafeAreaScreen style={styles.imageBackground}>
            <ImageBackground
                progressiveRenderingEnabled={true}
                resizeMode={'cover'}
                imageStyle={styles.image}
                source={{
                    uri: item.images[0].url,
                }}
                style={styles.imageBackground}
            >
                <AppIcon
                    style={styles.backButton}
                    name={'arrow-left'}
                    color={COLORS.black}
                    size={24}
                    onPress={dropOff}
                />
            </ImageBackground>
        </MainSafeAreaScreen>
    );

    const renderEventDetails = () => {
        const date = formatDateString(item.dates.start.dateTime, 'DD MMMM, YYYY');
        return (
            <View style={styles.productDescriptionView}>
                <AppBoldText variant={'displaySmall'} title={item.name} />
                <EventItemDetails title={date} body={item.dates.start.localTime} icon={'calendar'} />
                <EventItemDetails title={item._embedded.venues[0].country.name} body={item._embedded.venues[0].city.name} icon={'map'} />
                <AppBoldText style={styles.text}  title={'GeneralInfo'} />
            <AppBodyText variant={'bodyMedium'} title={item._embedded.venues[0].accessibleSeatingDetail} />
            </View>
        );
    };

   

    const renderButton = () => (
        <View style={styles.buttonView}>
            <View>
                <AppBodyText style={styles.body} variant={'bodySmall'} title={' Price'} />
                <AppBoldText title={"$ "+ item.priceRanges[0].min+"-"+item.priceRanges[0].max} variant={'titleMedium'} />
            </View>
            <AppButton label={'Buy Now'} icon="ticket" oPress={() => console.log('Buy Now')} />
        </View>
    );

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
                {renderEventImage()}
                {renderEventDetails()}
          
            </ScrollView>
            {renderButton()}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        height: SIZES.height / 3,
        width: SIZES.width,
    },
    eventDateView: {
        flexDirection: 'row',
        marginHorizontal: SIZES.S_8,
        flex: 0.1,
    },
    calenderContainer: {
        width: 50,
        height: 50,
        borderRadius: SIZES.S_8,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },  
    productDescriptionView: {
        flex: 1,
        borderTopRightRadius: SIZES.S_8,
        borderTopLeftRadius: SIZES.S_8,
        shadowColor: COLORS.gray,
        backgroundColor: COLORS.white,
        elevation: 5,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        padding: SIZES.S_8,
    },
    body: {
        color: COLORS.gray,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SIZES.S_8,
        margin: SIZES.S_10,
        flex: 0.1,
    },
    backButton: {
        marginVertical: SIZES.S_5,
        marginHorizontal: SIZES.S_5,
    },
    text: {
        marginTop: SIZES.S_5,
        marginBottom: SIZES.S_2,
    },
});

export default EventListingItemDetailsScreen;
