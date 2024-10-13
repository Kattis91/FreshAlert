import { Button, Text, View } from "react-native";

export default function GetStartedScreen({ navigation }) {
  
  return(
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 30, backgroundColor: "#f8edeb" }}>

      <Text style={{ textAlign: "center", fontSize: 45, marginBottom: 35 }}>Welcome to FreshAlert!</Text>
      
      <Text style={{ fontSize: 20, marginBottom: 15 }}>
        Keep your food fresh for longer and avoid unnecessary food waste with our smart app.
      </Text>
      <Text style={{ fontSize: 20, marginBottom: 15 }}>
        FreshAlert helps you easily keep track of the expiration dates of your refrigerated and frozen goods.
      </Text>
      <Text style={{ fontSize: 20, marginBottom: 15 }}>
        Receive timely reminders and plan better meals - all to save both money and the environment.
      </Text>
      <Text style={{ fontSize: 20, marginBottom: 15 }}>
        Get started by adding your items, and we'll take care of the rest! Let FreshAlert make your refrigerator management easier and smarter.
      </Text>

      <View style={{ marginTop: 15, backgroundColor: "#0A7763" }}>
        <Button 
          title="ADD PRODUCT" 
          color="white"
          onPress={() => {
            navigation.navigate("add", { screen: "Add Product" });
          }}
        />
      </View>
    </View>
  );
}