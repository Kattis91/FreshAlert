import { Button, Text, View } from "react-native";

export default function StartScreen({ navigation } : any) {
    
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8edeb" }}>
      <Text style={{ fontSize: 50, color: "#003366" }}>FreshAlert</Text>
      <Text style={{ fontSize: 28, color: "#003366" }}>Keep it Fresh, Keep it Safe</Text>
  
      <View style={{ marginTop: 35, backgroundColor: "#0A7763" }}>
        <Button 
          title="GET STARTED" 
          color="white"
          onPress={() => {
            navigation.navigate("Get Started");
          }}
          />
      </View>
    </View>
    );
  }