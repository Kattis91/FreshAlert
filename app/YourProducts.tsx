import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableHighlight,
  View,
  TextInput,
  FlatList,
  Button,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useFocusEffect } from "expo-router";
import DropDownPickerComponent from "@/components/DropDownPicker";
import { styles } from "@/styles/styles";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";

export default function YourProducts({ navigation }) {
  type Product = {
    id: number;
    title: string;
    name: string;
    expiry: string;
    category: string | null;
    daysDifference: number;
  };

  const screenWidth = Dimensions.get("window").width;
  const numColumns = 3;
  const itemWidth = screenWidth / numColumns - 20;

  const [filterType, setFilterType] = useState("ALL");
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState<string | null>(null);
  const [info, setInfo] = useState(false);

  const categories = [
    { label: "All Categories", value: "" },
    { label: "Dairy", value: "dairy" },
    { label: "Meat", value: "meat" },
    { label: "Seafood", value: "seafood" },
    { label: "Fruits", value: "fruits" },
    { label: "Vegetables", value: "vegetables" },
    { label: "Condiments", value: "condiments" },
    { label: "Beverages", value: "beverages" },
    { label: "Prepared Foods", value: "prepared foods" },
    { label: "Spreads", value: "spreads" },
    { label: "Fresh Herbs", value: "fresh herbs" },
    { label: "Frozen Foods", value: "frozen foods" },
    { label: "Other", value: "other" },
  ];

  // Products Icon
  const getCategoryEmoji = (category: string | null) => {
    switch (category) {
      case "dairy":
        return (
          <Image
            source={require("../assets//images/dairy-products.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Dairy"
          />
        );
      case "meat":
        return (
          <Image
            source={require("../assets//images/beef.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Meat"
          />
        );
      case "seafood":
        return (
          <Image
            source={require("../assets//images/seafood.png")}
            style={{ width: 65, height: 65 }}
            accessibilityLabel="Seafood"
          />
        );
      case "fruits":
        return (
          <Image
            source={require("../assets//images/fruits.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Fruits"
          />
        );
      case "vegetables":
        return (
          <Image
            source={require("../assets//images/vegetable.png")}
            style={{ width: 65, height: 65 }}
            accessibilityLabel="Vegetables"
          />
        );
      case "condiments":
        return (
          <Image
            source={require("../assets//images/condiment-ingredient.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Condiments"
          />
        );
      case "beverages":
        return (
          <Image
            source={require("../assets//images/beverages.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Beverages"
          />
        );
      case "prepared foods":
        return (
          <Image
            source={require("../assets//images/meal.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Prepared Foods"
          />
        );
      case "spreads":
        return (
          <Image
            source={require("../assets//images/toast.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Spreads"
          />
        );
      case "fresh herbs":
        return (
          <Image
            source={require("../assets//images/herbs.png")}
            style={{ width: 65, height: 65 }}
            accessibilityLabel="Fresh Herbs"
          />
        );
      case "frozen foods":
        return (
          <Image
            source={require("../assets//images/frozen-food.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Frozen Foods"
          />
        );
      default:
        return "❓";
    }
  };

  const [searchText, setSearchText] = useState("");

  const [productData, setProductData] = useState<Product[]>([]);
  const [filteredProductData, setFilteredProductData] = useState<Product[]>([]);

  const resetTime = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const checkInfo = async () => {
    const data = await AsyncStorage.getItem("info");
    if (JSON.parse(data)) {
      console.log(JSON.parse(data));
      setInfo(true);
    }
  };

  const calculateDaysDifference = (expiryDate: string) => {
    const currentDate = resetTime(new Date());
    const expiry = resetTime(new Date(expiryDate));
    const timeDifference = expiry.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  };

  const getCircleColor = (expiryDate: string) => {
    const dayDiff = calculateDaysDifference(expiryDate);

    if (dayDiff > 7) {
      return "#0A7763";
    } else if (dayDiff <= 7 && dayDiff > 3) {
      return "yellow";
    } else if (dayDiff <= 3 && dayDiff >= 0) {
      return "red";
    }
    return "blue"; // Default color for errors
  };

  async function showAll() {
    setFilterType("ALL");
  }
  async function showExpiringSoon() {
    setFilterType("EXPIRING_SOON");
  }
  async function showExpiringIn7Days() {
    setFilterType("EXPIRING_7_DAYS");
  }
  async function showExpiringAfter7Days() {
    setFilterType("EXPIRING_AFTER_7_DAYS");
  }

  async function getProducts() {
    try {
      const storedList = await AsyncStorage.getItem("my-list");
      let parsedList: Product[] = storedList ? JSON.parse(storedList) : [];

      const resetTime = (date: Date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
      };

      parsedList = parsedList.filter(
        (item) => resetTime(new Date(item.expiry)) >= resetTime(new Date())
      );

      const updatedProducts = parsedList.map((product) => {
        const daysDifference = calculateDaysDifference(product.expiry);
        return { ...product, daysDifference };
      });

      setProductData(updatedProducts);
      setFilteredProductData(updatedProducts);
    } catch (error) {
      console.error("Failed to load products", error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getProducts(); // Load products when the screen is focused
    }, [])
  );

  useEffect(() => {
    filterProducts();
    checkInfo();
  }, [filterType, categoryValue, searchText, productData]);

  useFocusEffect(
    React.useCallback(() => {
      // This function will be called when the screen is focused
      return () => {
        // This function will be called when the screen is unfocused
        setOpenCategory(false);
      };
    }, [])
  );

  function filterProducts() {
    console.log("Filtering products with type: ", filterType);

    let filteredProducts = productData;

    // Apply expiry date filter
    if (filterType === "EXPIRING_SOON") {
      filteredProducts = filteredProducts.filter(
        (item) => item.daysDifference >= 0 && item.daysDifference <= 3
      );
    } else if (filterType === "EXPIRING_7_DAYS") {
      filteredProducts = filteredProducts.filter(
        (item) => item.daysDifference > 3 && item.daysDifference <= 7
      );
    } else if (filterType === "EXPIRING_AFTER_7_DAYS") {
      filteredProducts = filteredProducts.filter(
        (item) => item.daysDifference > 7
      );
    }

    // Apply category filter
    if (categoryValue) {
      filteredProducts = filteredProducts.filter(
        (item) => item.category === categoryValue
      );
    }

    // Apply search filter
    filteredProducts = filteredProducts.filter((product) => {
      const matchesName = product.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesExpiry = product.expiry.includes(searchText);
      return matchesName || matchesExpiry;
    });

    setFilteredProductData(filteredProducts);
  }

  const filterButton = categoryValue ? `All ${categoryValue}` : "All products";

  const getCategoryMessage = () => {
    let categoryMessage = categoryValue
      ? `within the ${categoryValue} category`
      : "";
    switch (filterType) {
      case "EXPIRING_SOON":
        return `No products found ${categoryMessage} that expire within 3 days`;
      case "EXPIRING_7_DAYS":
        return `No products found ${categoryMessage} that expire within 4-7 days`;
      case "EXPIRING_AFTER_7_DAYS":
        return `No products found ${categoryMessage} that are safe to consume`;
      default:
        return `No products found ${categoryMessage}.`;
    }
  };

  return (
    <LinearGradient
      colors={["#CEECEB", "#F9CAA9", "#E4CFBE", "#C6D3BB"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, margin: 10 }}>
        <Toast />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <Image
            source={require("../assets/images/fridge.gif")}
            style={{ width: 45, height: 45, marginRight: 8 }}
          />
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>FreshAlert</Text>
        </View>

        <TextInput
          style={styles.TextInputS}
          placeholder="Search by date or name"
          value={searchText}
          onChangeText={setSearchText}
        />

        {openCategory && (
          <TouchableWithoutFeedback onPress={() => setOpenCategory(false)}>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1, // Make sure it is above other components but below dropdown
                backgroundColor: "transparent", // Keep it transparent
              }}
            />
          </TouchableWithoutFeedback>
        )}

        <DropDownPickerComponent
          openCategory={openCategory}
          categoryValue={categoryValue}
          categories={categories}
          setCategoryValue={setCategoryValue}
          setOpenCategory={setOpenCategory}
          placeholder="Filter by category"
        />

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableHighlight
            style={
              filterType == "ALL" ? styles.filterTabActiveALL : styles.filterTab
            }
            onPress={showAll}
          >
            <View>
              <Text
                style={{ color: filterType === "ALL" ? "#ffffff" : "#000000" }}
              >
                {filterButton}
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={
              filterType == "EXPIRING_SOON"
                ? styles.filterTabActiveRed
                : styles.filterTab
            }
            onPress={showExpiringSoon}
          >
            <View>
              <Text>3 Days</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={
              filterType == "EXPIRING_7_DAYS"
                ? styles.filterTabActiveYellow
                : styles.filterTab
            }
            onPress={showExpiringIn7Days}
          >
            <View>
              <Text>4-7 Days</Text>
            </View>
          </TouchableHighlight>

          {/* Safe */}
          <TouchableHighlight
            style={
              filterType == "EXPIRING_AFTER_7_DAYS"
                ? styles.filterTabActiveGreen
                : styles.filterTab
            }
            onPress={showExpiringAfter7Days}
          >
            <View>
              <Text> Safe</Text>
            </View>
          </TouchableHighlight>
        </View>

        {productData.length === 0 ? (
          <View>
            {!info ? (
              <View
                style={
                  {
                    // flex: 1,
                    // justifyContent: "center",
                    // paddingHorizontal: 30,
                  }
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    marginBottom: 15,
                    color: "#534b52",
                  }}
                >
                  Welcome to FreshAlert!
                </Text>

                <Text style={{ fontSize: 16, marginBottom: 15 }}>
                  Keep your food fresh for longer and avoid unnecessary food
                  waste with our smart app.
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 15 }}>
                  FreshAlert helps you easily keep track of the expiration dates
                  of your refrigerated and frozen goods.
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 15 }}>
                  Receive timely reminders and plan better meals - all to save
                  both money and the environment.
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 15 }}>
                  Get started by adding your items, and we'll take care of the
                  rest! Let FreshAlert make your refrigerator management easier
                  and smarter.
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
            ) : (
              <>
                <Text style={styles.emptyText}>- You Have No Products -</Text>
                <Image
                  source={require("../assets//images/man.png")}
                  style={{ width: 165, height: 165, alignSelf: "center" }}
                  accessibilityLabel="Seafood"
                />
              </>
            )}
          </View>
        ) : filteredProductData.length === 0 ? (
          <Text style={styles.emptyText}>
            <Text>- {getCategoryMessage()}</Text> -
          </Text>
        ) : (
          <FlatList
            key={numColumns}
            data={[...filteredProductData].reverse()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Edit Product", { product: item })
                }
                activeOpacity={0.7}
              >
                <View style={[styles.viewCon, { width: itemWidth }]}>
                  <View style={styles.viewIcon}>
                    {Platform.OS === "ios" ? (
                      <Text style={styles.categoryEmoji}>
                        {getCategoryEmoji(item.category)}
                      </Text>
                    ) : (
                      getCategoryEmoji(item.category)
                    )}
                  </View>

                  <Text
                    style={styles.titleText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>

                  <View style={styles.expiryContainer}>
                    <Text style={styles.expiryText}>{item.expiry}</Text>
                    <View
                      style={[
                        styles.circleIndicator,
                        { backgroundColor: getCircleColor(item.expiry) },
                      ]}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            numColumns={numColumns}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
