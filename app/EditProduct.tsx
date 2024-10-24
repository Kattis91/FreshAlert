import { Text, View } from "react-native";

export default function EditProduct({ route }) {
  const { product } = route.params;

  return (
    <View>
        <Text style={{ fontSize: 25 }}>Editing the product below</Text>
        <Text style={{ fontSize: 20 }}>{product.name}</Text>
        <Text>Expiry date: {product.expiry}</Text>
        <Text>Category: {product.category}</Text>
    </View>
        
    );
}