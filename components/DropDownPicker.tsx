import { styles } from "@/styles/styles";
import DropDownPicker from "react-native-dropdown-picker";

type DropDownPickerProps = {
  openCategory: boolean;
  categoryValue: string | null;
  categories: { label: string; value: string }[];
  setCategoryValue: (category: string | null) => void;
  setOpenCategory: (open: boolean) => void;
  placeholder?: string;
  changeColor?: string;
};

const DropDownPickerComponent = ({
  openCategory,
  categoryValue,
  categories,
  setCategoryValue,
  setOpenCategory,
  placeholder,
  changeColor
}: DropDownPickerProps) => {
  return (
    <DropDownPicker 
      style={{...styles.formInputs, backgroundColor: changeColor === 'true' ? "red" : "#10A78B", }}
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
        backgroundColor: "#fff1e6", 
        width: "100%",
        maxHeight: 160,
        zIndex: 2,
        borderRadius: 8, 
        padding: 10,
      }}
      textStyle={{ color: "black", fontSize: 16 }} // Tekst modern
      placeholderStyle={{ color: "white", fontSize: 14 }} 
      labelStyle={{ color: "white", fontSize: 14 }} 
      scrollViewProps={{
        nestedScrollEnabled: true,
        indicatorStyle: 'black', // Change scrollbar color to white
      }}
      listItemContainerStyle={{
        backgroundColor: "#fff1e6", 
        borderBottomColor: "#10A78B", 
        borderBottomWidth: 1,
        paddingVertical: 10, 
      }}
      listItemLabelStyle={{ color: "black", fontSize: 14 }} 
      selectedItemContainerStyle={{
        backgroundColor: '#10A78B', 
      }}
    />
  );
};

export default DropDownPickerComponent;
