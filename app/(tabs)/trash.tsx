import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import Trash from "../ExpiredProducts";

export default function TrashScreen() {

  const Stack = createNativeStackNavigator();

  return (
     <Stack.Navigator>
      <Stack.Screen name="Expired Products" component={Trash} />     
    </Stack.Navigator>
  );
}