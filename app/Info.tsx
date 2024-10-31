import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from '@/styles/styles';


export default function Info({ navigation }) {

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 10, paddingVertical: 10, backgroundColor: "#eee2df" }}>
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 25 }}>
        <Text style={{ textAlign: "center", fontSize: 30, color: "#5a2a27", paddingVertical: 15 }}>
          FreshAlert
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
        You will see the product category represented by an icon, and the expiration date will be indicated by a colored light.{"\n"}{"\n"}
          🔴 - Product will expire in 3 days.{"\n"}{"\n"}
          🟡 - Product will expire in 7 days.{"\n"}{"\n"}
          🟢 - Product has a longer expiration period.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
        To check your products, visit the main page where you can filter them by category or expiration date. Below the list of categories, there is a filter that sorts the products based on the number of days remaining until each product's expiration.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
          Search - You can find your data using the Search function by entering either the product name or expiration date.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
          Edit - The products added to the application can be modified or deleted by selecting the product you wish to change.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 25, textAlign: 'justify' }}>
         Notifications will be sent when a product has 7 days left until expiration, and another notification will be issued when there are only 3 days remaining.
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 15, textAlign: 'justify' }}>
          We, the creators of the app, are Ekaterina Durneva Svedmark, Arlinda Islami, and Subhojit Saha. We are studying app development at Malmö Högskola, and this app is our first project.
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 15, textAlign: 'justify' }}>
          We hope you enjoy using FreshAlert!
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 15, textAlign: 'justify' }}>
          Credits:
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
        <Image source={require('../assets//images/dairy-products.png')} style={{ width: 20, height: 20 }} accessibilityLabel="Dairy"/> 
         - Icon made by Pixelmeetup from www.flaticon.com
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
        <Image source={require('../assets//images/beef.png')} style={{ width: 20, height: 20 }} accessibilityLabel="Dairy"/> 
         - Icon made by DinosoftLabs from www.flaticon.com
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
        <Image source={require('../assets//images/seafood.png')} style={{ width: 20, height: 20 }} accessibilityLabel="Dairy"/> 
         - Icon made by Kanyanee Watanajitkasem from www.flaticon.com
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
        <Image source={require('../assets//images/fruits.png')} style={{ width: 20, height: 20 }} accessibilityLabel="Dairy"/> and  
         <Image source={require('../assets//images/herbs.png')} style={{ width: 20, height: 20 }} accessibilityLabel="Dairy"/> 
         - Icons made by Freepik from www.flaticon.com
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
        <Image source={require('../assets//images/vegetable.png')} style={{ width: 20, height: 20 }} accessibilityLabel="Dairy"/> 
         - Icon made by justicon from www.flaticon.com
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
        <Image source={require('../assets//images/condiment-ingredient.png')} style={{ width: 20, height: 20 }} accessibilityLabel="Dairy"/> 
         - Icon made by SetitikPixelStudio from www.flaticon.com
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
        <Image source={require('../assets//images/beverages.png')} style={{ width: 20, height: 20 }} accessibilityLabel="Dairy"/> 
         - Icon made by ultimatearm from www.flaticon.com
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
        <Image source={require('../assets//images/meal.png')} style={{ width: 20, height: 20 }} accessibilityLabel="Dairy"/> 
         - Icon made by Flat Icons from www.flaticon.com
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: 'justify' }}>
        <Image source={require('../assets//images/frozen-food.png')} style={{ width: 20, height: 20 }} accessibilityLabel="Dairy"/> 
         - Icon made by amonrat rungreangfangsai from www.flaticon.com
        </Text>     

      </View>

    </ScrollView>

  );
}
