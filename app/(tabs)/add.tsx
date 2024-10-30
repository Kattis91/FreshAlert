import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, Button } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddProduct from '../AddProduct';
import Info from '../Info';

export default function AddScreen() {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Add Product" component={AddProduct}
        options={({ navigation }) => ({
          headerRight: () => (
            <Button
              title="Info"
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
           <Button
             title="< Back"
             onPress={() => navigation.goBack()}
           />
         ),
       })}
     />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
