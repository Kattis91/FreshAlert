import React from 'react';
import { useState } from "react";
import { Text, TouchableHighlight, View, StyleSheet, Pressable, TextInput } from "react-native"; 
import DropDownPicker from 'react-native-dropdown-picker';


export default function YourProducts({ navigation }) {

    // Initial state to track selected filter
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
    const [searchText, setSearchText] = useState("");  // Për inputin e kërkimit

    // Functions to handle filter changes
    const showExpiringSoon = () => setFilterType("EXPIRING_SOON");
    const showExpiringIn7Days = () => setFilterType("EXPIRING_7_DAYS");
    const showExpiringAfter7Days = () => setFilterType("EXPIRING_AFTER_7_DAYS");
  
  return(
    <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>

      <View style={{alignItems:'center'}}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20 }}>🧊 DATE TRACKING</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
        
        <DropDownPicker
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
        placeholderStyle={{ color: "black" }}
        labelStyle={{ color: "black" }}
        listItemContainerStyle={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
        }}

          placeholder="Choose category"
          listMode='SCROLLVIEW'
          containerStyle={{ flex: 1 }}
        />
        
        <Pressable style={{ backgroundColor: '#0A7763', padding: 8, borderRadius: 8, justifyContent: 'center', alignItems: 'center', flex: 0.8, marginLeft: 10 }}
        onPress={() => navigation.navigate('AddProduct')}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add Product</Text>
        </Pressable>
      </View>

      <TextInput
        style={{ width: '100%', padding: 8, borderRadius: 8, borderColor: '#6FCF97', borderWidth: 1, marginBottom: 20, textAlign: 'center' }}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={{ flexDirection: "row", justifyContent: 'center' }}>
        
        {/* Expiring in less than 3 days */}
        <TouchableHighlight
          style={filterType == "EXPIRING_SOON" ? styles.filterTabActiveRed : styles.filterTab}
          onPress={showExpiringSoon}
        >
          <View>
            <Text>3 Days</Text>
          </View>
        </TouchableHighlight>

        {/* Expiring in less than 7 days */}
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
    </View>
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
});