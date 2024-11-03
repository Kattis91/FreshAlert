import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "@/styles/styles";

export default function Info({ navigation }) {

  const openExternalLink = async () => {
    const url = "https://www.flaticon.com/";
    const supported = await Linking.canOpenURL(url);
    Linking.openURL(url);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#f4f4f6",
      }}
    >
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 25 }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            color: "#10A78B",
            paddingVertical: 15,
          }}
        >
          FreshAlert
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          Keep your food fresh for longer and avoid unnecessary food waste with
          our smart app.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          FreshAlert helps you easily keep track of the expiration dates of your
          refrigerated and frozen goods.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15 }}>
          Receive timely reminders and plan better meals - all to save both
          money and the environment.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15 }}>
          Start by adding your items, and we’ll take care of the rest! Let
          FreshAlert make your refrigerator management easier and smarter.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          <Text style={{ fontWeight: "bold" }}>To check your products</Text> visit the main page where you can filter them
          by category or expiration date. Below the list of categories, there is
          a filter that sorts the products based on the number of days remaining
          until each product's expiration.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          You will see the product category represented by an icon, and the
          expiration date will be indicated by a colored light.{"\n"}
          {"\n"}
          🔴 - Product will expire in 3 days.{"\n"}
          {"\n"}
          🟡 - Product will expire in 7 days.{"\n"}
          {"\n"}
          🟢 - Product has a longer expiration period.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
        <Text style={{ fontWeight: "bold" }}>Search</Text> - You can find your data using the Search function by entering
          either the product name or expiration date.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
        <Text style={{ fontWeight: "bold" }}>Edit | Delete</Text> - The products added to the application can be modified
          or deleted by selecting the product you wish to change.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 20, textAlign: "justify" }}>
        <Text style={{ fontWeight: "bold" }}>Notifications</Text> will be sent when a product has 7 days left until
          expiration, and another notification will be issued when there are
          only 3 days remaining.
        </Text>

        <View style={{ height: 1, backgroundColor: "black", marginVertical: 10 }} />

        <Text style={{ fontSize: 14, marginBottom: 10, textAlign: "justify" }}>
          We, the creators of the app, are <Text style={{ fontWeight: "bold" }}>Ekaterina Durneva Svedmark, Arlinda
          Islami</Text> and <Text style={{ fontWeight: "bold" }}>Subhojit Saha.</Text> We are studying app development at Malmö
          Yrkeshögskola, and this app is our first project.
        </Text>

        <View style={{ height: 1, backgroundColor: "black", marginVertical: 10 }} />

        <Text style={{ fontSize: 16, marginBottom: 15, textAlign: "justify", fontWeight: "bold" }}>
          Credits:
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 15, textAlign: "justify" }}>
          All the icons are owned by
          <Text style={{ color: "#0A7763"}} onPress={() => {openExternalLink()}}> www.flaticon.com </Text>
          Find the authors of the icons below:
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          <Image
            source={require("../assets//images/dairy-products.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Dairy"
          />{" "}
          - Made by Pixelmeetup.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          <Image
            source={require("../assets//images/beef.png")}
            style={{ width: 20, height: 20, marginTop: -2 }}
            accessibilityLabel="Dairy"
          />{" "}
          - Made by DinosoftLabs.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          <Image
            source={require("../assets//images/seafood.png")}
            style={{ width: 20, height: 20, marginTop: -3 }}
            accessibilityLabel="Dairy"
          />{" "}
          - Made by Kanyanee Watanajitkasem.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          <Image
            source={require("../assets//images/fruits.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Dairy"
          />{" "}
          ,
          <Image
            source={require("../assets//images/herbs.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Dairy"
          />{" "}
          and
          <Image
            source={require("../assets//images/fridge.gif")}
            style={{ width: 20, height: 20, marginTop: -2 }}
            accessibilityLabel="Dairy"
          />
          - Made by Freepik.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          <Image
            source={require("../assets//images/vegetable.png")}
            style={{ width: 20, height: 20, marginTop: -2 }}
            accessibilityLabel="Dairy"
          />{" "}
          - Made by justicon.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          <Image
            source={require("../assets//images/condiment-ingredient.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Dairy"
          />{" "}
          - Made by SetitikPixelStudio.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          <Image
            source={require("../assets//images/beverages.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Dairy"
          />{" "}
          - Made by ultimatearm.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          <Image
            source={require("../assets//images/meal.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Dairy"
          />{" "}
          - Made by Flat Icons.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify" }}>
          <Image
            source={require("../assets//images/frozen-food.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Dairy"
          />{" "}
          - Made by amonrat rungreangfangsai.
        </Text>
      </View>
    </ScrollView>
  );
}
