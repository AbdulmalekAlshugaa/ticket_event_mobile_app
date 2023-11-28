import { TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface AppIconProps {
  name: string;
  size: number;
  color: string;
  style?: ViewStyle;
  onPress?: () => void;
}

const AppIcon = (props: AppIconProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon name={props.name} size={props.size} color={props.color} />
    </TouchableOpacity>
  );
};

export default AppIcon;
