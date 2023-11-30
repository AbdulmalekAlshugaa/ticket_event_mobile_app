import { COLORS, SIZES } from '../modules/main/src/mainConstants';
import React, { ReactNode } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface AppModalProps {
    hideModal: () => void;
    visible: boolean;
    containerStyle?: ViewStyle;
    contentStyle?: ViewStyle;
    children?: ReactNode;
    centered?: boolean;
    height?: any;
    maxHeight?: number;
}

const AppModal: React.FC<AppModalProps> = ({
    hideModal,
    visible,
    containerStyle,
    contentStyle,
    children,
    centered,
    height,
    maxHeight,
}) => {
    return (
        <Modal
            style={[styles.bottomContainer, centered && containerStyle]}
            onBackButtonPress={hideModal}
            onBackdropPress={hideModal}
            isVisible={visible}
        >
            <View
                style={[
                    styles.wrapper,
                    centered && styles.centerWrapper,
                    contentStyle,
                    height && { height },
                    maxHeight && { maxHeight },
                ]}
            >
                {children}
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    centerContainer: {
        justifyContent: 'center',
        marginHorizontal: SIZES.S_7,
        backgroundColor: COLORS.secondary,
    },
    bottomContainer: {
        justifyContent: 'flex-end',
        marginBottom: 0,
        marginHorizontal: 0,
        marginTop: 50,
    },
    wrapper: {
        borderRadius: 8,
        paddingBottom: 10,
        backgroundColor: COLORS.secondary,
        padding: SIZES.S_5,
        overflow: 'hidden',
    },
    centerWrapper: {
        height: null,
        paddingBottom: 0,
    },
});

export default AppModal;
