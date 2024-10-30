import { Image, StyleSheet, Platform, View, Text, ActivityIndicator, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../StartScreen';
import GetStartedScreen from '../GetStartedScreen';
import YourProducts from '../YourProducts';
import EditProduct from '../EditProduct';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Info from '../Info';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {

  const Stack = createNativeStackNavigator();

  const [hasProducts, setHasProducts] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkProducts = async () => {
    setLoading(true);
    const products = await AsyncStorage.getItem("my-list");
    if (products && JSON.parse(products).length > 0) {
      setHasProducts(true);
    } else {
      setHasProducts(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkProducts();
    }, [])
  );

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0A7763" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {hasProducts ? (
        <Stack.Screen name="Your Products" component={YourProducts}
          options={({ navigation }) => ({
            title: "Home",
            headerRight: () => (
              <Button
                title="Info"
                onPress={() => navigation.navigate('Info')}
              />
            ),
          })}
        />
      ) : (
        <Stack.Screen name="Home" component={StartScreen} />
      )}
      <Stack.Screen name="Get Started" component={GetStartedScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Button
              title="Info"
              onPress={() => navigation.navigate('Info')}
            />
          ),
        })}
      />
      <Stack.Screen name="Edit Product" component={EditProduct}
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
