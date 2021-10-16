import React, { useState, useEffect ,useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Alert,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import shuffle from "lodash.shuffle";
import GamePad from "./GamePad";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const COUNTER = 20;
const SUCCESS = "Winner Winner Thanos dinner";
const FAILED = "You Lost the game !!";

export default function Game(props) {
  const [counter, setCounter] = useState(COUNTER);
  const [randomNumbers, setRandomNumber] = useState([]);
  const [targetNumber, setTargetNumber] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sound, setSound] = React.useState();
  const [isSoundOn, setSoundOn] = React.useState(true);
  const [winnerSound, setWinnerSound] = React.useState();
  const [looserSound, setLooserSound] = React.useState();

  async function playWinnerSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sound/Winner.mp3")
    );
    setWinnerSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return winnerSound
      ? () => {
          winnerSound.unloadAsync();
        }
      : undefined;
  }, [targetNumber,winnerSound]);

  
  async function playLooserSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sound/looser_tone.mp3")
    );
    setLooserSound(sound);
    await sound.playAsync();
  }
  
  React.useEffect(() => {
    return looserSound
      ? () => {
        looserSound.unloadAsync();
        }
      : undefined;
  }, [targetNumber,looserSound]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sound/keypad.wav")
    );
    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [targetNumber,sound]);

  // Initial game board
  useEffect(() => {
    createGameBoard();
  }, []);


  useEffect(() => {
    checkResult();
  }, [selectedIds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);
    if (counter == 0) {
      checkResult();
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [counter]);

  const selectNumber =useCallback((index) => {
    if (isSoundOn) {
      playSound();
    }
    setSelectedIds((prev) => [...prev, index]);
  },[selectedIds]);

  function checkResult() {
    const sum = selectedIds.reduce((acc, curr) => acc + randomNumbers[curr], 0);
    var msg;
    if (sum > targetNumber || (sum != targetNumber && counter == 0)) {
      msg = FAILED;
      if (isSoundOn) {
      playLooserSound();
      }
    }
    if (sum === targetNumber) {
      msg = SUCCESS;
      if (isSoundOn) {
      playWinnerSound();
      }
    }
    if (msg) {
      Alert.alert("", msg, [
        { text: "Exit", onPress: () => BackHandler.exitApp() },
        { text: "Play Again", onPress: () => createGameBoard() },
      ]);
    }
  }
  // Initial game board , reset game board
  function createGameBoard() {
    setCounter(COUNTER);
    const randomNumbers = Array.from(
      { length: props.randomNumberLenght },
      () => 1 + Math.floor(Math.random() * 30)
    );

    const targetNumber = randomNumbers
      .slice(0, props.randomNumberLenght - 5) //combination of 4 number is equls to sum
      .reduce((acc, curr) => acc + curr, 0);

    setTargetNumber(targetNumber);
    setRandomNumber(shuffle(randomNumbers));
    setSelectedIds([]);
  }

  const isNumberSelected=useCallback((index)=> {
    return selectedIds.indexOf(index) > -1;
  },[selectedIds])

  return (

    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../assets/background.jpg")}
    >
      <View style={[styles.target, styles.targetContainer]}>
        <Text style={styles.text}>{targetNumber}</Text>
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{counter}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Select the numbers whose sum is equals to {targetNumber}
        </Text>
        <TouchableOpacity
          style={{ alignItems: "flex-end" }}
          onPress={() => setSoundOn(!isSoundOn)}
        >
          <FontAwesome5
            name={isSoundOn ? "volume-up" : "volume-mute"}
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <GamePad
        randomNumbers={randomNumbers}
        isNumberSelected={isNumberSelected}
        selectNumber={selectNumber}
      />
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 44,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    padding: 20,
    marginVertical: 120,
  },
  infoText: {
    fontSize: 20,
    color: "black",
  },
  playContiner: {
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#1976D2",
  },
  playText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },

  timerContainer: {
    width: 50,
    height: 50,
    backgroundColor:"#37474F",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 40,
    marginVertical: 15,
    position: "absolute",
  },

  timer: {
    color: "white",
    padding: 2,
    fontWeight: "500",
    fontSize: 22
  },

  targetContainer: {
    height: 100,
    marginTop: 30,
    borderColor: "#0d1539",
    borderWidth: 4,
    alignSelf: "center",
    borderStyle: "dashed",
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  numberContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "space-around",
    padding: 12,
    marginVertical: 30,
  },
});
