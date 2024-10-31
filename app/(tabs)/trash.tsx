import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Platform, Text, View } from "react-native";
import Trash from "../ExpiredProducts";
import Info from "../Info";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TrashScreen() {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
     <Stack.Screen name="Expired Products" component={Trash} 
       options={({ navigation }) => ({
         headerBackTitleVisible: false, // hides the header back title to avoid "(tabs)"
         headerRight: () => (
          <TabBarIcon
            name='information-circle-outline'
            color="#0A7763"
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
            />
          ) : null
        ),
      })}
    />
   </Stack.Navigator>
 )
}