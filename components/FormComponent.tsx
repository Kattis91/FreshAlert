import {
  Alert,
  Button,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import DropDownPickerComponent from "./DropDownPicker";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "@/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteModal from "./deleteModal";
import useProductValidation from "@/hooks/useProductValidation";
import { useFocusEffect } from "expo-router";
import Toast from "react-native-toast-message";
import PushNotification from "react-native-push-notification";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

type Product = {
  id: number;
  title: string;
  name: string;
  expiry: string;
  category: string | null;
};

type FormComponentProps = {
  product: Product;
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

  const [errorMessages, setErrorMessages] = useState<{ productName?: string; expiryDate?: string; categoryValue?: string }>({});
  const validateProduct = useProductValidation();

  const handleButtonClick = () => {
    const isValid = validateProduct(productName, expiryDate, categoryValue, setErrorMessages);
    console.log("Validation Result:", isValid);  // Logs validation result (true or false)
    if (isValid) {
      buttonclick();  // Only calls buttonclick if validation passes
    }
  };


  const formatDate = (date: Date) => {
    const zonedDate = toZonedTime(date, Intl.DateTimeFormat().resolvedOptions().timeZone);
    return format(zonedDate, "yyyy-MM-dd");
  };

  const cancelNotification = (id: string) => {
    PushNotification.cancelLocalNotification(id); // Cancels notification with the specified ID
  };

  async function removeValue() {
    try {
      const storedList = await AsyncStorage.getItem("my-list");
      const currentList = storedList ? JSON.parse(storedList) : [];

      const updatedList = currentList.filter(
        (p: Product) => p.id !== product.id
      );
      await AsyncStorage.setItem("my-list", JSON.stringify(updatedList));

      // Cancel notifications for the deleted product
      console.log(`Attempting to cancel notifications for product ID: ${product?.id}`);
      // Cancel old notifications
      cancelNotification(product.notificationId1);
      cancelNotification(product.notificationId3);
      cancelNotification(product.notificationId7);

      const showToast = (text, text2) => {
        Toast.show({
          type: 'info',
          text1: text,
          text2: text2 ? text2 : null
        });
      }

      showToast(
        "Product removed:",
        `Product: ${product?.name} \n Expiry date: ${product?.expiry}`,
      );
      navigation.navigate("Your Products")
    } catch (e) {
      console.error("Failed to remove item.", e);
    }
  }

  useEffect(() => {
    console.log("Product prop:", product);
    if (product) {
      setProductName(product.name);
      setCategoryValue(product.category);
      setExpiryDate(product.expiry);
      setDate(new Date(product.expiry || Date.now()));
    }
  }, [product]);

  useFocusEffect(
    React.useCallback(() => {
      // This function will be called when the screen is focused
      return () => {
        // This function will be called when the screen is unfocused
        setOpenCategory(false);
        setProductName("");
        setExpiryDate("");
        setCategoryValue(null);
        setErrorMessages({});
      };
    }, [])
  );

  const handleProductNameChange = (text: string) => {
    setProductName(text);
    if (errorMessages.productName) {
      setErrorMessages((prev) => ({ ...prev, productName: undefined }));
    }
  };

  const isDarkMode = useColorScheme() === "dark";

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setOpenCategory(false);
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text
          style={{
            textTransform: "uppercase",
            fontSize: 25,
            textAlign: "center",
            marginBottom: 25,
            color: "#003366",
          }}
        >
          {addoredit}
        </Text>

        <Text style={styles.label}>Product Name:</Text>

        <TextInput
          style={styles.formInputs2}
          onChangeText={handleProductNameChange}
          value={productName}
          placeholder="Enter product name"
          placeholderTextColor="#6b7a99"
        />

        {errorMessages.productName && <Text style={styles.errorText}>{errorMessages.productName}</Text>}

        <Text style={styles.label}>Expiry Date:</Text>

        <TextInput
          style={styles.formInputs2}
          ref={inputRef}
          onFocus={() => setOpenDate(true)}
          onChangeText={setExpiryDate}
          value={expiryDate}
          placeholder="Add expiry date"
          placeholderTextColor="#6b7a99"
        />
         {errorMessages.expiryDate && <Text style={styles.errorText}>{errorMessages.expiryDate}</Text>}

        <DatePicker
          modal
          open={openDate}
          date={date}
          mode="date"
          buttonColor={isDarkMode ? "#FFFFFF" : "#000000"}
          onConfirm={(selectedDate) => {
            setOpenDate(false);
            setDate(selectedDate);
            setExpiryDate(formatDate(selectedDate));
            setDateChanged(true);
            setErrorMessages((prev) => ({ ...prev, expiryDate: undefined }));

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
          setCategoryValue={(value) => {
            setCategoryValue(value);
            setErrorMessages((prev) => ({ ...prev, categoryValue: undefined }));
          }}
          setOpenCategory={setOpenCategory}
          placeholder="Choose category"
          changeColor="true"
        />
         {errorMessages.categoryValue && <Text style={styles.errorText}>{errorMessages.categoryValue}</Text>}

        <View>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleButtonClick} 
            accessibilityLabel={buttontext === "ADD" ? "Add button" : "Edit button"}
            >
            <Text style={styles.buttonText}>{buttontext}</Text>
          </TouchableOpacity>
        </View>

        {button2text && button2click && (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 15,
                textAlign: "center",
                marginBottom: 25,
                marginTop: 20,
                color: "#003366",
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
              accessibilityLabel="Delete button"
              onPress={() => setModalOpen(true)}
            >
              <Text style={styles.buttonText}>
                {button2text}
              </Text>
            </TouchableOpacity>

            <DeleteModal
              visible={modalOpen}
              onClose={() => setModalOpen(false)}
              onDelete={removeValue}
            />
          </View>
        )}
        <Toast/>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FormComponent;
