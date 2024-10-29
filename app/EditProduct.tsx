import FormComponent from "@/components/FormComponent";
import useDateValidation from "@/hooks/useDateValidation";
import useProductValidation from "@/hooks/useProductValidation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";


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

  useEffect(() => {
    console.log('Product prop:', product);
    if (product) {
      setProductName(product.name);
      setCategoryValue(product.category);
      setExpiryDate(product.expiry);
      setDate(new Date(product.expiry || Date.now()));
    }
  }, [product]);

  useDateValidation(date, dateChanged);
  const validateProduct = useProductValidation();

  async function Edit() {

    const isValid = validateProduct(productName, expiryDate, categoryValue);
    if (!isValid) {
      console.log('Validation failed'); // Log validation failure
      return;
    }

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
  }

  async function removeValue() {
    try {
      const storedList = await AsyncStorage.getItem("my-list");
      const currentList = storedList ? JSON.parse(storedList) : [];

      const updatedList = currentList.filter((p: Product) => p.id !== product.id);
      await AsyncStorage.setItem("my-list", JSON.stringify(updatedList));

      Alert.alert("Product removed:", `Product: ${product.name} \n Expiry date: ${product.expiry}`);

      navigation.navigate("Your Products");

    } catch (e) {
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
