import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Platform, Text, View } from "react-native";
import Trash from "../ExpiredProducts";
import Info from "../Info";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TrashScreen() {

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
     <Stack.Screen name="Expired Products" component={Trash} 
    />
   </Stack.Navigator>
 )
}