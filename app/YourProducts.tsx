import React from 'react';
import { useState } from "react";
import { Text, TouchableHighlight, View, StyleSheet, Pressable, TextInput } from "react-native"; 
import DropDownPicker from "react-native-dropdown-picker";
//import AddProduct from './AddProduct';

export default function YourProducts({ navigation }) {

    // Initial state to track selected filter
    const [filterType, setFilterType] = useState("ALL");

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Fridge', value: 'fridge' },
        { label: 'Freezer', value: 'freezer' }
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

      {/* View to organize DropDown and Button in a row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
        
        <DropDownPicker
          open={categoryOpen}
          value={categoryValue}
          items={items}
          setOpen={setCategoryOpen}
          setValue={setCategoryValue}
          setItems={setItems}
          style={{ backgroundColor: '#0A7763', borderColor: 'transparent' }}
          placeholder="Category"
          containerStyle={{ flex: 1 }} // Make dropdown fill half of the row
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