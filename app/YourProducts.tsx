import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useState } from "react";
import { Text, TouchableHighlight, View, StyleSheet, Pressable, TextInput, FlatList, Button, SafeAreaView, Dimensions } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';



export default function YourProducts({ navigation }) {

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 3;
  const itemWidth = screenWidth / numColumns - 20;



  const getCircleColor = (expiryDate) => {
    const currentDate = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry - currentDate; // Diferenca në milisekonda
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Konverto në ditë

    // Kontrollo ditët mbetur
    if (dayDiff > 7) {
      return '#0A7763';
    } else if (dayDiff <= 7 && dayDiff > 3) {
      return 'yellow';
    } else if (dayDiff <= 3 && dayDiff >= 0) {
      return 'red';
    }
    return 'blue'; // Default nëse ndodhin ndonjë gabim
  };


  const [filterType, setFilterType] = useState("ALL");
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState<string | null>(null);
  const [category, setCategory] = useState([
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
  ]);

  const [searchText, setSearchText] = useState("");
  const showExpiringSoon = () => setFilterType("EXPIRING_SOON");
  const showExpiringIn7Days = () => setFilterType("EXPIRING_7_DAYS");
  const showExpiringAfter7Days = () => setFilterType("EXPIRING_AFTER_7_DAYS");

  type Product = {
    id: number;
    title: string;
    name: string;
    expiry: string;
    category: string | null;
  };
  const [productData, setProductData] = useState<Product[]>([]);
  async function getProducts() {
    try {
      const storedList = await AsyncStorage.getItem("my-list");
      const parsedList: Product[] = storedList ? JSON.parse(storedList) : [];
      console.log(parsedList);
      setProductData(parsedList);
    } catch (error) {
      console.error("Failed to load products", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);


  const filteredProducts = productData.filter(product => {
    const matchesName = product.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesExpiry = product.expiry.includes(searchText);
    const matchesCategory = categoryValue ? product.category === categoryValue : true; // Sigurohuni që filtrimi i kategorive të funksionojë
    return (matchesName || matchesExpiry) && matchesCategory;

  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', margin: 10 }}>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>🧊 DATE TRACKING</Text>
      </View>

      <TextInput
        style={{ width: '100%', padding: 8, borderRadius: 8, borderColor: '#6FCF97', borderWidth: 1, marginBottom: 20, textAlign: 'center' }}
        placeholder="Search by date or name"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={{ flexDirection: 'row', zIndex: 1000, marginBottom: 20 }}>

        <DropDownPicker
          style={styles.inputs}
          open={openCategory}
          value={categoryValue}
          items={category}
          setOpen={setOpenCategory}
          setValue={setCategoryValue}
          setItems={setCategory}
          dropDownContainerStyle={{
            backgroundColor: "#0A7763",
            width: "100%",
            maxHeight: 200,
          }}
          textStyle={{ color: "white" }}
          placeholderStyle={{ color: "#333333" }}
          labelStyle={{ color: "black" }}
          listItemContainerStyle={{
            borderBottomColor: "white",
            borderBottomWidth: 1,
          }}

          placeholder="Category"
          listMode='SCROLLVIEW'
          containerStyle={{ flex: 1 }}
        />


      </View>





      <View style={{ flexDirection: "row", justifyContent: 'center' }}>

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
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.viewCon, { width: itemWidth }]}>

              <View style={styles.viewtext}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ flex: 1, flexShrink: 1 }}>{item.title}</Text></View>

              <View style={styles.viewicon}><Text style={{ fontSize: 50 }}>🧊 </Text></View>

              <View style={[styles.viewtext, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                <Text >{item.expiry}</Text>
                <View style={{
                  width: 12, height: 12, borderRadius: 7.5, backgroundColor: getCircleColor(item.expiry) // Përdor funksionin për ngjyrën
                }} /></View>
            </View>
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
    borderRadius: 8,
    borderColor: '#6FCF97',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  filterTabActiveRed: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'red',
  },
  filterTabActiveYellow: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: 'yellow',
    borderWidth: 1,
    borderColor: 'yellow',
  },
  filterTabActiveGreen: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
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
});