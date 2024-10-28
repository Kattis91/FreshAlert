import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { Text, TouchableHighlight, View, StyleSheet, TextInput, FlatList, Button, SafeAreaView, Dimensions, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import AddProducts from './AddProduct';
import { useFocusEffect } from 'expo-router';
import DropDownPickerComponent from '@/components/DropDownPicker';

export default function YourProducts({ navigation }) {

  type Product = {
    id: number;
    title: string;
    name: string;
    expiry: string;
    category: string | null;
    daysDifference: number;
  };

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 3;
  const itemWidth = screenWidth / numColumns - 20;

  const [filterType, setFilterType] = useState("ALL");
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState<string | null>(null);

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
    { label: "Frozen Foods", value: "frozen foods" }
  ];

  // Products Icon
const getCategoryEmoji = (category: string | null) => {
  switch (category) {
    case "dairy":
      return "🧀"; 
    case "meat":
      return "🥩"; 
    case "seafood":
      return "🐟"; 
    case "fruits":
      return "🍎"; 
    case "vegetables":
      return "🥦";
    case "condiments":
      return "🧂";
    case "beverages":
      return "🥤"; 
    case "prepared foods":
      return "🍽️"; 
    case "spreads":
      return "🍯"; 
    case "fresh herbs":
      return "🌿";
    case "frozen foods":
      return "🧊"; 
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

  const calculateDaysDifference = (expiryDate: string) => {
    const currentDate = resetTime(new Date());
    const expiry = resetTime(new Date(expiryDate));
    const timeDifference = expiry.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  };

  const getCircleColor = (expiryDate: string) => {
    const dayDiff = calculateDaysDifference(expiryDate);

    if (dayDiff > 7) {
      return '#0A7763';
    } else if (dayDiff <= 7 && dayDiff > 3) {
      return 'yellow';
    } else if (dayDiff <= 3 && dayDiff >= 0) {
      return 'red';
    }
    return 'blue'; // Default color for errors
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
      const parsedList: Product[] = storedList ? JSON.parse(storedList) : [];

      const updatedProducts = parsedList.map(product => {
        const daysDifference = calculateDaysDifference(product.expiry);
        return { ...product, daysDifference };
      });

      setProductData(updatedProducts);
      setFilteredProductData(updatedProducts);

    } catch (error) {
      console.error("Failed to load products", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getProducts(); // Load products when the screen is focused
    }, []) 
  );

  useEffect(() => {
    filterProducts();
  }, [filterType, categoryValue, searchText, productData]);


  function filterProducts() {
    console.log("Filtering products with type: ", filterType);

    let filteredProducts = productData;

    // Apply expiry date filter
    if (filterType === "EXPIRING_SOON") {
      filteredProducts = filteredProducts.filter(item => item.daysDifference >= 0 && item.daysDifference <= 3);
    } else if (filterType === "EXPIRING_7_DAYS") {
      filteredProducts = filteredProducts.filter(item => item.daysDifference > 3 && item.daysDifference <= 7);
    } else if (filterType === "EXPIRING_AFTER_7_DAYS") {
      filteredProducts = filteredProducts.filter(item => item.daysDifference > 7);
    }

    // Apply category filter
    if (categoryValue) {
      filteredProducts = filteredProducts.filter(item => item.category === categoryValue);
    }

    // Apply search filter
    filteredProducts = filteredProducts.filter(product => {
      const matchesName = product.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesExpiry = product.expiry.includes(searchText);
      return matchesName || matchesExpiry;
    });

    setFilteredProductData(filteredProducts);
  }

  const filterButton = categoryValue ? `All ${categoryValue}` : "All products";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', margin: 10 }}>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>🧊 DATE TRACKING</Text>
      </View>

      <TextInput
        style={styles.TextInputS}
        placeholder="Search by date or name"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={{ flexDirection: 'row', zIndex: 1000, marginBottom: 20 }}>

      <DropDownPickerComponent
        openCategory={openCategory}
        categoryValue={categoryValue}
        categories={categories}
        setCategoryValue={setCategoryValue}
        setOpenCategory={setOpenCategory}       
      />
      
      </View>

      <View style={{ flexDirection: "row", justifyContent: 'center' }}>

        <TouchableHighlight
          style={filterType == "ALL" ? styles.filterTabActiveALL : styles.filterTab}
          onPress={showAll}
        >
          <View>
            <Text>{ filterButton }</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={filterType == "EXPIRING_SOON" ? styles.filterTabActiveRed : styles.filterTab}
          onPress={showExpiringSoon}
        >
          <View>
            <Text>3 Days</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={filterType == "EXPIRING_7_DAYS" ? styles.filterTabActiveYellow : styles.filterTab}
          onPress={showExpiringIn7Days}
        >
          <View>
            <Text>7 Days</Text>
          </View>
        </TouchableHighlight>

        {/* Safe */}
        <TouchableHighlight
          style={filterType == "EXPIRING_AFTER_7_DAYS" ? styles.filterTabActiveGreen : styles.filterTab}
          onPress={showExpiringAfter7Days}
        >
          <View>
            <Text> Safe</Text>
          </View>
        </TouchableHighlight>

      </View>



      {productData.length === 0 ? (
        <Text>No products</Text>
      ) : (
        <FlatList
          key={numColumns}
          data={filteredProductData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Edit Product', { product: item })}>
              <View style={[styles.viewCon, { width: itemWidth }]}>

                <View style={styles.viewtext}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{ flex: 1, flexShrink: 1 }}>{item.title}</Text></View>

                <View style={styles.viewicon}><Text style={{ fontSize: 50 }}>{getCategoryEmoji(item.category)}</Text></View>

                <View style={[styles.viewtext, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                  <Text >{item.expiry}</Text>
                  <View style={{
                    width: 12, height: 12, borderRadius: 7.5, backgroundColor: getCircleColor(item.expiry) // Përdor funksionin për ngjyrën
                  }} /></View>
              </View>
            </TouchableOpacity>
          )}
          numColumns={numColumns} // Cakto numrin e kolonave
        />
      )}

      <Button title="Delete all products" onPress={async () => {
        await AsyncStorage.removeItem("my-list");
        getProducts();
      }
      }
      />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterTab: {
    padding: 7,
    margin: 5,
    borderRadius: 25,
    borderColor: '#6FCF97',
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
  },
  filterTabActiveALL: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#a2c3a4',
    borderWidth: 1,
    borderColor: '#a2c3a4',
  },
  filterTabActiveRed: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'red',
  },
  filterTabActiveYellow: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'yellow',
    borderWidth: 1,
    borderColor: 'yellow',
  },
  filterTabActiveGreen: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: 'green',
  },
  inputs: {
    borderColor: "#A5D6A7",
    borderWidth: 1,
    height: 30,
    borderRadius: 14,
    width: "100%",
    paddingLeft: 5,
    backgroundColor: "#E9F7EF",
  },
  viewCon: {
    height: 120,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderColor: "#0A7763",
    borderWidth: 0.5,
    margin: 7
  },
  viewtext: {
    flexDirection: 'row',
    height: 24,
    backgroundColor: '#eff6e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  viewicon: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInputS: { width: '100%',
    padding: 8,
    borderRadius: 25,
    borderColor: '#6FCF97',
    borderWidth: 1,
    marginBottom: 20,
    textAlign: 'center', 
    opacity: 0.7, }
});
