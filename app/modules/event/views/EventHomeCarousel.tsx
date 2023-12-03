import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Card, Text } from 'react-native-paper';
import { COLORS, SIZES } from '../../main/src/mainConstants';
import { AppBodyText, AppBoldText } from '../../../components';
import { LinearGradient } from 'expo-linear-gradient';

interface EventListItemProps {
  eventName: string;
  eventDate: string;
  image: string;
  onPress?: () => void;
}

const EventHomeCarousel = (props: EventListItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        source={{ uri: props.image }}
      >
        <LinearGradient
        // Background Linear Gradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.background}
      />
     <View style={styles.bodyContent}>
     <AppBoldText style={styles.text} title={props.eventName} variant='labelLarge' />
      <AppBodyText style={styles.DateText} title={'Book Tickets'} variant='bodySmall' />
      <AppBodyText style={styles.text} title={props.eventDate} variant='bodyMedium' />
     </View>
       
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    borderRadius: SIZES.S_8,
    flex: 1,
    marginHorizontal: SIZES.S_3,
    marginVertical: SIZES.S_2,
    overflow: 'hidden', // Ensure that the border-radius works as expected
  },

  image: {
    width: '100%', // Take up 100% of the parent container's width
    aspectRatio: 16 / 9, // Adjust the aspect ratio as needed (16:9 in this example)
    borderRadius: SIZES.S_8,
  },
  bodyContent: { position: 'absolute',
  bottom: SIZES.S_8,
  margin: SIZES.S_8,
  },
  text: {
    color: COLORS.white,
   
  },  
  DateText: {
    color: COLORS.lightGrey,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
  },
});

export default EventHomeCarousel;
