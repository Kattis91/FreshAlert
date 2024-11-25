import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "@/styles/styles";

export default function Info() {

  const navigation = useNavigation();

  const [isFocused, setIsFocused] = React.useState(true);

  const openExternalLink = async () => {
    const url = "https://www.flaticon.com/";
    const supported = await Linking.canOpenURL(url);
    Linking.openURL(url);
  };

  useFocusEffect(
    useCallback(() => {
      // This function will be called when the screen is focused
      setIsFocused(true);
      return () => {
        // This function will be called when the screen is unfocused
        setIsFocused(false);
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      };
    }, [navigation])
  );

  if (!isFocused) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#FFF8EC",
      }}
    >
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 25 }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            color: "#338F85",
            paddingVertical: 15,
          }}
        >
          FreshAlert
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, color: "#003366" }}>
          Keep your food fresh for longer and avoid unnecessary food waste with
          our smart app.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, color: "#003366" }}>
          FreshAlert helps you easily keep track of the expiration dates of your
          refrigerated and frozen goods.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, color: "#003366" }}>
          Receive timely reminders and plan better meals - all to save both
          money and the environment.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, color: "#003366" }}>
          Start by adding your items, and we’ll take care of the rest! Let
          FreshAlert make your refrigerator management easier and smarter.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, color: "#003366" }}>
          <Text style={{ fontWeight: "bold" }}>To check your products</Text>{" "}
          visit the main page where you can filter them by category or
          expiration date. Below the list of categories, there is a filter that
          sorts the products based on the number of days remaining until each
          product's expiration.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, color: "#003366" }}>
          You will see the product category represented by an icon, and the
          expiration date will be indicated by a colored light.{"\n"}
          {"\n"}
          🔴 - Product will expire in 3 days.{"\n"}
          {"\n"}
          🟡 - Product will expire in 7 days.{"\n"}
          {"\n"}
          🟢 - Product has a longer expiration period.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, color: "#003366" }}>
          <Text style={{ fontWeight: "bold" }}>Search</Text> - You can find your
          data using the Search function by entering either the product name or
          expiration date.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, color: "#003366" }}>
          <Text style={{ fontWeight: "bold" }}>Edit | Delete</Text> - The
          products added to the application can be modified or deleted by
          selecting the product you wish to change.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 20, color: "#003366" }}>
          <Text style={{ fontWeight: "bold" }}>Notifications</Text> will be sent
          when a product has 7 days and 3 days remaining until expiration, with
          a final reminder 1 day before it expires.
        </Text>

        <View
          style={{ height: 1, backgroundColor: "#003366", marginVertical: 10 }}
        />

        <Text style={{ fontSize: 14, color: "#003366", marginBottom: 10 }}>
          We, the creators of the app, are{" "}
          <Text style={{ fontWeight: "bold" }}>
            Ekaterina Durneva Svedmark, Arlinda Islami
          </Text>{" "}
          and <Text style={{ fontWeight: "bold" }}>Subhojit Saha.</Text> We are
          studying app development at Malmö Yrkeshögskola, and this app is our
          first project.
        </Text>

        <View
          style={{ height: 1, backgroundColor: "#003366" }}
        />

        <Text
          style={{
            fontSize: 16,
            marginBottom: 15,
            marginTop: 15,
            textAlign: "justify",
            fontWeight: "bold",
            color: "#003366",
          }}
        >
          Credits:
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 15, color: "#003366" }}>
          All the icons are owned by
          <Text
            style={{ color: "#338F85" }}
            onPress={() => {
              openExternalLink();
            }}
          > 
            {" "}
            www.flaticon.com.{" "}
          </Text>
          {"\n"}
          Find the authors of the icons below:
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify", color: "#003366" }}>
          <Image
            source={require("../assets//images/fresh-2.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Fresh"
          />
          {" "}
          {" "}
          <Image
            source={require("../assets//images/fresh-3.png")}
            style={{ width: 20, height: 20, marginTop: -3 }}
            accessibilityLabel="Fresh"
          />
          {" "}
          {" "}
          <Image
            source={require("../assets//images/fruits.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Fruits"
          />
          {" "}
          <Image
            source={require("../assets//images/herbs.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Herbs"
          />
          {" "}
          <Image
            source={require("../assets//images/fridge.gif")}
            style={{ width: 20, height: 20, marginTop: -2 }}
            accessibilityLabel="Fridge"
          />
          {" "}
          <Image
            source={require("../assets//images/confused.png")}
            style={{ width: 20, height: 20, marginTop: -2 }}
            accessibilityLabel="Question Mark"
          />
          {" "}
          <Image
            source={require("../assets//images/dairy-free.png")}
            style={{ width: 20, height: 20, marginTop: -2 }}
            accessibilityLabel="Dairy Free"
          />{" "}
          {" "}
          <Image
            source={require("../assets//images/vegan.png")}
            style={{ width: 20, height: 20, marginTop: -2 }}
            accessibilityLabel="Vegan"
          />{" "}
          {" "}
          <Image
            source={require("../assets//images/toast.png")}
            style={{ width: 20, height: 20, marginTop: -2 }}
            accessibilityLabel="Vegan"
          />{" "}
          - Made by Freepik.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify", color: "#003366" }}>
          <Image
            source={require("../assets//images/mini-fridge.png")}
            style={{ width: 20, height: 20, marginTop: -3 }}
            accessibilityLabel="Mini-fridge"
          />{" "}
          - Made by vectorsmarket15.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify", color: "#003366" }}>
          <Image
            source={require("../assets//images/dairy-products.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Dairy"
          />{" "}
          - Made by Pixelmeetup.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify", color: "#003366" }}>
          <Image
            source={require("../assets//images/beef.png")}
            style={{ width: 20, height: 20, marginTop: -2 }}
            accessibilityLabel="Beef"
          />{" "}
          - Made by DinosoftLabs.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify", color: "#003366" }}>
          <Image
            source={require("../assets//images/seafood.png")}
            style={{ width: 20, height: 20, marginTop: -3 }}
            accessibilityLabel="Seafood"
          />{" "}
          - Made by Kanyanee Watanajitkasem.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify", color: "#003366" }}>
          <Image
            source={require("../assets//images/vegetable.png")}
            style={{ width: 20, height: 20, marginTop: -2 }}
            accessibilityLabel="Vegetable"
          />{" "}
          - Made by justicon.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify", color: "#003366" }}>
          <Image
            source={require("../assets//images/condiment-ingredient.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Condiment"
          />{" "}
          - Made by SetitikPixelStudio.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify", color: "#003366" }}>
          <Image
            source={require("../assets//images/beverages.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Beverages"
          />{" "}
          - Made by ultimatearm.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify", color: "#003366" }}>
          <Image
            source={require("../assets//images/meal.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Meal"
          />{" "}
          - Made by Flat Icons.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify", color: "#003366" }}>
          <Image
            source={require("../assets//images/frozen-food.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Frozen foods"
          />{" "}
          - Made by amonrat rungreangfangsai.
        </Text>

        <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "justify", color: "#003366" }}>
          <Image
            source={require("../assets//images/man.png")}
            style={{ width: 20, height: 20 }}
            accessibilityLabel="Empty"
          />{" "}
          - Made by Leremy.
        </Text>
      </View>
    </ScrollView>
  );
}
