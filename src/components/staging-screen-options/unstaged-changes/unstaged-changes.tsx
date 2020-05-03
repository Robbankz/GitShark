import * as React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import {SharkSubheader} from '../../shark-subheader';
import {FileChangeListItemWithCheckbox} from '../../file-change-list-item';
import {ChangesArrayItem} from '../../../services';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkDivider} from '../../shark-divider';

interface UnstagedChangesProps {
  addToStaged: (changes: ChangesArrayItem[]) => Promise<void>;
  unstagedChanges: ChangesArrayItem[];
}

export const UnstagedChanges = ({
  addToStaged,
  unstagedChanges,
}: UnstagedChangesProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [selectedUnstagedChanges, setSelectedUnstagedChanges] = React.useState<
    ChangesArrayItem[]
  >([]);
  const [showUnstagedDivider, setShowUnstagedDivider] = React.useState(false);

  const onUnstagedScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!event.nativeEvent.contentOffset.y) {
      setShowUnstagedDivider(false);
      return;
    }
    setShowUnstagedDivider(true);
  };

  const unstagedBtnText = selectedUnstagedChanges.length
    ? 'Stage'
    : 'Stage All';

  const unstagedBtnAction = React.useMemo(() => {
    if (selectedUnstagedChanges.length) {
      return async () => {
        await addToStaged(selectedUnstagedChanges);
        setSelectedUnstagedChanges([]);
      };
    }
    return () => addToStaged(unstagedChanges);
  }, [addToStaged, selectedUnstagedChanges, unstagedChanges]);

  const toggleSelected = (change: ChangesArrayItem) => {
    const filteredUnstaged = selectedUnstagedChanges.filter(
      unChange => unChange.fileName !== change.fileName,
    );
    // The array does not contain the item
    if (filteredUnstaged.length !== selectedUnstagedChanges.length) {
      setSelectedUnstagedChanges(filteredUnstaged);
      return;
    }
    setSelectedUnstagedChanges([...selectedUnstagedChanges, change]);
  };

  return (
    <>
      <SharkSubheader
        buttonText={unstagedBtnText}
        calloutText={'Unstaged'}
        onButtonClick={unstagedBtnAction}
      />
      {showUnstagedDivider && <SharkDivider />}
      <ScrollView style={styles.changesList} onScroll={onUnstagedScroll}>
        {unstagedChanges.map(props => {
          const isChecked = !!selectedUnstagedChanges.find(
            change => change.fileName === props.fileName,
          );
          return (
            <FileChangeListItemWithCheckbox
              isChecked={isChecked}
              key={props.fileName}
              onToggle={() => toggleSelected(props)}
              {...props}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  changesList: {
    paddingHorizontal: 16,
  },
});
