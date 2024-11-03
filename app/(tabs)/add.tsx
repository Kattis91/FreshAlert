import { Platform, Button } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddProduct from '../AddProduct';
import Info from '../Info';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function AddScreen() {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#10A78B', // Change header background color
      },
      headerTintColor: '#fff', // Change header text color
    }}
  >
      <Stack.Screen name="Add Product" component={AddProduct}
        options={({ navigation }) => ({
          headerRight: () => (
            <TabBarIcon
              name='information-circle-outline'
              color="#fff"
              onPress={() => navigation.navigate('Info')}
            />
          ),
        })}
      />
      <Stack.Screen
       name="Info"
       component={Info}
       options={({ navigation }) => ({
        headerLeft: () => (
          Platform.OS === "ios" ? (
            <Button
              title="< Back"
              onPress={() => navigation.goBack()}
               color="white"
            />
          ) : null
        ),
      })}
    />
    </Stack.Navigator>
  );
}
