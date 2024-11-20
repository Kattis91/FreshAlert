import FormComponent from "@/components/FormComponent";
import useDateValidation from "@/hooks/useDateValidation";
import useProductValidation from "@/hooks/useProductValidation";
import { styles } from "@/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";
import PushNotification from "react-native-push-notification";

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
  title: "",
  name: "",
  expiry: "",
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
    { label: "Non-Dairy", value: "non-dairy" },
    { label: "Plant-Based", value: "plant-based" },
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
    { label: "Other", value: "other" },
  ];

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
    useCallback(() => {
      return () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      };
    }, [navigation])
  );
  
  useDateValidation(date, dateChanged);
  const validateProduct = useProductValidation();

  useEffect(() => {
    requestNotificationPermission()
  }, []);

  async function requestNotificationPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
  
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    }
  }

  const showToast = (text, text2) => {
    Toast.show({
      type: "info",
      text1: text,
      text2: text2 ? text2 : null,
      onHide: () => {
        navigation.navigate("Your Products");
      },
      visibilityTime: 1500,
    });
    console.log("here");
  };

  const cancelNotification = (id: string) => {
    PushNotification.cancelLocalNotification(id); // Cancels notification with the specified ID
    console.log(`Canceling notification with id ${id}`)
  };

  async function Edit() {
    const isValid = validateProduct(
      productName,
      expiryDate,
      categoryValue,
      setErrorMessages
    );
    if (!isValid) {
      console.log("Validation failed"); // Log validation failure
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
      const productIndex = currentList.findIndex(
        (p: Product) => p.id === product.id
      );

      if (productIndex !== -1) {
        currentList[productIndex] = updatedProduct;
        await AsyncStorage.setItem("my-list", JSON.stringify(currentList));

        // Cancel old notifications
        cancelNotification(product.id);

        // Schedule new notifications with updated expiry date
        scheduleNotificationOneDayBefore(updatedProduct)
        scheduleNotificationThreeDaysBefore(updatedProduct)
        scheduleNotificationSevenDaysBefore(updatedProduct)

        showToast(
          "Product updated:",
          `Product: ${productName} \n Expiry date: ${expiryDate}`
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

  const scheduleNotificationOneDayBefore = (product: Product) => {
    try {
      const expiryDate = new Date(product.expiry);

      console.log("Rescheduling 1-day prior notification for:", product.name, "with expiry date:", product.expiry);
  
      // Check if expiryDate is valid
      if (!isNaN(expiryDate.getTime())) {
        const currentDate = new Date();
  
        // Create the notification date by subtracting 7 days from the expiry date
        const notificationDate = new Date(expiryDate);
        notificationDate.setDate(expiryDate.getDate() - 1);
        notificationDate.setHours(18, 0, 0, 0); // Set to 18:00:00
  
        // Ensure the notification date is in the future
        if (notificationDate > currentDate) {

          PushNotification.localNotificationSchedule({
            channelId: 'FreshAlert',
            title: 'Product Expiring Soon',
            message: `${product.name} is expiring tomorrow!`,
            date: notificationDate,
            allowWhileIdle: true,
            id: product.id,
            userInfo: { id: product.id }, 
          });
          console.log(`Notification scheduled successfully for ${product.name} at ${notificationDate}`);
        } else {
          console.error("Notification date is in the past and will not be scheduled:", notificationDate);
        }
      } else {
        console.error("Invalid expiry date for 1-day notification:", product.expiry);
      }
    } catch (error) {
      console.error("Error in scheduleNotificationOneDayBefore:", error);
    }
  };

  
  const scheduleNotificationThreeDaysBefore = (product: Product) => {
    try {
      const expiryDate = new Date(product.expiry);
      console.log("Rescheduling 3-day prior notification for:", product.name, "with expiry date:", product.expiry);
  
      // Check if expiryDate is valid
      if (!isNaN(expiryDate.getTime())) {
        const currentDate = new Date();
  
        // Create the notification date by subtracting 7 days from the expiry date
        const notificationDate = new Date(expiryDate);
        notificationDate.setDate(expiryDate.getDate() - 3);
        notificationDate.setHours(18, 0, 0, 0); // Set to 18:00:00
  
        // Ensure the notification date is in the future
        if (notificationDate > currentDate) {

          PushNotification.localNotificationSchedule({
            channelId: 'FreshAlert',
            title: 'Product Expiring Soon',
            message: `${product.name} is expiring in three days!`,
            date: notificationDate,
            allowWhileIdle: true,
            id: product.id,
            userInfo: { id: product.id },
          });
          console.log(`Notification scheduled successfully for ${product.name} at ${notificationDate}`);
        } else {
          console.error("Notification date is in the past and will not be scheduled:", notificationDate);
        }
      } else {
        console.error("Invalid expiry date for 3-day notification:", product.expiry);
      }
    } catch (error) {
      console.error("Error in scheduleNotificationThreeDaysBefore:", error);
    }
  };

  const scheduleNotificationSevenDaysBefore = (product: Product) => {
    try {
      const expiryDate = new Date(product.expiry);

      console.log("Rescheduling 7-day prior notification for:", product.name, "with expiry date:", product.expiry);
  
      // Check if expiryDate is valid
      if (!isNaN(expiryDate.getTime())) {
        const currentDate = new Date();
  
        // Create the notification date by subtracting 7 days from the expiry date
        const notificationDate = new Date(expiryDate);
        notificationDate.setDate(expiryDate.getDate() - 7);
        notificationDate.setHours(18, 0, 0, 0); // Set to 18:00:00
  
        // Ensure the notification date is in the future
        if (notificationDate > currentDate) {

          PushNotification.localNotificationSchedule({
            channelId: 'FreshAlert',
            title: 'Product Expiring Soon',
            message: `${product.name} is expiring in a week!`,
            date: notificationDate,
            allowWhileIdle: true,
            id: product.id,
            userInfo: { id: product.id },
          });
          console.log(`Notification scheduled successfully for ${product.name} at ${notificationDate}`);
        } else {
          console.error("Notification date is in the past and will not be scheduled:", notificationDate);
        }
      } else {
        console.error("Invalid expiry date for 7-day notification:", product.expiry);
      }
    } catch (error) {
      console.error("Error in scheduleNotificationSevenDaysBefore:", error);
    }
  };

  async function removeValue() {
    try {
      const storedList = await AsyncStorage.getItem("my-list");
      const currentList = storedList ? JSON.parse(storedList) : [];

      const updatedList = currentList.filter(
        (p: Product) => p.id !== product.id
      );
      await AsyncStorage.setItem("my-list", JSON.stringify(updatedList));

      showToast(
        "Product removed:",
        `Product: ${product.name} \n Expiry date: ${product.expiry}`
      );

      // navigation.navigate("Your Products");
    } catch (e) {
      console.error("Failed to remove item.", e);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8EC" }}>
      <SafeAreaView style={{ flex: 1, margin: 8, backgroundColor: "#FFF8EC" }}>
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
    </View>
  );
}
