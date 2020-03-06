import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {textStyles} from '../../constants/text-styles';

interface ErrorMessageBoxProps {
  message: string;
  style?: StyleProp<ViewStyle>;
}
export const ErrorMessageBox = ({
  message,
  style = {},
}: ErrorMessageBoxProps) => {
  return (
    <View style={[styles.errorBoxContainer, style]}>
      <Icon name="alert-circle" size={18} color={theme.colors.error_light} />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorBoxContainer: {
    backgroundColor: theme.colors.error_light_background,
    flexDirection: 'row',
    paddingLeft: 7,
    paddingRight: 12,
    paddingVertical: 7,
    borderRadius: theme.roundness,
  },
  errorText: {
    marginLeft: 7,
    color: theme.colors.error_light,
    ...textStyles.caption_01,
  },
});
