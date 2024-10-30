import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from '@/styles/styles';


export default function Info({ navigation }) {
  return (
    
   

<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 10, paddingVertical: 10, backgroundColor:"#eff7f6" }}>
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 25 }}>
        <Text style={{ textAlign: "center", fontSize: 30, color: "#534b52", paddingVertical: 15 }}>
          INFORMATION
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
  Keep your food fresh for longer and avoid unnecessary food waste with our smart app.
</Text>

<Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
  FreshAlert helps you easily keep track of the expiration dates of your refrigerated and frozen goods.
</Text>

<Text style={{ fontSize: 14, marginBottom: 15 }}>
  Receive timely reminders and plan better meals - all to save both money and the environment.
</Text>

<Text style={{ fontSize: 14, marginBottom: 15 }}>
  Start by adding your items, and we’ll take care of the rest! Let FreshAlert make your refrigerator management easier and smarter.
</Text>

<Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
  The data you add will be displayed at the top of the product list, prioritizing items that are about to expire soon.
</Text>

<Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
  You will see the product category with an icon, and the expiration date will be displayed with a colored light.{"\n"}{"\n"}
  🔴 - Product will expire in 3 days.{"\n"}{"\n"}
  🟡 - Product will expire in 7 days.{"\n"}{"\n"}
  🟢 - Product has a longer expiration period.
</Text>

<Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
  Check - When you want to check your products, they can be found on the main page and filtered by category or expiration date. Below the category list, there is a filter that sorts the data based on how many days are left until the product's expiration.
</Text>

<Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
  Search - You can search for your data through the Search function by entering the product name or expiration date.
</Text>

<Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
  Edit - The products you add to the application can be modified or deleted by clicking on the product you want to change.
</Text>

<Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
  Notifications - you will be informed when a product has 7 days left until expiration, and you will receive another notification when there are only 3 days left.
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

      </ScrollView>
 
  );
}
