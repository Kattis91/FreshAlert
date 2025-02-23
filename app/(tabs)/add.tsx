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
        backgroundColor: '#338F85', // Change header background color
      },
      headerTintColor: '#fff', // Change header text color
    }}
  >
      <Stack.Screen name="Add Product" component={AddProduct} />  
    </Stack.Navigator>
  );
}
