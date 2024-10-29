import { Button, Text, TouchableOpacity, View } from "react-native";
import { styles } from '@/styles/styles';
import LinearGradient from "react-native-linear-gradient";

export default function GetStartedScreen({ navigation }) {
  
  return(
    <LinearGradient
    colors={['#e3f2fd', '#eddcd2', '#ede0d4', '#e0ddcf']}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 30 }}>

      <Text style={{ textAlign: "center", fontSize: 30, marginBottom: 15, color:"#534b52" }}>Welcome to FreshAlert!</Text>
      
      <Text style={{ fontSize: 16, marginBottom: 15 }}>
        Keep your food fresh for longer and avoid unnecessary food waste with our smart app.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 15 }}>
        FreshAlert helps you easily keep track of the expiration dates of your refrigerated and frozen goods.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 15 }}>
        Receive timely reminders and plan better meals - all to save both money and the environment.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 15 }}>
        Get started by adding your items, and we'll take care of the rest! Let FreshAlert make your refrigerator management easier and smarter.
      </Text>

      <TouchableOpacity 
  style={styles.button}
  onPress={() => {
    navigation.navigate("add", { screen: "Add Product" });
  }}
>
  <Text style={styles.buttonText}>ADD PRODUCT</Text> 
</TouchableOpacity>
    </View>
    </LinearGradient>
  );
}