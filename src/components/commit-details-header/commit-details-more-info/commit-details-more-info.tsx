import * as React from 'react';
import {View, Text} from 'react-native';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {CommitPill} from '../../commit-pill';
import {theme, textStyles} from '../../../constants';
import {TouchableRipple} from 'react-native-paper';

export const CommitDetailsMoreInfo = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const surfaceSecondary = useDynamicValue(theme.colors.on_surface_secondary);

  const [showCopied, setShowCopied] = React.useState(false);

  const orng = useDynamicValue(theme.colors.change_mixed);
  const prpl = useDynamicValue(theme.colors.change_refactored);

  const copyText = () => {
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1250);
  };

  const copyTextColor = showCopied
    ? {
        color: surfaceSecondary,
      }
    : {};

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>REF</Text>
        </View>
        <View style={[styles.sectionBody, styles.tagsContainer]}>
          <CommitPill
            name="origin/master"
            isGitHub={true}
            color={orng}
            style={styles.tag}
          />
          <CommitPill name="master" color={prpl} style={styles.tag} />
        </View>
      </View>

      <TouchableRipple
        style={[styles.sectionContainer, styles.shaSectionContainer]}
        onPress={copyText}>
        <>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>SHA</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.shaText} ellipsizeMode="tail" numberOfLines={1}>
              2d1c7df6cf06b54d982b1b5ffd0551f06b54d982b1b5ffd0551
            </Text>
            <Text style={[styles.copyText, copyTextColor]}>
              {!showCopied ? 'Copy' : 'Copied'}
            </Text>
          </View>
        </>
      </TouchableRipple>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>PAR</Text>
        </View>
        <View style={styles.sectionBody}>
          <TouchableRipple style={styles.parButton} onPress={() => {}}>
            <Text style={styles.parText}>8a26e06</Text>
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flexDirection: 'column',
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    marginRight: 8,
  },
  sectionContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  shaSectionContainer: {
    paddingVertical: 12,
  },
  sectionTitle: {
    width: 72,
    display: 'flex',
    justifyContent: 'center',
  },
  sectionTitleText: {
    ...textStyles.caption_01,
    textAlign: 'center',
  },
  sectionBody: {
    flexGrow: 1,
    width: 1,
    flexDirection: 'row',
  },
  shaText: {
    ...textStyles.caption_02,
    color: theme.colors.on_surface_secondary,
    width: 1,
    flexGrow: 1,
  },
  copyText: {
    marginHorizontal: 16,
    ...textStyles.caption_01,
    color: theme.colors.primary,
  },
  parButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    borderRadius: theme.lessRoundness,
  },
  parText: {
    color: theme.colors.primary,
    ...textStyles.caption_01,
  },
});