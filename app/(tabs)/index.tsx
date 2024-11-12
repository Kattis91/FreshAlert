import { View, ActivityIndicator, Button, Platform } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../StartScreen";
import GetStartedScreen from "../GetStartedScreen";
import YourProducts from "../YourProducts";
import EditProduct from "../EditProduct";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Info from "../Info";
import { useFocusEffect } from "@react-navigation/native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Toast from "react-native-toast-message";
import PushNotification from "react-native-push-notification";

if(Platform.OS === "android") {
  PushNotification.createChannel(
    {
      channelId: "FreshAlert",
      channelName: "FreshAlert"
    },
    created => console.log(`channel created ${created}`)
  )
}

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    notification.finish(PushNotification.FetchResult?.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();

  const [hasProducts, setHasProducts] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkProducts = async () => {
    const products = await AsyncStorage.getItem("my-list");
    if (products && JSON.parse(products).length > 0) {
      setHasProducts(true);
    } else {
      setHasProducts(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await checkProducts();
      setLoading(false);
    };
    initialize();
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

  const renderInfoIcon = ({ navigation }: any) => (
    <TabBarIcon
      name='information-circle-outline'
      color="#fff"
      onPress={() => navigation.navigate('Info')}
    />
  );

  return (
    <>
      <Toast />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#338F85', // Change header background color
          },
          headerTintColor: '#fff', // Change header text color
        }}
      >
        <Stack.Screen
          name="Your Products"
          component={YourProducts}
          options={({ navigation }) => ({
            title: "Home",
            headerRight: () => renderInfoIcon({ navigation }),
          })}
        />
        <Stack.Screen
          name="Edit Product"
          component={EditProduct}
        />
        <Stack.Screen
          name="Info"
          component={Info}
          options={({ navigation }) => ({
            headerLeft: () =>
              Platform.OS === "ios" ? (
                <Button title="< Back" onPress={() => navigation.goBack()} 
                color="white"
                />
              ) : null,
          })}
        />
      </Stack.Navigator>
    </>
  );
}
