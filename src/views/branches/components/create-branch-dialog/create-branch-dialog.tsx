import * as React from 'react';
import {View, TouchableWithoutFeedback, Text} from 'react-native';
import {AppDialog} from '@components/dialog';
import {SharkTextInput} from '@components/shark-text-input';
import {ErrorMessageBox} from '@components/error-message-box';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkCheckbox} from '@components/shark-checkbox';
import {textStyles, theme} from '@constants';

interface CreateBranchDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}

export const CreateBranchDialog = ({
  onDismiss,
  visible,
}: CreateBranchDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [branchName, setBranchName] = React.useState('');
  const [checkAfterCreate, setCheckAfterCreate] = React.useState(false);
  const [errorStr, setErrorStr] = React.useState('');

  const parentOnDismiss = (bool: boolean) => {
    setBranchName('');
    setCheckAfterCreate(false);
    setErrorStr('');
    onDismiss(bool);
  };

  const checkAndClone = async () => {
    // const gitBranchName = await getGitBranchName();
    // if (gitBranchName) {
    //   setErrorStr('The folder selected is already a git repository.');
    //   return;
    // }
    // setIsCloning(true);
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Create branch'}
      text={'Uncommitted changes will be moved to the new branch.'}
      main={
        <>
          <SharkTextInput
            placeholder={'Branch name'}
            value={branchName}
            onChangeText={val => setBranchName(val)}
            prefixIcon={'branch'}
          />
          {!!errorStr && (
            <ErrorMessageBox style={styles.errorBox} message={errorStr} />
          )}
          <TouchableWithoutFeedback
            style={styles.checkboxContainer}
            onPress={() => setCheckAfterCreate(v => !v)}>
            <View style={styles.checkboxView}>
              <SharkCheckbox
                checked={checkAfterCreate}
                onValueChange={setCheckAfterCreate}
              />
              <Text style={styles.checkoutText}>Checkout after creation</Text>
            </View>
          </TouchableWithoutFeedback>
        </>
      }
      actions={
        <>
          <SharkButton
            onPress={() => parentOnDismiss(false)}
            type="outline"
            style={styles.cancelBtn}
            text={'Cancel'}
          />
          <SharkButton
            onPress={() => checkAndClone()}
            type="primary"
            text={'Create'}
          />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  errorBox: {
    marginTop: 8,
  },
  cancelBtn: {
    borderColor: theme.colors.divider,
    borderWidth: 2,
    marginRight: 16,
  },
  checkboxView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginTop: 8,
  },
  checkoutText: {
    color: theme.colors.on_surface,
    ...textStyles.body_01,
  },
});