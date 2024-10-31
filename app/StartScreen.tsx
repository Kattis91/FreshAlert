import { Button, Text, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function StartScreen({ navigation } : any) {
 
  return (
    <LinearGradient
      colors={['#b8dbd9', '#ddbea9', '#ffe8d6', '#a8ba9a']} 
      style={{flex: 1, justifyContent: 'center', alignItems: 'center', }} >
        
      <Text style={{ fontSize: 50, color: "white" }}>FreshAlert</Text>
      <Text style={{ fontSize: 26, color: "#534b52" }}>Keep it Fresh, Keep it Safe</Text>

      <TouchableOpacity
        style={{
          marginTop: 35,
          backgroundColor: "#0A7763",
          padding: 15,
          borderRadius: 25,
        }}
        onPress={() => navigation.navigate("Get Started")}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>GET STARTED</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
