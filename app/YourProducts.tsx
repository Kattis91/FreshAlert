import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
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
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useFocusEffect } from "expo-router";
import DropDownPickerComponent from "@/components/DropDownPicker";
import { styles } from "@/styles/styles";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

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
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { label: "Dairy", value: "dairy" },
    { label: "Non-Dairy", value: "non-dairy" },
    { label: "Plant-Based", value: "plant-based" },
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
      case "non-dairy":
        return (
          <Image
            source={require("../assets//images/dairy-free.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Non-Dairy Products"
          />
        );
      case "plant-based":
        return (
          <Image
            source={require("../assets//images/vegan.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Plant-Based Proteins"
          />
        );
      default:
        return (
          <Image
            source={require("../assets//images/confused.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Question Mark"
          />
        );
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
      return "orange";
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
    } finally {
      setIsLoading(false); // End loading state
    }
  }

  const checkInfo = async () => {
    const data = await AsyncStorage.getItem("info");
    setInfo(data ? JSON.parse(data) : false);
  };

  useEffect(() => {
    // Fetch both product data and info
    setIsLoading(true);
    const fetchData = async () => {
      await checkInfo();
      await getProducts();
    };
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getProducts(); // Load products when the screen is focused
      checkInfo();  
    }, [])
  );

  useEffect(() => {
    filterProducts();
  }, [filterType, categoryValue, searchText, productData]);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getProducts();
      setOpenCategory(false);
      setFilterType("ALL");
      setCategoryValue(null);
      setSearchText("");
      return () => setIsLoading(false); // Reset loading state on unfocus
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
      ? `within the ${categoryValue} category `
      : "";
    let searchMessage = searchText ? `matching "${searchText}" ` : "";

    let combinedMessage =
    categoryMessage && searchMessage
      ? `${categoryMessage}${searchMessage}`
      : categoryMessage || searchMessage;

    switch (filterType) {
      case "EXPIRING_SOON":
        return `You have currently no products ${combinedMessage}that expire within 3 days.`;
      case "EXPIRING_7_DAYS":
        return `You have currently no products ${combinedMessage}that expire within 4-7 days.`;
      case "EXPIRING_AFTER_7_DAYS":
        return `You have currently no products ${combinedMessage}that expire in more than 7 days.`;
      default:
        return `You have currently no products ${combinedMessage}.`;
    }
  };

  const buttonAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef(null);

  // Function to trigger button highlight animation
  const highlightButton = () => {
    console.log("Highlight button animation triggered");
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonAnim, {
          toValue: 1.2, // Use a larger scale for clear visibility
          duration: 400, // Increased duration for slower animation
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: 400, // Increased duration for slower animation
          useNativeDriver: true,
        }),
      ]),
      { iterations: 2 }
    ).start();
  };

  // Function to scroll to the end of the screen and highlight the button
  const scrollToButtonAndHighlight = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });

    setTimeout(() => {
      highlightButton();
    }, 500);
  }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  backgroundColor: "#FFF8EC" }}>
        <ActivityIndicator size="large" color="#10A78B" />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFF8EC" }}>
      <SafeAreaView style={{ flex: 1, margin: 10, backgroundColor: "transparent" }}>
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
            style={{ width: 45, height: 45, marginRight: 4 }}
          />
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#003366" }}>
            FreshAlert
          </Text>
        </View>
        
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (!info) {
                scrollToButtonAndHighlight();
              }
            }}
          >
            <View style={{...styles.Search, flex: searchText.length > 0 ? 2 : 1 }}>
              {Platform.OS === "ios" ? (
                <TabBarIcon name="search" size={17} style={{ marginRight: 10 }} />
              ) : (
                <TabBarIcon name="search" size={23} style={{ marginRight: 10 }} />
              )}
              <TextInput
                placeholder="Search by date or name"
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="black"
                editable={info ? true : false} // Still control editability
                maxLength={20}
              />
            </View>
          </TouchableWithoutFeedback>
        
          <View>
            {productData.length > 0 && searchText.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchText("")}
                style={{
                  flex: 1,
                  backgroundColor: "#900101",
                  borderRadius: 30,
                  padding: 10,
                  marginBottom: 20,
                  marginLeft: 10,
                  alignSelf: "center",
                  elevation: 3, //(Just for Android)
                  shadowColor: "#000", //(Just for iOS)
                  justifyContent: "center",
                }}
              >
              <Text
                style={{ fontSize: 14, textAlign: "center", color: "white" }}
              >
                Clear
              </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

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

        {!info ? (
          <TouchableWithoutFeedback
            onPress={() => {
              if (!info) {
                scrollToButtonAndHighlight();
              }
            }}
          >
            <View>
              <DropDownPickerComponent
                openCategory={openCategory}
                categoryValue={categoryValue}
                categories={categories}
                setCategoryValue={setCategoryValue}
                setOpenCategory={setOpenCategory}
                placeholder="Filter by category"
                disabled={!info ? true : false}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <DropDownPickerComponent
            openCategory={openCategory}
            categoryValue={categoryValue}
            categories={categories}
            setCategoryValue={setCategoryValue}
            setOpenCategory={setOpenCategory}
            placeholder="Filter by category"
            disabled={!info ? true : false}
          />
        )}

          {productData.length > 0 && categoryValue != "" && categoryValue != null && (
            <TouchableOpacity
              onPress={() => setCategoryValue(null)}
              style={{...styles.resetButton, marginTop: 10}}
            >
              <Text
                style={{ fontSize: 14, textAlign: "center", color: "white" }}
              >
                Reset category
              </Text>
            </TouchableOpacity>
          )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          {/* All */}
          <TouchableWithoutFeedback
            onPress={() => {
              if (!info) {
                scrollToButtonAndHighlight();
              }
            }}
          >
            <View>
              <TouchableHighlight
                style={
                  filterType == "ALL"
                    ? styles.filterTabActiveALL
                    : styles.filterTab
                }
                onPress={() => {
                  if (!info) {
                    scrollToButtonAndHighlight();
                  } else {
                    showAll();
                  }
                }}
                underlayColor={
                  filterType === "ALL"
                    ? styles.filterTabActiveALL.backgroundColor
                    : styles.filterTab.backgroundColor
                }
                disabled={!info ? true : false}
              >
                <View>
                  <Text
                    style={{
                      color: filterType === "ALL" ? "#ffffff" : "#000000",
                      fontWeight: filterType === "ALL" ? "bold" : "normal",
                    }}
                  >
                    {filterButton}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              if (!info) {
                scrollToButtonAndHighlight();
              }
            }}
          >
            <View>
              <TouchableHighlight
                style={
                  filterType == "EXPIRING_SOON"
                    ? styles.filterTabActiveRed
                    : styles.filterTab
                }
                onPress={() => {
                  if (!info) {
                    scrollToButtonAndHighlight();
                  } else {
                    showExpiringSoon();
                  }
                }}
                underlayColor={
                  filterType === "EXPIRING_SOON"
                    ? styles.filterTabActiveRed.backgroundColor
                    : styles.filterTab.backgroundColor
                }
                disabled={!info ? true : false}
              >
                <View>
                  <Text
                    style={{
                      color:
                        filterType === "EXPIRING_SOON" ? "#ffffff" : "#000000",
                      fontWeight:
                        filterType === "EXPIRING_SOON" ? "bold" : "normal",
                    }}
                  >
                    3 Days
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </TouchableWithoutFeedback>

          {/* 4-7 Days */}
          <TouchableWithoutFeedback
            onPress={() => {
              if (!info) {
                scrollToButtonAndHighlight();
              }
            }}
          >
            <View>
              <TouchableHighlight
                style={
                  filterType == "EXPIRING_7_DAYS"
                    ? styles.filterTabActiveOrange
                    : styles.filterTab
                }
                onPress={() => {
                  if (!info) {
                    scrollToButtonAndHighlight();
                  } else {
                    showExpiringIn7Days();
                  }
                }}
                underlayColor={
                  filterType === "EXPIRING_7_DAYS"
                    ? styles.filterTabActiveOrange.backgroundColor
                    : styles.filterTab.backgroundColor
                }
                disabled={!info ? true : false}
              >
                <View>
                  <Text
                    style={{
                      color:
                        filterType === "EXPIRING_7_DAYS"
                          ? "#ffffff"
                          : "#000000",
                      fontWeight:
                        filterType === "EXPIRING_7_DAYS" ? "bold" : "normal",
                    }}
                  >
                    4-7 Days
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </TouchableWithoutFeedback>

          {/* Safe */}

          <TouchableWithoutFeedback
            onPress={() => {
              if (!info) {
                scrollToButtonAndHighlight();
              }
            }}
          >
            <View>
              <TouchableHighlight
                style={
                  filterType == "EXPIRING_AFTER_7_DAYS"
                    ? styles.filterTabActiveGreen
                    : styles.filterTab
                }
                onPress={() => {
                  if (!info) {
                    scrollToButtonAndHighlight();
                  } else {
                    showExpiringAfter7Days();
                  }
                }}
                underlayColor={
                  filterType === "EXPIRING_AFTER_7_DAYS"
                    ? styles.filterTabActiveGreen.backgroundColor
                    : styles.filterTab.backgroundColor
                }
                disabled={!info ? true : false}
              >
                <View>
                  <Text
                    style={{
                      color:
                        filterType === "EXPIRING_AFTER_7_DAYS"
                          ? "#ffffff"
                          : "#000000",
                      fontWeight:
                        filterType === "EXPIRING_AFTER_7_DAYS"
                          ? "bold"
                          : "normal",
                    }}
                  >
                    {" "}
                    7+ Days
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </TouchableWithoutFeedback>
        </View>

          {productData.length === 0 ? (
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              {!info ? (
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 30,
                      marginBottom: 5,
                      color: "#003366",
                    }}
                  >
                    Welcome to FreshAlert!
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      marginBottom: 15,
                      color: "#003366",
                    }}
                  >
                    ~Keep It Fresh, Keep It Simple~
                  </Text>

                  <Image
                    source={require("../assets/images/fresh-2.png")}
                    style={{
                      width: 60,
                      height: 60,
                      alignSelf: "center",
                      marginBottom: 10,
                    }}
                  />

                  <Text
                    style={{ fontSize: 16, marginBottom: 15, color: "#003366", letterSpacing: 0.5 }}
                  >
                    FreshAlert helps you easily keep track of the expiration
                    dates of your refrigerated and frozen items.
                  </Text>
                  <Text
                    style={{ fontSize: 16, marginBottom: 15, color: "#003366", paddingTop: 10, letterSpacing: 0.5 }}
                  >
                    Keep your food fresh for longer and avoid unnecessary food
                    waste with our smart app.
                  </Text>
                  <Text
                    style={{ fontSize: 16, marginBottom: 15, color: "#003366", letterSpacing: 0.5 }}
                  >
                    Receive timely reminders and plan better meals{"\n"}- all to save both money and the environment.
                  </Text>
                  <Text
                    style={{ fontSize: 16, marginBottom: 15, color: "#003366", letterSpacing: 0.5 }}
                  >
                    Get started by adding your items, and we'll take care of the
                    rest! Let FreshAlert make your refrigerator management
                    easier and smarter.
                  </Text>

                  <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
                    <TouchableOpacity
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        backgroundColor: "#338F85",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                        borderRadius: 30,
                        marginBottom: 20,
                        marginTop: 10,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.25,
                        shadowRadius: 8,
                        height: 50,
                      }}
                      onPress={() => {
                        console.log("Navigating to Add Product screen");
                        navigation.navigate("add", { screen: "Add Product" });
                      }}
                    >
                      <Text style={styles.buttonText}>DIVE IN</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              ) : (
                <>
                  <Image
                    source={require("../assets//images/mini-fridge.png")}
                    style={{ width: 165, height: 165, alignSelf: "center" }}
                    accessibilityLabel="Man"
                  />
                  <Text
                    style={{
                      fontSize: 25,
                      color: "#003366",
                      textAlign: "center",
                    }}
                  >
                    Nothing here right now! Add products to keep track of
                    freshness and expiry.
                  </Text>
                </>
              )}
            </ScrollView>
          ) : filteredProductData.length === 0 ? (
            <ScrollView>
            <View style={{ marginTop: 30 }}>
              <Image
                source={require("../assets//images/man.png")}
                style={{ width: 165, height: 165, alignSelf: "center" }}
                accessibilityLabel="not-found"
              />
              <Text style={{ marginTop: 25, textAlign: "center" }}>
                <Text style={{ fontSize: 21, color: "#003366" }}>
                  {" "}
                  {getCategoryMessage()}
                </Text>
              </Text>
            </View>
          </ScrollView>
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
      </View>
    );
  }
}