import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";
import DropDownPicker from "react-native-dropdown-picker";

type Product = {
  id: number;
  title: string;
  name: string;
  expiry: string;
  category: string | null;
};

interface EditProductProps {
  route: {
    params: {
      product: Product;
    };
  };
}

const defaultProduct: Product = {
  id: 0,
  title: '',
  name: '',
  expiry: '',
  category: null,
};

export default function EditProduct({ route }: EditProductProps) {
  const { product } = route.params || { product: defaultProduct };

  const [productName, setProductName] = useState(product.name);
  const [expiryDate, setExpiryDate] = useState(product.expiry);
  const [categoryValue, setCategoryValue] = useState(product.category);
  const [date, setDate] = useState(new Date(product.expiry || Date.now()));
  const [openCategory, setOpenCategory] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);

  const inputRef = useRef<TextInput>(null);

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
    { label: "Frozen Foods", value: "frozen foods" }
  ];

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]; // Returns in format YYYY-MM-DD
  };

  useEffect(() => {
    console.log('Product prop:', product);
    if (product) {
      setProductName(product.name);
      setCategoryValue(product.category);
      setExpiryDate(product.expiry);
      setDate(new Date(product.expiry || Date.now()));
    }
  }, [product]);

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
  }, [date, dateChanged]);

  async function Edit() {
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

    if (!nameRegex.test(trimmedName)) {
      Alert.alert("Product name can only contain letters, numbers, and spaces");
      return;
    }

    if (!expiryDate) {
      Alert.alert("Please select an expiry date");
      return;
    }

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
      const updatedProduct: Product = {
        ...product,
        title: productName,
        name: productName,
        expiry: expiryDate,
        category: categoryValue,
      };

      try {
        const storedList = await AsyncStorage.getItem("my-list");
        const currentList = storedList ? JSON.parse(storedList) : [];
        const productIndex = currentList.findIndex((p: Product) => p.id === product.id);

        if (productIndex !== -1) {
          currentList[productIndex] = updatedProduct;
          await AsyncStorage.setItem("my-list", JSON.stringify(currentList));

          Alert.alert("Product updated:", `Product: ${productName} \n Expiry date: ${expiryDate}`);

        } else {
          Alert.alert("Product not found in the list");
        }
      } catch (error) {
        console.error("Failed to update product", error);
        Alert.alert("Failed to update product");
      }
    } else {
      Alert.alert("Please ensure that all fields are filled out");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ textTransform: "uppercase", fontSize: 25, textAlign: "center", marginBottom: 25 }}>Edit Product:</Text>

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
          inputRef.current?.blur();
        }}
        onCancel={() => {
          setOpenDate(false);
          inputRef.current?.blur();
        }}
      />

      <Text style={styles.label}>Category:</Text>
      <DropDownPicker
        style={styles.inputs}
        open={openCategory}
        value={categoryValue}
        items={categories}
        setOpen={setOpenCategory}
        setValue={setCategoryValue}
        placeholder="Choose category"
        listMode="SCROLLVIEW"
        dropDownContainerStyle={{
          backgroundColor: "#0A7763",
          width: "100%",
          maxHeight: 200,
        }}
        textStyle={{ color: "white" }}
        placeholderStyle={{ color: "black" }}
        labelStyle={{ color: "black" }}
        scrollViewProps={{
          indicatorStyle: 'white',
        }}
        listItemContainerStyle={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
        }}
      />

      <View style={styles.button}>
        <Button
          title="EDIT"
          color="white"
          onPress={Edit}
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
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "#0A7763",
    marginTop: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
