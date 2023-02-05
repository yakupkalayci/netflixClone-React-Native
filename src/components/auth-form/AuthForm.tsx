// Import React
import { Dispatch, SetStateAction } from 'react';
import { SafeAreaView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

// Import 18next
import { t } from 'i18next';

// Styles
import styles from '../../assets/styles/AuthForm.style';

interface AuthFormProps {
  type: 'login' | 'signup';
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  password: string;
  navigation: any;
  rePassword?: string;
  setRePassword?: Dispatch<SetStateAction<string>>;
  handleLogin?: () => void;
  handleSignUp?: () => void;
}

function AuthForm(props: AuthFormProps): JSX.Element {
  // destruct props
  const {
    type,
    email,
    setEmail,
    setPassword,
    password,
    rePassword,
    setRePassword,
    navigation,
    handleLogin,
    handleSignUp
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require('../../assets/img/logo.png')} style={styles.image} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={t('GLOBAL.COMPONENTS.TEXT_INPUT.PLACEHOLDERS.EMAIL')}
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={t('GLOBAL.COMPONENTS.TEXT_INPUT.PLACEHOLDERS.PASSWORD')}
          secureTextEntry
          style={styles.input}
        />
        {type === 'signup' ? (
          <>
            <TextInput
              value={rePassword}
              onChangeText={setRePassword}
              placeholder={t('GLOBAL.COMPONENTS.TEXT_INPUT.PLACEHOLDERS.RE_PASSWORD')}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
              <Text style={styles.buttonText}>{t('GLOBAL.COMPONENTS.BUTTON.TITLES.SIGN_UP')}</Text>
            </TouchableOpacity>
            <Text style={styles.infoText} onPress={() => navigation.navigate(t('PAGE_TITLES.LOGIN'))}>
              {t('GLOBAL.LABELS.GO_BACK')}
            </Text>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
              <Text style={styles.buttonText}>{t('GLOBAL.COMPONENTS.BUTTON.TITLES.LOGIN')}</Text>
            </TouchableOpacity>
            <Text style={styles.infoText} onPress={() => navigation.navigate(t('PAGE_TITLES.SIGN_UP'))}>
              {t('GLOBAL.LABELS.SIGN_UP_NOW')}
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default AuthForm;