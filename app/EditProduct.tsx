import FormComponent from "@/components/FormComponent";
import useDateValidation from "@/hooks/useDateValidation";
import useProductValidation from "@/hooks/useProductValidation";
import { styles } from "@/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Alert, SafeAreaView, TouchableWithoutFeedback, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";


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

  const [modalOpen, setModalOpen] = useState(false);

  const [errorMessages, setErrorMessages] = useState({});

  const categories = [
    { label: "Dairy", value: "dairy" },
    { label: "Non-Dairy Products", value: "non-dairy products" },
    { label: "Plant-Based Proteins", value: "plant-based proteins" },
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

  useFocusEffect(
    useCallback(() => {
      return () =>  
        navigation.goBack();
    }, [])
  );

  useDateValidation(date, dateChanged);
  const validateProduct = useProductValidation();


  const showToast = (text, text2) => {
    Toast.show({
      type: 'info',
      text1: text,
      text2: text2 ? text2 : null,
      onHide: () => {
        navigation.navigate("Your Products")
      },
      visibilityTime: 1500
    });
    console.log("here")
  }

  async function Edit() {

    const isValid = validateProduct(productName, expiryDate, categoryValue, setErrorMessages );
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

        showToast(
          "Product updated:",
          `Product: ${productName} \n Expiry date: ${expiryDate}`,
        );

        // navigation.navigate("Your Products")

      } else {
        showToast("Product not found in the list");
      }
    } catch (error) {
      console.error("Failed to update product", error);
      showToast("Failed to update product");
    }
  }

  async function removeValue() {
    try {
      const storedList = await AsyncStorage.getItem("my-list");
      const currentList = storedList ? JSON.parse(storedList) : [];

      const updatedList = currentList.filter((p: Product) => p.id !== product.id);
      await AsyncStorage.setItem("my-list", JSON.stringify(updatedList));

      showToast("Product removed:", `Product: ${product.name} \n Expiry date: ${product.expiry}`);

      // navigation.navigate("Your Products");

    } catch (e) {
      console.error("Failed to remove item.", e);
    }
  }

  return (

    <SafeAreaView style={{ flex: 1, margin: 8, backgroundColor:"#FFF8EC" }}>
    <FormComponent
      product={product}
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
      buttontext="SAVE"
      buttonclick={Edit}
      button2text="DELETE"
      button2click={removeValue}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      navigation={navigation}
    />
</SafeAreaView>
  );
}