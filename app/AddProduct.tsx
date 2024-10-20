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
      onChangeText={setExpiryDate}
      value={expiryDate}
      placeholder="Add expiry date"
    />

    <Button title="Open" onPress={() => setOpenDate(true)} />

    <DatePicker
      modal
      open={openDate}
      date={date}
      mode="date"
      onConfirm={(date) => {
        setOpenDate(false)
        setDate(date)
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