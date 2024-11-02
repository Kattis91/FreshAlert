import { useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteModal from "@/components/deleteModal";
import LinearGradient from "react-native-linear-gradient";

export default function Trash() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    getProducts();
  }, []);

  // let test = [{
  //   id: new Date().getTime(),
  //   title: "productName",
  //   name: "productName",
  //   expiry: "2024-10-27",
  //   category: "fruits",
  // }]

  // AsyncStorage.setItem("my-list", JSON.stringify(test))

  const getProducts = async () => {
    const storedList = await AsyncStorage.getItem("my-list");

    setProducts(storedList ? JSON.parse(storedList) : [])
  }

  console.log(products)

  const resetTime = (date: Date) => {
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    };

  const expiredProducts = products.filter(
    (item) => resetTime(new Date(item.expiry)) < resetTime(new Date())
  );

  return expiredProducts.length > 0 ? (
    <LinearGradient
      colors={['#CEECEB', '#F9CAA9', '#E4CFBE', '#C6D3BB']}
      style={{ flex: 1 }} >
      <SafeAreaView style={{ flex: 1, margin: 8 }}>
    <ScrollView >
      <View>
        <Text
          style={{
            color: "#003366",
            fontSize: 30,
            textAlign: "center",
            margin: 15,
          }}
        >
          Expired Products
        </Text>
        {expiredProducts.map((item, i) => (
          <ExpiredProductCard product={item} key={i} getProducts={getProducts} />
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  ) : (
    <EmptyBin />
  );
}

const EmptyBin = () => {
  return (
    <LinearGradient
      colors={['#CEECEB', '#F9CAA9', '#E4CFBE', '#C6D3BB']}
      style={{ flex: 1 }} >
      <SafeAreaView style={{ flex: 1, margin: 8 }}>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 28, color: "#003366", textAlign: "center" }}>
        You do not have any expired products right now.
      </Text>
    </View>
    </SafeAreaView>
    </LinearGradient>
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
        <Text>
          <Image source={require('../assets//images/dairy-products.png')} style={{ width: 55, height: 55 }} accessibilityLabel="Dairy"/>
        </Text>
        );
      case "meat":
        return (
        <Text>
          <Image source={require('../assets//images/beef.png')} style={{ width: 55, height: 55 }} accessibilityLabel="Meat"/>
        </Text>
        );
      case "seafood":
        return (
        <Text>
          <Image source={require('../assets//images/seafood.png')} style={{ width: 65, height: 65 }} accessibilityLabel="Seafood"/>
        </Text>
        );
      case "fruits":
        return (
        <Text>
          <Image source={require('../assets//images/fruits.png')} style={{ width: 55, height: 55 }} accessibilityLabel="Fruits"/>
        </Text>
        );
      case "vegetables":
        return (
        <Text>
          <Image source={require('../assets//images/vegetable.png')} style={{ width: 65, height: 65 }} accessibilityLabel="Vegetables"/>
        </Text>
        );
      case "condiments":
        return (
        <Text>
          <Image source={require('../assets//images/condiment-ingredient.png')} style={{ width: 55, height: 55 }} accessibilityLabel="Condiments"/>
        </Text>
        );
      case "beverages":
        return (
        <Text>
          <Image source={require('../assets//images/beverages.png')} style={{ width: 55, height: 55 }} accessibilityLabel="Beverages"/>
        </Text>
        );
      case "prepared foods":
        return (
        <Text>
          <Image source={require('../assets//images/meal.png')} style={{ width: 55, height: 55 }} accessibilityLabel="Prepared Foods"/>
        </Text>
        );
      case "spreads":
        return (
        <Text>
          <Image source={require('../assets//images/toast.png')} style={{ width: 55, height: 55 }} accessibilityLabel="Spreads"/>
        </Text>
        );
      case "fresh herbs":
        return (
        <Text>
          <Image source={require('../assets//images/herbs.png')} style={{ width: 65, height: 65 }} accessibilityLabel="Fresh Herbs"/>
        </Text>
        );
      case "frozen foods":
        return (
        <Text>
          <Image source={require('../assets//images/frozen-food.png')} style={{ width: 55, height: 55 }} accessibilityLabel="Frozen Foods" />
        </Text>
        );
      default:
        return ":question:"
    }
  };
  
  const [modalOpen, setModalOpen] = useState(false);
  async function removeValue() {
    try {
      const storedList = await AsyncStorage.getItem("my-list");
      const currentList = storedList ? JSON.parse(storedList) : [];

      const updatedList = currentList.filter((p: Product) => p.id !== product.id);
      await AsyncStorage.setItem("my-list", JSON.stringify(updatedList));

      getProducts(); // Reload products
      setModalOpen(false); // Close modal

    } catch (e) {
      console.error("Failed to remove item.", e);
    }
  }
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        margin: 20,
      }}
    >
      <View style={{ width: "30%", height: 100 }}>
        
      {getCategoryEmoji(product.category)}
      </View>
      <View>
        <Text style={{ color: "#003366", fontSize: 20 }}>{product.name}</Text>
        <Text style={{ color: "#003366", fontSize: 20 }}>
          {product.expiry}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#900101",
              height: 35,
              justifyContent: "center",
              minWidth: 80,
              maxWidth: 100,
              marginTop: 5,
              marginBottom: 5,
              borderRadius: 20
            }}
            onPress={() => setModalOpen(true)}
          >
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{...styles.button, backgroundColor: "#900101"}}>
          <Button
            title="Delete"
            color="white"
            onPress={() => setModalOpen(true)}
          />
        </View> */}
      </View>
      <DeleteModal visible={modalOpen} onClose={() => setModalOpen(false)} onDelete={removeValue} />
    </View>
  );
};
