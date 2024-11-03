import { useEffect } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

const useDateValidation = (date: Date, dateChanged: boolean) => {

useEffect(() => {
    if (!dateChanged) return; // Prevent running the effect on initial render

    const resetTime = (date: Date) => {
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    };

    const showToast = (text) => {
      Toast.show({
        type: 'info',
        text1: text,
      });
    }

    const currentDate = resetTime(new Date());
    const selectedDateReset = resetTime(date);

    const timeDifference = selectedDateReset.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysDifference === 0) {
      showToast("Note: The expiry date is today.");
    } else if (daysDifference > 0 && daysDifference <= 7) {
      showToast(`The expiry date is within ${daysDifference} days.`);
    } else if (daysDifference < 0) {
      showToast("The expiry date cannot be in the past.");
    }
  }, [date, dateChanged]); // This effect runs every time 'date' changes

}

export default useDateValidation;