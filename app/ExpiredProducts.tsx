import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Button
} from "react-native";
import { styles } from "@/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

export default function Trash() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    getProducts()
  }, [])

  // let test = [{
  //   id: new Date().getTime(),
  //   title: "productName",
  //   name: "productName",
  //   expiry: "2024-10-27",
  //   category: "categoryValue",
  // }]

  // AsyncStorage.setItem("my-list", JSON.stringify(test))

  const getProducts = async () => {
    const storedList = await AsyncStorage.getItem("my-list");

    setProducts(storedList ? JSON.parse(storedList) : [])
  }

  console.log(products)

  const expiredProducts = products.filter(
    (item) => new Date(item.expiry) < new Date()
    (item) => new Date(item.expiry) < new Date()
  );

  return expiredProducts.length > 0 ? (
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
          Expired Products
        </Text>
        {expiredProducts.map((item, i) => (
          <ExpiredProductCard product={item} key={i} getProducts={getProducts} />
          <ExpiredProductCard product={item} key={i} getProducts={getProducts} />
        ))}
      </View>
    </ScrollView>
  ) : (
    <EmptyBin />
  );
}

const EmptyBin = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8edeb",
      }}
    >
      <Text style={{ fontSize: 28, color: "#003366", textAlign: "center" }}>
        You do not have any expired products right now.
      </Text>
    </View>
  );
};

const ExpiredProductCard = ({ product, getProducts }) => {
const ExpiredProductCard = ({ product, getProducts }) => {
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
        
        <Image
          source={getCategoryImage(product.category)} 
          style={{ width: "80%", height: "80%" }} 
          resizeMode="cover" 
        />
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              backgroundColor: "white",
              borderRadius: 8,
              height: 200,
              width: "80%",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "#003366",
              }}
            >
              Are you sure you want to delete this product?
            </Text>
            <View style={{ flexDirection: "row", margin: 15 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#900101",
                  height: 35,
                  justifyContent: "center",
                  minWidth: 80,
                  maxWidth: 100,
                  marginTop: 5,
                  marginBottom: 5,
                  marginRight: 10,
                  borderRadius: 20
                }}
                onPress={() => {
                  removeValue()
                }}
                onPress={removeValue}
              >
                <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#0A7763",
                  height: 35,
                  justifyContent: "center",
                  minWidth: 80,
                  maxWidth: 100,
                  marginTop: 5,
                  marginBottom: 5,
                  borderRadius: 20
                }}
                onPress={() => setModalOpen(false)}
              >
                <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
