import FormComponent from "@/components/FormComponent";
import useDateValidation from "@/hooks/useDateValidation";
import useProductValidation from "@/hooks/useProductValidation";
import { styles } from "@/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Button, SafeAreaView, TouchableWithoutFeedback, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";

export default function AddProducts({ navigation }) {

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
  const [errorMessages, setErrorMessages] = useState({});

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

  useDateValidation(date, dateChanged);

  const validateProduct = useProductValidation();

  async function addProduct() {

    const isValid = validateProduct(productName, expiryDate, categoryValue, setErrorMessages);
    if (!isValid) {
      console.log('Validation failed'); // Log validation failure
      return;
    }
    
    const showToast = (text, text2) => {
      Toast.show({
        type: 'info',
        text1: text,
        text2: text2 ? text2 : null
      });
    }

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

      const data = await AsyncStorage.getItem("info");
      if (!JSON.parse(data)) {
        console.log(JSON.parse(data));
        AsyncStorage.setItem("info", JSON.stringify({
          "gotStarted": false
        }))
      }



      showToast(`${productName} added:`, `Expiry date: ${expiryDate}`);

      setProductName("");
      setExpiryDate("");
      setCategoryValue(null);

    } catch (error) {
      console.error("Failed to add product", error);
      showToast("Failed to add product");
    }
  }

  return (

   
      <SafeAreaView style={{ flex: 1, margin: 8, backgroundColor:"#f4f4f6" }}>

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
      </SafeAreaView>

  );
} 
