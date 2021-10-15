import React from "react";
import { SafeAreaView } from "react-native";
import { Platform, StatusBar } from "react-native";

import Game from "./src/components/Game";
const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0;

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: paddingTop }}>
      <Game randomNumberLenght={9} />
    </SafeAreaView>
  );
}
