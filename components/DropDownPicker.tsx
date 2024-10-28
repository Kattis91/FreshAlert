import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type DropDownPickerProps = {
  openCategory: boolean;
  categoryValue: string | null;
  categories: { label: string; value: string }[];
  setCategoryValue: (category: string | null) => void;
  setOpenCategory: (open: boolean) => void;
  placeholder?: string;
};

const DropDownPickerComponent = ({
  openCategory,
  categoryValue,
  categories,
  setCategoryValue,
  setOpenCategory,
  placeholder,
}: DropDownPickerProps) => {
  return (
    <DropDownPicker 
      style={styles.inputs}
      open={openCategory}
      value={categoryValue}
      items={categories}
      setOpen={(value) => setOpenCategory(!!value)}
      setValue={(value) => {
        if (typeof value === 'function') {
          setCategoryValue(value(categoryValue));
        } else {
          setCategoryValue(value);
        }
      }}
      placeholder={placeholder}
      listMode="SCROLLVIEW"
      dropDownContainerStyle={{
        backgroundColor: "#0A7763",
        width: "100%",
        maxHeight: 200,
      }}
      textStyle={{ color: "white" }}
      placeholderStyle={{ color: "black" }}
      labelStyle={{ color: "black" }}
      scrollViewProps={{
        nestedScrollEnabled: true,
        indicatorStyle: 'white', // Change scrollbar color to white
      }}
      listItemContainerStyle={{
        borderBottomColor: "white",
        borderBottomWidth: 1,
      }}
    />
  );
};

export default DropDownPickerComponent;

const styles = StyleSheet.create({
  inputs: {
    borderColor: "#0A7763",
    borderWidth: 2,
    height: 38,
    borderRadius: 14,
    width: "100%",
    paddingLeft: 5,
    backgroundColor: "white"
  },
});
