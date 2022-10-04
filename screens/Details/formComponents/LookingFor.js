import { View, Text } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function LookingFor() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: "Male",
      value: "males",
    },
    {
      label: "Female",
      value: "females",
    },
    ,
  ]);
  return (
    <View
      style={{
        backgroundColor: "#171717",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        marginTop: 100,
      }}
    >
      <DropDownPicker
        placeholder="You are looking for?"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{ backgroundColor: "#f6697d", borderColor: "#E8E6EA" }}
        textStyle={{ color: "#fff" }}
        labelStyle={{ color: "white", textAlign: "center", fontSize: 20 }}
        placeholderStyle={{ color: "white", textAlign: "center" }}
        dropDownContainerStyle={{
          backgroundColor: "#f6697d",
        }}
      />
    </View>
  );
}
