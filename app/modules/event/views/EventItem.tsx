import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../main/src/mainConstants";
import AppBodyText from "../../../components/AppBodyText";
import AppBoldText from "../../../components/AppBoldText";
import { Card, Text } from "react-native-paper";

interface EventListItemProps {
  title: string;
  body: string;
  image: string;
  type: string;
  country: string;
  onPress?: () => void;
}



const EventItem = (props: EventListItemProps) => {

  const renderLeftComponent = () => (
    <View
    style={styles.leftComponents}>
    <Text
      style={{
        color: COLORS.white,
        marginStart: 10,
        marginTop: 5,
        textAlign: 'right',
      }}>
      {props.type}
    </Text>
  </View>
  );

  return (
    <TouchableOpacity  onPress={props.onPress}>
      <Card style={styles.container}>
        <Card.Content style={styles.body}>
        <Image
          style={styles.image}
          resizeMode={"cover"}
          source={{ uri: props.image }}
        />
        <View style={styles.bodyContent}>
        <AppBoldText
            style={styles.titleText}
            numberOfLines={2}
            title={props.title}
          />
          <AppBodyText
            style={styles.bodyText}
            numberOfLines={3}
            title={props.body}
          />
           <AppBodyText
            style={styles.timeZoneText}
            numberOfLines={1}
            title={props.country}
          />
        </View>
         
        </Card.Content>
      </Card>
      {renderLeftComponent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.S_8,
    marginVertical: SIZES.S_2,
    marginHorizontal: SIZES.S_3,
    
  },
  image: {
    width: 105,
    height: 105,
    borderRadius: SIZES.S_8,
    marginHorizontal: SIZES.S_4,
  },
  titleText: {
    marginEnd: SIZES.S_2,

  },
  bodyText: {
    marginEnd: SIZES.S_2,
    color: COLORS.primary,
    marginTop: SIZES.S_2,
  },
  timeZoneText: {
    marginEnd: SIZES.S_2,
    color: COLORS.gray,
    marginTop: SIZES.S_2,
  },
  body: {
    flexDirection: "row",
  },
  bodyContent: {
    flex: 1,
    justifyContent: 'center',  
  },
  leftComponents: {
    position: 'absolute',
    right: 5,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: COLORS.primary,
    height: 30,
  },
});

export default EventItem;
