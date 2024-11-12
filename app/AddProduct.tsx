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

  const scheduleNotificationOnExpiry = (product: Product) => {
    try {
      const expiryDate = new Date(product.expiry);
      console.log("Scheduling notification on expiry for:", product.name, "with expiry date:", product.expiry);
      
      if (!isNaN(expiryDate.getTime())) {  // Check if expiryDate is valid
        const notificationDate = new Date(
          `${expiryDate.getFullYear()}-${expiryDate.getMonth() + 1}-${expiryDate.getDate()} ${Platform.OS === "ios" ? "18:00:00" : null}`
        );
  
        PushNotification.localNotificationSchedule({
          channelId: 'FreshAlert',
          title: 'Product Expiring Soon',
          message: `${product.name} is expiring today!`,
          date: notificationDate,
          allowWhileIdle: true,
        });
      } else {
        console.error("Invalid expiry date for notification:", product.expiry);
      }
    } catch (error) {
      console.error("Error in scheduleNotificationOnExpiry:", error);
    }
  };
  
  const scheduleNotificationThreeDayBefore = (product: Product) => {
    try {
      const expiryDate = new Date(product.expiry);
      console.log("Scheduling 3-day prior notification for:", product.name, "with expiry date:", product.expiry);
      
      if (!isNaN(expiryDate.getTime()) && expiryDate.getDate() - 3 >= new Date().getDate()) {
        const notificationDate = new Date(
          `${expiryDate.getFullYear()}-${expiryDate.getMonth() + 1}-${expiryDate.getDate() - 3} ${Platform.OS === "ios" ? "18:00:00" : null}`
        );
  
        PushNotification.localNotificationSchedule({
          channelId: 'FreshAlert',
          title: 'Product Expiring Soon',
          message: `${product.name} is expiring in 3 days!`,
          date: notificationDate,
          allowWhileIdle: true,
        });
      } else {
        console.error("Invalid expiry date for 3-day notification:", product.expiry);
      }
    } catch (error) {
      console.error("Error in scheduleNotificationThreeDayBefore:", error);
    }
  };
  
  const scheduleNotificationSevenDayBefore = (product: Product) => {
    try {
      const expiryDate = new Date(product.expiry);
      console.log("Scheduling 7-day prior notification for:", product.name, "with expiry date:", product.expiry);
      
      if (!isNaN(expiryDate.getTime()) && expiryDate.getDate() - 7 >= new Date().getDate()) {
        const notificationDate = new Date(
          `${expiryDate.getFullYear()}-${expiryDate.getMonth() + 1}-${expiryDate.getDate() - 7} ${Platform.OS === "ios" ? "18:00:00" : null}`
        );
  
        PushNotification.localNotificationSchedule({
          channelId: 'FreshAlert',
          title: 'Product Expiring Soon',
          message: `${product.name} is expiring in a week!`,
          date: notificationDate,
          allowWhileIdle: true,
        });
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

      showToast(`${productName} added:`, `Expiry date: ${expiryDate}`);
      scheduleNotificationOnExpiry(product)
      scheduleNotificationSevenDayBefore(product)
      scheduleNotificationThreeDayBefore(product)

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

   
      <SafeAreaView style={{ flex: 1, margin: 8, backgroundColor:"#FFF8EC" }}>

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
