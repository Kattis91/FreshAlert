import { Button, Platform, Text, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";
import DropDownPickerComponent from "./DropDownPicker";
import { useRef } from "react";
import { styles } from "@/app/AddProduct";

type FormComponentProps = {
  productName: string;
  setProductName: (name: string) => void;
  expiryDate: string;
  setExpiryDate: (date: string) => void;
  date: Date;
  openDate: boolean;
  setOpenDate: (open: boolean) => void;
  setDate: (date: Date) => void;
  setDateChanged: (changed: boolean) => void;
  openCategory: boolean;
  categoryValue: string | null;
  categories: { label: string; value: string }[];
  setCategoryValue: (category: string | null) => void;
  setOpenCategory: (open: boolean) => void;
  addoredit: string;
  buttontext: string;
  buttonclick: () => void;
};

const FormComponent = ({
  productName,
  setProductName,
  expiryDate,
  setExpiryDate,
  date,
  openDate,
  setOpenDate,
  setDate,
  setDateChanged,
  openCategory,
  categoryValue,
  setCategoryValue,
  categories,
  setOpenCategory,
  addoredit,
  buttontext,
  buttonclick,
}: FormComponentProps) => {
    const inputRef = useRef<TextInput>(null);

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0]; // Returns in format YYYY-MM-DD
};

return (

  <View style={styles.container}>

    <Text style={{ textTransform: "uppercase", fontSize: 25, textAlign: "center", marginBottom: 25 }}>{ addoredit }</Text>

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
        setDateChanged(true);

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

    <DropDownPickerComponent
      openCategory={openCategory}
      categoryValue={categoryValue}
      categories={categories}
      setCategoryValue={setCategoryValue}
      setOpenCategory={setOpenCategory} 
      placeholder="Choose category"      
    />

    <View style={styles.button}>
      <Button
        title={ buttontext}
        color={Platform.OS === "ios" ? "white" : "#0A7763"}
        onPress={ buttonclick}
    />
      </View>

  </View>

  );
}

export default FormComponent;