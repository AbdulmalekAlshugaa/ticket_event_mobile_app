import { View, StyleSheet,Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../main/src/mainConstants';
import AppBodyText from '../../../components/AppBodyText';
import AppBoldText from '../../../components/AppBoldText';


interface EventListItemProps {
  title: string;
  body: string;
  image: string;
  onPress?: () => void;
}

const EventItem = (props: EventListItemProps)=> {
  return (
    <View style={styles.container}>
      <Image
       style={styles.image} 
       resizeMode='cover'
       source={{uri:props.image}} />
       <View style={styles.body}>
          <AppBodyText
          variant={"bodySmall"}
          title={props.title}
          style={styles.titleText}
          />
          <AppBoldText
          variant={"bodyLarge"}
          title={props.body}
          style={styles.bodyText}
          />
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    borderRadius: SIZES.S_8,
    marginHorizontal: SIZES.S_5,

  },
  image: {
    width: 90,
    height: 120,
    borderRadius: SIZES.S_8,
    marginVertical: SIZES.S_4,
    marginHorizontal: SIZES.S_4,
  },
  titleText: {
    color: COLORS.primary,
    marginEnd: SIZES.S_2,
  },
  bodyText:{
    marginEnd: SIZES.S_2,
  },
  body:{
    marginVertical: SIZES.S_4,
    marginHorizontal: SIZES.S_4,
  }
  
});

export default  EventItem;