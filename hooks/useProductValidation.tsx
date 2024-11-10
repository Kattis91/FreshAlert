import { Alert } from "react-native";

const useProductValidation = () => {
  
  const validateProduct = (
    productName : string, 
    expiryDate: string, 
    categoryValue: string | null,
    setErrorMessages: (errors: { productName?: string; expiryDate?: string; categoryValue?: string }) => void
  ) => {
    const errors: { productName?: string; expiryDate?: string; categoryValue?: string } = {};

    const trimmedName = productName.trim();
    const nameRegex = /^[\p{L}\p{N}\s]+$/u;

    let isValid = true;

    if (
      trimmedName.length === 0 ||
      trimmedName.length < 2 ||
      trimmedName.length > 50 ||
      !nameRegex.test(trimmedName)
  ) {
    console.log("Product name validation failed.");
    errors.productName = "Product name cannot be empty, must be between 2 and 50 characters, and can only contain letters, numbers and spaces.";
    isValid = false;
    }

    if (!expiryDate) {
      console.log("Expiry Date is missing.");
      errors.expiryDate = "Please select an expiry date";
      isValid = false;
    }

    // Check if the expiry date is in the past
    const selectedDate = new Date(expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      console.log("Expiry Date is in the past.");
      errors.expiryDate = "The expiry date cannot be in the past.";
      isValid = false;
    }

    if (!categoryValue) {
      console.log("Category is missing.");
      errors.categoryValue = "Please select a category";
      isValid = false;
    }

    setErrorMessages(errors);

    return isValid;
  }

  return validateProduct;
};

export default useProductValidation;