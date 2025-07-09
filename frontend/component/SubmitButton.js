import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SubmitButton = ({ handleSubmit, btnTitle, loading }) => {
  return (
    <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
      <Text style={styles.btnText}>
        {loading ? "Please wait..." : btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnSubmit: {
    backgroundColor: "black",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  btnText: {
    color: "white",
    fontSize: 24,
    fontWeight: 400,
  },
});

export default SubmitButton;
