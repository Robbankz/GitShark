import * as React from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewStyle,
} from 'react-native';
import {textStyles, theme} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

interface SharkTextInputProps {
  placeholder: string;
  prefixIcon?: string;
  postfixIcon?: string;
  ellipsizeMode?: TextProps['ellipsizeMode'];
  numberOfLines?: TextProps['numberOfLines'];
  value: TextInputProps['value'];
  onChangeText: TextInputProps['onChangeText'];
  style?: StyleProp<ViewStyle>;
}

export const SharkTextInput = ({
  placeholder,
  prefixIcon,
  postfixIcon,
  numberOfLines,
  value,
  onChangeText,
  style = {},
}: SharkTextInputProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const surfaceSecondary = useDynamicValue(theme.colors.on_surface_secondary);
  const accent = useDynamicValue(theme.colors.primary);

  const paddingLeft = !!prefixIcon ? 0 : 12;
  const paddingRight = !!postfixIcon ? 0 : 12;
  const paddingVert = !!prefixIcon || !!postfixIcon ? 8 : 16;

  const padding = {
    paddingLeft,
    paddingRight,
    paddingTop: paddingVert,
    paddingBottom: paddingVert,
  };

  const multiline = (numberOfLines || 1) > 1;

  const textAreaStyles = !multiline
    ? {}
    : ({
        textAlignVertical: 'top',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

  return (
    <View style={[styles.textInputContainer, padding, style]}>
      {!!prefixIcon && (
        <Icon
          size={24}
          name={prefixIcon}
          color={surfaceSecondary}
          style={styles.icon}
        />
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.textInput, textAreaStyles]}
        placeholderTextColor={surfaceSecondary}
        numberOfLines={numberOfLines}
        multiline={multiline}
      />
      {!!postfixIcon && (
        <Icon size={24} name={postfixIcon} color={accent} style={styles.icon} />
      )}
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  textInputContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderColor: theme.colors.divider,
    borderWidth: 1,
    borderRadius: theme.roundness,
    alignContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    marginHorizontal: 4,
    padding: 8,
  },
  textInput: {
    flexGrow: 1,
    flexShrink: 1,
    margin: 0,
    backgroundColor: 'transparent',
    padding: 0,
    ...textStyles.body_01,
    color: theme.colors.on_surface,
  },
});
