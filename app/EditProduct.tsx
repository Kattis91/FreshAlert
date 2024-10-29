import FormComponent from "@/components/FormComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { Alert, TextInput } from "react-native";


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

export default function EditProduct({ route, navigation }: EditProductProps) {
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

  async function removeValue() {
    try {
      const storedList = await AsyncStorage.getItem("my-list");
      const currentList = storedList ? JSON.parse(storedList) : [];

      const updatedList = currentList.filter((p: Product) => p.id !== product.id);
      await AsyncStorage.setItem("my-list", JSON.stringify(updatedList));

      Alert.alert("Product removed:", `Product: ${product.name} \n Expiry date: ${product.expiry}`);

      navigation.navigate("Your Products");
     
    } catch(e) {
      console.error("Failed to remove item.", e);
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
      addoredit="Edit Product"
      buttontext="EDIT"
      buttonclick={Edit} 
      button2text="DELETE"
      button2click={removeValue}
    />
    
  );
}
