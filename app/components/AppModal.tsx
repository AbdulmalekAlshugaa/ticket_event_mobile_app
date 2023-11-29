import { StyleSheet, Modal, Animated, TouchableOpacity } from "react-native";
import React from "react";
import AppBodyText from "./AppBodyText";

import AppIcon from "./AppIcon";
import { COLORS, SIZES } from "../modules/main/src/mainConstants";
import { MainSafeAreaScreen } from "../modules/main/view";
import AppCustomHeader from "./AppCustomHeader";

const AppModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [fadeAnim] = React.useState(new Animated.Value(0));

  const dismiss = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const show = () => {
    console.log("show");
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderFilter = () => (
    <TouchableOpacity
      onPress={() => console.log("data ius ")}
      style={styles.filterContainer}
    >
      <AppIcon
        onPress={show}
        name={"filter"}
        style={{ alignSelf: "center" }}
        color={COLORS.secondary}
        size={30}
      />
    </TouchableOpacity>
  );

  return (
    <Animated.View>
        <Modal
          visible={visible}
          transparent={true}
          animationType={"slide"}
          onRequestClose={dismiss}
        >
           <MainSafeAreaScreen>
           <AppCustomHeader onPress={dismiss} title={"Filter"} />
           </MainSafeAreaScreen>
        </Modal>
    
    
      {renderFilter()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    width: 50,
    height: 50,
    borderRadius: SIZES.S_8,
    backgroundColor: COLORS.lightGrey,
    marginVertical: SIZES.S_5,
    marginEnd: SIZES.S_2,
    justifyContent: "center",
  },
});

export default AppModal;
