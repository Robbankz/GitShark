import * as React from 'react';
import {View, Text, Animated} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {CommitDetailsDualAuthor} from './commit-detail-dual-author';
import {textStyles, theme} from '@constants';
import {DropdownContent} from '@components/dropdown-content';
import {AnimatedDropdownArrow} from '@components/animated-dropdown-arrow';
import {TouchableRipple} from 'react-native-paper';
import {CommitDetailsMoreInfo} from './commit-details-more-info';
import {CommitMessageDropdown} from './commit-message-dropdown/commit-message-dropdown';

const messageDefault = `
The \`FormStyle\` enum offers two options, and the explanation of the difference between the two can be found on the CLDR official website. Sadly, the link changed and the one currently referenced is a dead-end. This commit fixes the link.

PR Close #37069
`.trim();

interface CommitDetailsHeaderProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
  messageExpanded: boolean;
  setMessageExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CommitDetailsHeader = ({
  expanded,
  setExpanded,
  messageExpanded,
  setMessageExpanded,
  message = messageDefault,
}: CommitDetailsHeaderProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const [showMoreInfoOpacity] = React.useState(new Animated.Value(0));
  const [showLessInfoOpacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (expanded) {
      Animated.parallel([
        Animated.timing(showMoreInfoOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(showLessInfoOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(showMoreInfoOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(showLessInfoOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [expanded, showMoreInfoOpacity, showLessInfoOpacity]);

  return (
    <View style={styles.container}>
      <Text style={styles.commitStyle}>
        fix(dev-infra): exit non-zero if commit message validation failed
      </Text>
      {!!message && (
        <CommitMessageDropdown
          message={message}
          expanded={messageExpanded}
          setExpanded={setMessageExpanded}
        />
      )}
      <CommitDetailsDualAuthor expanded={expanded} style={styles.authorBlock} />
      <DropdownContent expanded={expanded}>
        <CommitDetailsMoreInfo />
      </DropdownContent>
      <TouchableRipple
        style={styles.dropdownContainer}
        onPress={() => setExpanded(v => !v)}>
        <>
          <AnimatedDropdownArrow
            expanded={expanded}
            setExpanded={setExpanded}
          />
          <View style={styles.dropdropTextContainer}>
            <Animated.Text
              style={[styles.dropdownText, {opacity: showMoreInfoOpacity}]}>
              More info
            </Animated.Text>
            <Animated.Text
              style={[
                styles.dropdownText,
                styles.showLess,
                {opacity: showLessInfoOpacity},
              ]}>
              Less info
            </Animated.Text>
          </View>
        </>
      </TouchableRipple>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {},
  commitStyle: {
    ...textStyles.callout,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  authorBlock: {
    marginTop: 8,
    paddingVertical: 4,
    paddingLeft: 8,
    paddingRight: 16,
  },
  dropdownContainer: {
    paddingLeft: 16,
    paddingRight: 24,
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    ...textStyles.caption_01,
    color: theme.colors.primary,
    marginLeft: 16,
    flexGrow: 1,
    textAlignVertical: 'center',
  },
  dropdropTextContainer: {
    position: 'relative',
  },
  showLess: {
    position: 'absolute',
    height: '100%',
  },
});