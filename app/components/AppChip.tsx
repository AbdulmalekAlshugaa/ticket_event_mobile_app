import { TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import { Chip } from 'react-native-paper';

interface AppChipProps {
    name: string;
    icon?: string;
    selected: boolean;
    
    style?: ViewStyle;
    onPress?: () => void;
    selectedColor?: string;
    showSelectedOverlay?: boolean;

}

const AppChip = (props: AppChipProps) => {
  
    return (
          <Chip compact={true} style={props.style} showSelectedCheck={false}  showSelectedOverlay={props.showSelectedOverlay} selected={props.selected} selectedColor={props.selectedColor}  icon={props.icon} onPress={props.onPress}>{props.name}</Chip>
    );
};

export default AppChip;
