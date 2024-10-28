import DropDownPickerComponent from "@/components/DropDownPicker";
import FormComponent from "@/components/FormComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";


export default function AddProducts() {

  type Product = {
    id: number;
    title: string;
    name: string;
    expiry: string;
    category: string | null;
  };

  const [productName, setProductName] = useState("");

  const [openCategory, setOpenCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState<string | null>(null);

  const categories = [
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
    { label: "Other", value: "other" }
  ];

  const [date, setDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);

  useEffect(() => {
    if (!dateChanged) return; // Prevent running the effect on initial render

    const resetTime = (date: Date) => {
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    };

    const currentDate = resetTime(new Date());
    const selectedDateReset = resetTime(date);

    const timeDifference = selectedDateReset.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysDifference === 0) {
      Alert.alert("Note: The expiry date is today.");
    } else if (daysDifference > 0 && daysDifference <= 7) {
      Alert.alert(`The expiry date is within ${daysDifference} days.`);
    } else if (daysDifference < 0) {
      Alert.alert("The expiry date cannot be in the past.");
    }
  }, [date, dateChanged]); // This effect runs every time 'date' changes


  async function addProduct() {

    const trimmedName = productName.trim();

    if (trimmedName.length === 0) {
      Alert.alert("Product name cannot be empty");
      return;
    }

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      Alert.alert("Product name must be between 2 and 50 characters");
      return;
    }

    const nameRegex = /^[a-zA-Z0-9\s]+$/;

    if (!nameRegex.test(productName.trim())) {
      Alert.alert("Product name can only contain letters, numbers, and spaces");
      return;
    }

    if (!expiryDate) {
      Alert.alert("Please select an expiry date");
      return;
    }

    // Check if the expiry date is in the past
    const selectedDate = new Date(expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);    

    if (selectedDate < today) {
      Alert.alert("The expiry date cannot be in the past.");
      return;
    }

    if (!categoryValue) {
      Alert.alert("Please select a category");
      return;
    }

    if (productName && expiryDate && categoryValue) {

      const product: Product = {
        id: new Date().getTime(),
        title: productName,
        name: productName,
        expiry: expiryDate,
        category: categoryValue,
      };

      try {
        // Retrieve the current list of products from AsyncStorage
        const storedList = await AsyncStorage.getItem("my-list");
        const currentList = storedList ? JSON.parse(storedList) : [];

        // Append the new product to the existing list
        const newList = [...currentList, product];

        // Save the updated list back to AsyncStorage
        await AsyncStorage.setItem("my-list", JSON.stringify(newList));

        Alert.alert("Product added:", `Product: ${productName} \n Expiry date: ${expiryDate}`);

        setProductName("");
        setExpiryDate("");
        setCategoryValue(null);

      } catch (error) {
        console.error("Failed to add product", error);
        Alert.alert("Failed to add product");
      }
    } else {
      Alert.alert("Please ensure that all fields are filled out");
    }
  }

  return (

    <FormComponent
      productName={productName}
      setProductName={setProductName}
      expiryDate={expiryDate}
      setExpiryDate={setExpiryDate}
      date={date}
      openDate={openDate}
      setOpenDate={setOpenDate}
      setDate={setDate}
      setDateChanged={setDateChanged}
      openCategory={openCategory}
      categoryValue={categoryValue}
      setCategoryValue={setCategoryValue}
      categories={categories}
      setOpenCategory={setOpenCategory}
      addoredit="Add Product"
      buttontext="ADD"
      buttonclick={addProduct}
    />

  );
}

export const styles = StyleSheet.create({
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
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "#0A7763",
    marginTop: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});