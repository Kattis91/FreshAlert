import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  SafeAreaView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteModal from "@/components/deleteModal";
import ConfirmDeleteAllModal from "./ConfirmDeleteAllModal";
import Toast from 'react-native-toast-message';
import { useFocusEffect } from "expo-router";

export default function Trash() {
  const [products, setProducts] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [confirmDeleteAllVisible, setConfirmDeleteAllVisible] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  // let test = [{
  //   id: new Date().getTime(),
  //   title: "productName",
  //   name: "productName",
  //   expiry: "2024-10-27",
  //   category: "fruits",
  // },
  // {
  //   id: new Date().getTime(),
  //   title: "productName",
  //   name: "productName",
  //   expiry: "2024-10-27",
  //   category: "vegetables",
  // }]

  // AsyncStorage.setItem("my-list", JSON.stringify(test))

  const getProducts = async () => {
    const storedList = await AsyncStorage.getItem("my-list");
    setProducts(storedList ? JSON.parse(storedList) : []);
  };

  console.log(products);

  const resetTime = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const expiredProducts = products.filter(
    (item) => resetTime(new Date(item.expiry)) < resetTime(new Date())
  );

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }
    , [])
  );

  const deleteAllExpiredProducts = async () => {
    try {
      const updatedList = products.filter(
        (item) => resetTime(new Date(item.expiry)) >= resetTime(new Date())
      );
      await AsyncStorage.setItem("my-list", JSON.stringify(updatedList));
      setProducts(updatedList); // Update state to reflect changes
      
       // Show toast after successful deletion
      Toast.show({
        type: 'success',
        text1: 'All expired products have been deleted.',
      });
      console.log('test')

    } catch (error) {
      console.error("Failed to delete all expired products.", error);
    }
  };

  return expiredProducts.length > 0 ? (
    <View style={{ flex: 1, backgroundColor: "#FFF8EC" }}>
      <SafeAreaView
        style={{ flex: 1, margin: 8, backgroundColor: "transparent" }}
      >
        <ScrollView>
          <View>
            <Text
              style={{
                color: "#003366",
                fontSize: 30,
                textAlign: "center",
                margin: 15,
              }}
            >
              Out of freshness:
            </Text>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                  backgroundColor: "white",
                  shadowOpacity: 0.2,
                  borderRadius: 20,
                  paddingVertical: 5,
                }}
                accessibilityLabel="Delete all expired products"
                onPress={() => setConfirmDeleteAllVisible(true)}
              >
                <Text
                  style={{
                    color: "red",
                    fontSize: 16,
                    paddingHorizontal: 10,
                  }}
                >
                  Delete all your expired products
                </Text>
              </TouchableOpacity>

              {/* Display delete message */}
              {deleteMessage ? (
                <Text
                  style={{ color: "green", textAlign: "center", marginTop: 5 }}
                >
                  {deleteMessage}
                </Text>
              ) : null}
            </View>
            {expiredProducts
              .sort((a, b) => new Date(b.expiry).getTime() - new Date(a.expiry).getTime())
              .map((item, i) => (
              <ExpiredProductCard
                product={item}
                key={i}
                getProducts={getProducts}
              /> 
            ))}
          </View>
        </ScrollView>
        {/* Confirmation modal for deleting all expired products */}
        <ConfirmDeleteAllModal
          visible={confirmDeleteAllVisible}
          onClose={() => setConfirmDeleteAllVisible(false)}
          onConfirm={deleteAllExpiredProducts}
        />
      </SafeAreaView>
        <Toast/>
    </View>
  
  ) : (
    <EmptyBin />
  );
}



const EmptyBin = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8EC" }}>
      <SafeAreaView
        style={{ flex: 1, margin: 8, backgroundColor: "transparent" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, color: "#003366", textAlign: "center" }}>
            All clear! No expired products right now.
          </Text>
          <Image
            source={require("../assets//images/fresh-3.png")}
            style={{ width: 150, height: 150, marginTop: 20 }}
            accessibilityLabel="Fresh"
          />
        </View>
        <Toast/>
      </SafeAreaView>
    </View>
  );
};

const ExpiredProductCard = ({ product, getProducts }) => {
  type Product = {
    id: number;
    title: string;
    name: string;
    expiry: string;
    category: string | null;
    daysDifference: number;
  };

  const getCategoryEmoji = (category: string | null) => {
    switch (category) {
      case "dairy":
        return (
          <Image
            source={require("../assets//images/dairy-products.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Dairy"
          />
        );
      case "meat":
        return (
          <Image
            source={require("../assets//images/beef.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Meat"
          />
        );
      case "seafood":
        return (
          <Image
            source={require("../assets//images/seafood.png")}
            style={{ width: 65, height: 65 }}
            accessibilityLabel="Seafood"
          />
        );
      case "fruits":
        return (
          <Image
            source={require("../assets//images/fruits.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Fruits"
          />
        );
      case "vegetables":
        return (
          <Image
            source={require("../assets//images/vegetable.png")}
            style={{ width: 65, height: 65 }}
            accessibilityLabel="Vegetables"
          />
        );
      case "condiments":
        return (
          <Image
            source={require("../assets//images/condiment-ingredient.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Condiments"
          />
        );
      case "beverages":
        return (
          <Image
            source={require("../assets//images/beverages.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Beverages"
          />
        );
      case "prepared foods":
        return (
          <Image
            source={require("../assets//images/meal.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Prepared Foods"
          />
        );
      case "spreads":
        return (
          <Image
            source={require("../assets//images/toast.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Spreads"
          />
        );
      case "fresh herbs":
        return (
          <Image
            source={require("../assets//images/herbs.png")}
            style={{ width: 65, height: 65 }}
            accessibilityLabel="Fresh Herbs"
          />
        );
      case "frozen foods":
        return (
          <Image
            source={require("../assets//images/frozen-food.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Frozen Foods"
          />
        );
      case "non-dairy":
        return (
          <Image
            source={require("../assets//images/dairy-free.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Non-Dairy Products"
          />
        );
      case "plant-based":
        return (
          <Image
            source={require("../assets//images/vegan.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Plant-Based Proteins"
          />
        );
      default:
        return (
          <Image
            source={require("../assets//images/confused.png")}
            style={{ width: 55, height: 55 }}
            accessibilityLabel="Question Mark"
          />
        );
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  async function removeValue() {
    try {
      const storedList = await AsyncStorage.getItem("my-list");
      const currentList = storedList ? JSON.parse(storedList) : [];
      const updatedList = currentList.filter(
        (p: Product) => p.id !== product.id
      );
      await AsyncStorage.setItem("my-list", JSON.stringify(updatedList));
      getProducts(); // Refresh product list
      setModalOpen(false); // Close modal
    } catch (e) {
      console.error("Failed to remove item.", e);
    }
  }
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#003366",
        borderBottomWidth: 1,
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{ width: "20%", justifyContent: "center", alignItems: "center" }}
      >
        {Platform.OS === "ios" ? (
          <Text>{getCategoryEmoji(product.category)}</Text>
        ) : (
          getCategoryEmoji(product.category)
        )}
      </View>

      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text style={{ color: "#003366", fontSize: 20 }}>{product.name}</Text>
        <Text style={{ color: "#003366", fontSize: 16 }}>{product.expiry}</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#900101",
          height: 35,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 15,
          borderRadius: 20,
        }}
        accessibilityLabel="Delete button"
        onPress={() => setModalOpen(true)}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
      </TouchableOpacity>

      <DeleteModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={removeValue}
      />

    </View>
  );
};
