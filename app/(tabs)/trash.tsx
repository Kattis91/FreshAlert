import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import Trash from "../ExpiredProducts";
import { useNavigation } from "expo-router";

export default function TrashScreen() {

  const Stack = createNativeStackNavigator();

  return (
     <Stack.Navigator>
      <Stack.Screen name="Expired Products" component={Trash} 
        options={({ navigation }) => ({
          headerRight: () => (
            <Button
              title="Info"
              onPress={() => navigation.navigate('Info', { fromScreen: 'Trash' })}
            />
          ),
        })}
      />     
    </Stack.Navigator>
  );
}