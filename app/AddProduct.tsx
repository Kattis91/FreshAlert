import FormComponent from "@/components/FormComponent";
import useDateValidation from "@/hooks/useDateValidation";
import useProductValidation from "@/hooks/useProductValidation";
import { styles } from "@/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, TouchableWithoutFeedback, View } from "react-native";

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

    const isValid = validateProduct(productName, expiryDate, categoryValue);
    if (!isValid) {
      console.log('Validation failed'); // Log validation failure
      return;
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

      Alert.alert("Product added:", `Product: ${productName} \n Expiry date: ${expiryDate}`);

      setProductName("");
      setExpiryDate("");
      setCategoryValue(null);

      if (newList.length === 1) {
        navigation.navigate('Home');
      }

    } catch (error) {
      console.error("Failed to add product", error);
      Alert.alert("Failed to add product");
    }
  }

  return (

    <View style={{ flex: 1 }}>
      {/* Conditional Overlay */}
      {openCategory && (
        <TouchableWithoutFeedback onPress={() => setOpenCategory(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <View style={{ flex: 1 }}>
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
      </View>
    </View>

  );
} 