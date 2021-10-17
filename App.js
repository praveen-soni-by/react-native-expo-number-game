import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Platform, StatusBar } from "react-native";
import Home from "./src/components/Home";

import Game from "./src/components/Game";
const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0;

export default function App() {
  const [play, setPlay] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, marginTop: paddingTop }}>
      {play ? (
        <Game randomNumberLenght={9} />
      ) : (
        <Home play={() => setPlay(true)} />
      )}
    </SafeAreaView>
  );
}
