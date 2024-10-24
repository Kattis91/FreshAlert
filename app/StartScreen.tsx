import { Button, Text, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function StartScreen({ navigation } : any) {
 
  return (
    <LinearGradient
      colors={['#b8dbd9', '#ddbea9', '#ffe8d6', '#a8ba9a']} // Katër ngjyra për gradientin
      style={{
        flex: 1, // Bëje që gradienti të mbulojë të gjithë hapësirën
        justifyContent: 'center', // Qëndroje qendror
        alignItems: 'center',
      }}
    >
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

      <TouchableOpacity
        style={{
          marginTop: 15,
          backgroundColor: "#0A7763",
          padding: 15,
          borderRadius: 25,
        }}
        onPress={() => navigation.navigate("Your Products")}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>VIEW YOUR PRODUCTS</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
