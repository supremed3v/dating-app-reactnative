import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  MaterialIcons,
  Foundation,
  FontAwesome,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";

import SelectButton from "../../../components/SelectButton";
// export default function Interests() {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState([]);
//   const [items, setItems] = useState([
//     {
//       label: "Sports",
//       value: "sports",
//       icon: () => (
//         <MaterialIcons name="sports-football" size={12} color="#900" />
//       ),
//     },
//     {
//       label: "Shopping",
//       value: "shopping",
//       icon: () => <MaterialIcons name="shopping-bag" size={12} color="#900" />,
//     },
//     {
//       label: "Swimming",
//       value: "swimming",
//       icon: () => <MaterialIcons name="waves" size={12} color="#900" />,
//     },
//     {
//       label: "Traveling",
//       value: "traveling",
//       icon: () => <Foundation name="mountains" size={12} color="black" />,
//     },
//     {
//       label: "Art",
//       value: "art",
//       icon: () => <FontAwesome name="paint-brush" size={12} color="black" />,
//     },
//     {
//       label: "Music",
//       value: "music",
//       icon: () => <FontAwesome name="music" size={12} color="black" />,
//     },
//     {
//       label: "Extreme",
//       value: "extreme",
//       icon: () => <Fontisto name="hot-air-balloon" size={12} color="black" />,
//     },
//     {
//       label: "Video Games",
//       value: "video games",
//       icon: () => <Entypo name="game-controller" size={12} color="black" />,
//     },
//     ,
//   ]);
//   return (
//     <View
//       style={{
//         backgroundColor: "#171717",
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         paddingHorizontal: 15,
//         marginTop: 100,
//       }}
//     >
//       <DropDownPicker
//         placeholder="Select your interests"
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}
//         multiple={true}
//         mode="BADGE"
//         badgeDotColors={[
//           "#e76f51",
//           "#00b4d8",
//           "#e9c46a",
//           "#e76f51",
//           "#8ac926",
//           "#00b4d8",
//           "#e9c46a",
//         ]}
//         badgeColors={{ color: "#000" }}
//         style={{ backgroundColor: "#f6697d", borderColor: "#E8E6EA" }}
//         textStyle={{ color: "#fff" }}
//         labelStyle={{ color: "black" }}
//         placeholderStyle={{ color: "white", textAlign: "center" }}
//         dropDownContainerStyle={{
//           backgroundColor: "#f6697d",
//         }}
//         arrowIconStyle={{ color: "#fff" }}
//         tickIconStyle={{ color: "#fff" }}
//       />
//     </View>
//   );
// }

export default function Interests() {
  const [interest, setInterest] = useState([]);
  const options = [
    "Sports",
    "Shopping",
    "Swimming",
    "Traveling",
    "Art",
    "Music",
    "Extreme",
    "Video Games",
  ];
  function pickInterest(selectedInterest) {
    if (interest.includes(selectedInterest)) {
      setInterest(
        interest.filter((interests) => interests != selectedInterest)
      );
      return;
    }
    setInterest((interest) => interest.concat(selectedInterest));
    console.log(interest);
  }

  return (
    <View>
      <Text>Interests</Text>
      <View>
        {options.map((option) => (
          <Pressable onPress={() => pickInterest(option)}>
            <Text>{option}</Text>
            {interest.includes(option) && <Text>Selected</Text>}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
