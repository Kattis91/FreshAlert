import { Alert, Button, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import DropDownPickerComponent from "./DropDownPicker";
import { useEffect, useRef } from "react";
import { styles } from "@/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteModal from "./deleteModal";

type Product = {
  id: number;
  title: string;
  name: string;
  expiry: string;
  category: string | null;
};

type FormComponentProps = {
  product: Product | null;
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
  button2text?: string;
  button2click?: () => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  navigation: any;
};

const FormComponent = ({
  product,
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
  button2text,
  button2click,
  navigation,
  modalOpen,
  setModalOpen,
}: FormComponentProps) => {
    const inputRef = useRef<TextInput>(null);

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0]; // Returns in format YYYY-MM-DD
};

async function removeValue() {
  try {
    const storedList = await AsyncStorage.getItem('my-list');
    const currentList = storedList ? JSON.parse(storedList) : [];

    const updatedList = currentList.filter((p: Product) => p.id !== product?.id);
    await AsyncStorage.setItem('my-list', JSON.stringify(updatedList));

      Alert.alert(
        "Product removed:",
        `Product: ${product?.name} \n Expiry date: ${product?.expiry}`,
        [
          {
            text: "OK",
            onPress: () => {
              console.log("OK pressed");
              navigation.navigate("Your Products");
            }
          }
        ]
      );
      
  } catch (e) {
    console.error('Failed to remove item.', e);
  }
}

useEffect(() => {
  console.log('Product prop:', product);
  if (product) {
    setProductName(product.name);
    setCategoryValue(product.category);
    setExpiryDate(product.expiry);
    setDate(new Date(product.expiry || Date.now()));
  }
}, [product]);

return (

  <View style={styles.container}>

    <Text style={{ textTransform: "uppercase", fontSize: 25, textAlign: "center", marginBottom: 25 }}>{ addoredit }</Text>

    <Text style={styles.label}>Product Name:</Text>

    <TextInput
      style={styles.formInputs}
      onChangeText={setProductName}
      value={productName}
      placeholder="Enter product name"
      placeholderTextColor="black"
    />

    <Text style={styles.label}>Expiry Date:</Text>

    <TextInput
      style={styles.formInputs}
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
        onPress={ buttonclick }
      />
    </View>

    { button2text && button2click &&
      <View style={{ alignItems: "center" }}>
      <Text
        style={{
          textTransform: "uppercase",
          fontSize: 15,
          textAlign: "center",
          marginBottom: 25,
          marginTop: 20,
        }}
      >
        Or delete the item:
      </Text>
      
      <TouchableOpacity
        style={{
          backgroundColor: "#900101", 
          padding: 15, 
          borderRadius: 30, 
          alignItems: "center",
          width: "80%", 
          elevation: 3, //(Just for Android)
        }}
        onPress={() => setModalOpen(true)}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          {button2text}
        </Text>
      </TouchableOpacity>

      <DeleteModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={removeValue}
      />
    </View>
    }
  </View>

  );
}

export default FormComponent;