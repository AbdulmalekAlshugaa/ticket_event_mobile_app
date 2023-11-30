import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import React from 'react';
import { MainSafeAreaScreen } from '../../main/view';
import { COLORS, SIZES } from '../../main/src/mainConstants';
import AppIcon from '../../../components/AppIcon';
import { goBack } from '../../navigation/RootNavigation';
import { AppBodyText, AppBoldText, AppButton } from '../../../components';

const EventListingItemDetailsScreen = () => {
    const renderEventImage = () => (
        <MainSafeAreaScreen style={styles.imageBackground}>
            <ImageBackground
                progressiveRenderingEnabled={true}
                resizeMode={'cover'}
                imageStyle={styles.image}
                source={{
                    uri: 'https://s1.ticketm.net/dam/a/ae2/5beb62d8-2c29-4c5c-aa7d-c7513e229ae2_1340121_TABLET_LANDSCAPE_3_2.jpg',
                }}
                style={styles.imageBackground}
            >
                <AppIcon
                    style={styles.backButton}
                    name={'arrow-left'}
                    color={COLORS.black}
                    size={24}
                    onPress={() => goBack}
                />
            </ImageBackground>
        </MainSafeAreaScreen>
    );

    const renderEventDetails = () => (
        <View style={styles.productDescriptionView}>
           
        </View>
    );

    const renderButton = () => (
        <View style={styles.buttonView}>
            <View>
                <AppBodyText style={styles.body} variant={'bodySmall'} title={' Price'} />
                <AppBoldText title={`$90`} variant={'titleMedium'} />
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
    subViewContainer: {
        bottom: 50,
        position: 'absolute',
        alignSelf: 'flex-end',
        padding: SIZES.S_10,
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    icon: {
        marginVertical: SIZES.S_5,
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
    descriptionTitle: {
        marginTop: SIZES.S_8,
    },
    description: {
        marginTop: SIZES.S_2,
        color: COLORS.gray,
    },
    body: {
        color: COLORS.gray,
    },
    productRattingView: {
        alignItems: 'center',
        flexDirection: 'row',
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
    badge: {
        position: 'absolute',
        top: 0,
        right: 15,
        zIndex: 10,
    },
});

export default EventListingItemDetailsScreen;
