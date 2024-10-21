import { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from "react-native";

export default function Trash() {
  const products = [
    {
      name: "Milk",
      expiryDate: "2024-08-20",
      dateAdded: "2024-08-10",
      category: "Dairy",
    },
    {
      name: "Cheddar Cheese",
      expiryDate: "2024-09-05",
      dateAdded: "2024-08-12",
      category: "Dairy",
    },
    {
      name: "Chicken Breast",
      expiryDate: "2024-10-15",
      dateAdded: "2024-10-14",
      category: "Meat",
    },
    {
      name: "Broccoli",
      expiryDate: "2024-10-17",
      dateAdded: "2024-10-13",
      category: "Vegetables",
    },
    {
      name: "Apples",
      expiryDate: "2024-10-30",
      dateAdded: "2024-10-08",
      category: "Fruits",
    },
    {
      name: "Greek Yogurt",
      expiryDate: "2024-09-01",
      dateAdded: "2024-08-11",
      category: "Dairy",
    },
    {
      name: "Spinach",
      expiryDate: "2024-10-16",
      dateAdded: "2024-10-09",
      category: "Vegetables",
    },
    {
      name: "Ground Beef",
      expiryDate: "2024-10-22",
      dateAdded: "2024-10-15",
      category: "Meat",
    },
    {
      name: "Orange Juice",
      expiryDate: "2024-10-25",
      dateAdded: "2024-10-12",
      category: "Beverages",
    },
    {
      name: "Butter",
      expiryDate: "2024-12-15",
      dateAdded: "2024-10-05",
      category: "Dairy",
    },
  ];

  const expiredProducts = products.filter(
    (item) => new Date(item.expiryDate) < new Date()
  );
  console.log(expiredProducts);

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
          Your expired products
        </Text>
        {expiredProducts.map((item, i) => (
          <ExpiredProductCard product={item} key={i} />
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
      {/* <Text style={{ fontSize: 50, color: "#003366" }}>FreshAlert</Text> */}
      <Text style={{ fontSize: 28, color: "#003366", textAlign: "center" }}>
        You do not have any expired products right now.
      </Text>
    </View>
  );
};

const ExpiredProductCard = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);
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
          source={require("../assets/images/favicon.png")}
          width={"100%"}
          height={"100%"}
        />
      </View>
      <View>
        <Text style={{ color: "#003366", fontSize: 20 }}>{product.name}</Text>
        <Text style={{ color: "#003366", fontSize: 20 }}>
          {product.expiryDate}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#0A7763",
              height: 35,
              justifyContent: "center",
              minWidth: 80,
              maxWidth: 100,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#900101",
              height: 35,
              justifyContent: "center",
              minWidth: 80,
              maxWidth: 100,
              marginTop: 5,
              marginBottom: 5,
            }}
            onPress={() => setModalOpen(true)}
          >
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
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
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, textAlign: "center" }}
                >
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
                }}
                onPress={() => setModalOpen(false)}
              >
                <Text
                  style={{ color: "white", fontSize: 20, textAlign: "center" }}
                >
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
