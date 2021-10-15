import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

const NumberButton = React.memo(function Child(props) {
  const { isSelected, number, id } = props;
  selectNumber = () => {
    if (!isSelected) {
      props.onPress(id);
    }
  };

  return (
    <TouchableOpacity
      onPress={selectNumber}
      disabled={isSelected}
      style={[styles.buttonContainer, isSelected && styles.selected]}
    >
      <Text style={styles.text}>{number}</Text>
    </TouchableOpacity>
  );
});

NumberButton.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default NumberButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#0d1539",
    borderColor: "#6087b2",
    borderWidth: 5,
    width: 80,
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 15,
    marginVertical: 10,
    height: 80,
    borderRadius: 20,
    elevation: 10,
    shadowColor: "#FF1744",
  },
  text: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "center",
  },
  selected: {
    opacity: 0.4,
  },
});
