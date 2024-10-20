import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
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

const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // Returns in format YYYY-MM-DD
};

return (

  <View>
    
    <Text>Product Name:</Text>
    <TextInput
      onChangeText={setProductName}
      value={productName}
      placeholder="Enter product name"
    />

    <Text>Expiry Date:</Text>
    <TextInput
      onFocus={() => setOpenDate(true)}
      onChangeText={setExpiryDate}
      value={expiryDate}
      placeholder="Add expiry date"
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
      }}
      onCancel={() => {
        setOpenDate(false)
      }}
    />

    <Text>Category:</Text>
    <DropDownPicker
      open={openCategory}
      value={value}
      items={category}
      setOpen={setOpenCategory}
      setValue={setValue}
      setItems={setCategory}
      placeholder="Choose category"
    />
    <Button title="ADD" />
  </View>
  );
}