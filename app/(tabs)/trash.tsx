import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import Trash from "../ExpiredProducts";
import { useNavigation } from "expo-router";
import Info from "../Info";

export default function TrashScreen() {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
     <Stack.Screen name="Expired Products" component={Trash} 
       options={({ navigation }) => ({
         headerBackTitleVisible: false, // hides the header back title to avoid "(tabs)"
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
 )
}