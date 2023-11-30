import { StyleSheet, View } from 'react-native';
import React from 'react';
import AppBodyText from '../../../components/AppBodyText';

interface MainErrorsScreenProps {
    title: string;
}

const MainErrorsScreen = (props: MainErrorsScreenProps) => {
    return (
        <View style={styles.container}>
            <AppBodyText title={props.title} />
        </View>
    );
};

export default MainErrorsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
