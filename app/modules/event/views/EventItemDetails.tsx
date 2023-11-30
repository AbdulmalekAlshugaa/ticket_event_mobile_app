import { View, StyleSheet } from 'react-native';
import React from 'react';
import { AppIcon, AppBoldText, AppBodyText } from '../../../components';
import { SIZES, COLORS } from '../../../modules/main/src/mainConstants';

interface EventItemDetailsProps {
    title: string;
    body: string;
    icon: string;
}

const EventItemDetails = (props: EventItemDetailsProps) => {
    return (
        <View style={styles.eventDateView}>
            <View style={styles.calenderContainer}>
                <AppIcon name={props.icon} size={24} color={COLORS.white} />
            </View>
            <View
                style={{
                    marginHorizontal: SIZES.S_8,
                }}
            >
                <AppBoldText variant={'titleMedium'} title={props.title} />
                <AppBodyText
                    style={{
                        color: COLORS.gray,
                    }}
                    title={props.body}
                    variant={'bodyMedium'}
                />
            </View>
        </View>
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
        marginVertical: SIZES.S_3,
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
});

export default EventItemDetails;
