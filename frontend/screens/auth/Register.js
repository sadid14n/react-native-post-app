import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../component/InputBox";
import SubmitButton from "../../component/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      setLoading(false);
      if (data && data.message) {
        alert("Registration successfull. Please login");
      }
      setName("");
      setEmail("");
      setPassword("");
      navigation.navigate("Login");
      console.log("Register Data => ", { name, email, password });
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Error occured. Please try again");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>

      <View style={{ marginHorizontal: 20 }}>
        <InputBox inputTitle="Name" value={name} setValue={setName} />
        <InputBox
          inputTitle="Email"
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle="Password"
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}

      <SubmitButton
        btnTitle={"Register"}
        loading={loading}
        handleSubmit={handleSubmit}
      />

      <Text style={styles.linkText}>
        Already Registered? Please{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  linkText: {
    fontSize: 18,
    textAlign: "center",
  },
  link: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default Register;
