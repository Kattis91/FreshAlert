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
       options={({ navigation }) => ({
         headerBackTitleVisible: false, // hides the header back title to avoid "(tabs)"
         headerStyle: {backgroundColor:'#10A78B'},
         headerTintColor:'white',
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
 )
}