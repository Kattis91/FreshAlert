import { Button, Text, View } from "react-native";

export default function StartScreen({ navigation } : any) {
  return(
    <View>
      <Text>FreshAlert</Text>
      <Text>Keep it Fresh, Keep it Safe</Text>

      <Button 
        title="GET STARTED"
        onPress={() => {
            navigation.navigate("Get Started");
        }} />
    </View>
  );
}