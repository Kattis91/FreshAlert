import { Alert } from "react-native";

const useProductValidation = () => {
  const validateProduct = (
    productName : string, 
    expiryDate: string, 
    categoryValue: string | null) =>  {

    const trimmedName = productName.trim();
    const nameRegex = /^[a-zA-Z0-9\såäöÅÄÖ]+$/;

    if (
      trimmedName.length === 0 ||
      trimmedName.length < 2 ||
      trimmedName.length > 50 ||
      !nameRegex.test(trimmedName)
  ) {
    Alert.alert("Product name cannot be empty, must be between 2 and 50 characters, and can only contain letters, numbers and spaces.");
    return false;
    }

    if (!expiryDate) {
      Alert.alert("Please select an expiry date");
      return false;
    }

    // Check if the expiry date is in the past
    const selectedDate = new Date(expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        Alert.alert("The expiry date cannot be in the past.");
        return false;
    }

    if (!categoryValue) {
        Alert.alert("Please select a category");
        return false;
    }

    return true;
  }

  return validateProduct;
};

export default useProductValidation;