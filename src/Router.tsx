// Import Redux
import { Provider } from 'react-redux';
import store from './store/store';

// Import React-Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Alert Notification Root
import { AlertNotificationRoot } from 'react-native-alert-notification';

// Import Routes
import { authStackRoutes } from './routes/routes';

// import { RootStackParamList } from './screens/screenTypes';
// import {TabParamList} from '../screens/screenTypes';

// Constant Variables
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AlertNotificationRoot theme="dark">
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {authStackRoutes.map((route) => (
              <Stack.Screen key={route.name} name={route.name} component={route.component} />
            ))}
          </Stack.Navigator>
        </AlertNotificationRoot>
      </NavigationContainer>
    </Provider>
  );
}

export default App;