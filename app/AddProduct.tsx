import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";
import DropDownPicker from "react-native-dropdown-picker";

export default function AddProduct({ navigation }) {

const [productName, setProductName] = useState("");
const [expiryDate, setExpiryDate] = useState("");
const [openCategory, setOpenCategory] = useState(false);
const [value, setValue] = useState(null);
const [category, setCategory] = useState([
  { label: "Fridge", value: "fridge" },
  { label: "Freezer", value: "freezer" }
]);

const [openDate, setOpenDate] = useState(false);

const [date, setDate] = useState(new Date());
const inputRef = useRef<TextInput>(null);

const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // Returns in format YYYY-MM-DD
};

return (
    
  <View style={styles.container}>

    <Text style={{ textTransform: "uppercase", fontSize: 25, textAlign: "center", marginBottom: 25 }}>Add Product:</Text>
    
    <Text style={styles.label}>Product Name:</Text>
    <TextInput
      style={styles.inputs}
      onChangeText={setProductName}
      value={productName}
      placeholder="Enter product name"
      placeholderTextColor="black"
    />

    <Text style={styles.label}>Expiry Date:</Text>
    <TextInput
      style={styles.inputs}
      ref={inputRef}
      onFocus={() => setOpenDate(true)}
      onChangeText={setExpiryDate}
      value={expiryDate}
      placeholder="Add expiry date"
      placeholderTextColor="black"
    />

    <DatePicker
      modal
      open={openDate}
      date={date}
      mode="date"
      onConfirm={(selectedDate) => {
        setOpenDate(false);
        setDate(selectedDate);
        setExpiryDate(formatDate(selectedDate));

        if (inputRef.current) {
          inputRef.current.blur();
        }
      }}
      onCancel={() => {
        setOpenDate(false);
        
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }}
    />

    <Text style={styles.label}>Category:</Text>
    <DropDownPicker
      style={styles.inputs}
      open={openCategory}
      value={value}
      items={category}
      setOpen={setOpenCategory}
      setValue={setValue}
      setItems={setCategory}
      placeholder="Choose category"
      dropDownContainerStyle={{
        backgroundColor: "#0A7763",
        width: "100%",        
      }}
      textStyle={{ color: "white" }}  
      placeholderStyle={{ color: "black" }}
      labelStyle={{ color: "black" }}
    />
    
    <View style={styles.button}>
      <Button 
        title="ADD"
        color="white"
      />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8edeb",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  label: {
    textTransform: "uppercase",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "flex-start",
    marginLeft: 5,
  },
  inputs: {
    borderColor: "#0A7763",
    borderWidth: 2,
    height: 38,
    borderRadius: 14,
    width: "100%",
    paddingLeft: 5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#0A7763",
    marginTop: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  }
})