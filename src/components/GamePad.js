import React from "react";
import { StyleSheet, View } from "react-native";
import uuidv4 from "../utils/utils";
import NumberButton from "./ui/NumberButton";
import PropTypes from "prop-types";

const GamePad =(props) =>{
  return (
    <View style={styles.container}>
      {props.randomNumbers.map((number, i) => (
        <NumberButton
          isSelected={props.isNumberSelected(i)}
          id={i}
          key={uuidv4()}
          number={number}
          onPress={props.selectNumber}
        />
      ))}
    </View>
  );
}

GamePad.propTypes = {
  randomNumbers: PropTypes.array.isRequired
};

export default React.memo(GamePad);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "space-around",
    padding: 12,
    marginVertical: 30,
  },
});
