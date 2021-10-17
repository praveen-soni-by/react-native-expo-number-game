import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import StartButton from "../../assets/80238-spooky-ghost.gif";

export default function Home(props) {
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={StartButton}
    >
      <TouchableOpacity style={styles.container} onPress={props.play}>
        <View style={styles.button}>
          <Text style={styles.text}>Play</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
  },
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: "60%",
    backgroundColor: "#C62828",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    elevation: 6,
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 34,
    elevation: 10,
    shadowColor: "#FF1744",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});
