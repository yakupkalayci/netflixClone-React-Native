// Import React
import { Dispatch, SetStateAction } from 'react';
import { View, TextInput, Button } from 'react-native';

// Import Constant
import { CUSTOM_COLORS } from '../../common/constants/colors/customColors';

// Import i18next
import { t } from 'i18next';

// Import styles
import styles from '../../assets/styles/CommentForm.style';

interface CommentProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  handleAddComment: () => void;
}

function CommentForm(props: CommentProps): JSX.Element {
  // destruct props
  const { comment, setComment, handleAddComment } = props;

  return (
    <View>
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder={t('GLOBAL.COMPONENTS.TEXT_INPUT.PLACEHOLDERS.TYPE_COMMENT')}
        style={styles.input}
      />
      <Button
        title={t('GLOBAL.COMPONENTS.BUTTON.TITLES.ADD_COMMENT')}
        color={CUSTOM_COLORS.RED}
        onPress={() => handleAddComment()}
      />
    </View>
  );
}

export default CommentForm;
