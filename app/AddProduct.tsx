import FormComponent from "@/components/FormComponent";
import useDateValidation from "@/hooks/useDateValidation";
import useProductValidation from "@/hooks/useProductValidation";
import { styles } from "@/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Button, PermissionsAndroid, Platform, SafeAreaView, TouchableWithoutFeedback, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";
import PushNotification from "react-native-push-notification";

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
    { label: "Other", value: "other" }
  ];

  const [date, setDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);

  useDateValidation(date, dateChanged);

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

  const scheduleNotificationOneDayBefore = (product: Product) => {
    try {
      const expiryDate = new Date(product.expiry);
      
      console.log("Scheduling 1-day prior notification for:", product.name, "with expiry date:", product.expiry);
      
      // Check if expiryDate is valid
      if (!isNaN(expiryDate.getTime())) {
        const currentDate = new Date();
      
        // Create the notification date by subtracting 1 day from the expiry date
        const notificationDate = new Date(expiryDate);
        notificationDate.setDate(expiryDate.getDate() - 1);
        notificationDate.setHours(13, 0, 0, 0); // Set to 23:51:00
      
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
      console.error("Error in scheduleNotificationSevenDayBefore:", error);
    }
  };

  const scheduleNotificationThreeDaysBefore = (product: Product)  => {
    try {
      const expiryDate = new Date(product.expiry);

      console.log("Scheduling 3-day prior notification for:", product.name, "with expiry date:", product.expiry);
  
      // Check if expiryDate is valid
      if (!isNaN(expiryDate.getTime())) {
        const currentDate = new Date();
  
        // Create the notification date by subtracting 3 days from the expiry date
        const notificationDate = new Date(expiryDate);
        notificationDate.setDate(expiryDate.getDate() - 3);
        notificationDate.setHours(13, 0, 0, 0); // Set to 18:00:00
  
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
        console.error("Invalid expiry date for 3-day notification:", product.expiry);
      }
    } catch (error) {
      console.error("Error in scheduleNotificationSevenDayBefore:", error);
    }
  };

  const scheduleNotificationSevenDaysBefore = (product: Product)  => {
    try {
      const expiryDate = new Date(product.expiry);

      console.log("Scheduling 7-day prior notification for:", product.name, "with expiry date:", product.expiry);
  
      // Check if expiryDate is valid
      if (!isNaN(expiryDate.getTime())) {
        const currentDate = new Date();
  
        // Create the notification date by subtracting 7 days from the expiry date
        const notificationDate = new Date(expiryDate);
        notificationDate.setDate(expiryDate.getDate() - 7);
        notificationDate.setHours(13, 0, 0, 0); // Set to 18:00:00
  
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
      console.error("Error in scheduleNotificationSevenDayBefore:", error);
    }
  };

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

    const productId =`${Date.now() % 4294967295}`;

    const product: Product = {
      id: productId,
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
      console.log(product, "product")
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


      console.log(productId, "Product id is", typeof(productId))
      showToast(`${productName} added:`, `Expiry date: ${expiryDate}`);
      scheduleNotificationOneDayBefore(product)
      scheduleNotificationSevenDaysBefore(product)
      scheduleNotificationThreeDaysBefore(product)

      setProductName("");
      setExpiryDate("");
      setCategoryValue(null);
      setDate(new Date());

    } catch (error) {
      console.log(error)
      console.error("Failed to add product", error);
      showToast("Failed to add product");
    }
  }

  return (

    <View style={{ flex: 1, backgroundColor: "#FFF8EC" }}>
      <SafeAreaView style={{ flex: 1, margin: 8, backgroundColor:"transparent" }}>
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
    </View>
  );
} 