import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../StartScreen';
import GetStartedScreen from '../GetStartedScreen';
import YourProducts from '../YourProducts';

export default function HomeScreen() {

  const Stack = createNativeStackNavigator();

  return (
     <Stack.Navigator>
      <Stack.Screen name="Home" component={StartScreen} />    
      <Stack.Screen name="Get Started" component={GetStartedScreen} />    
      <Stack.Screen name="Your Products" component={YourProducts} />    
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
