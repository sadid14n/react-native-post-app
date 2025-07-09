import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useContext, useState } from "react";
import InputBox from "../../component/InputBox";
import SubmitButton from "../../component/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  // Global state
  const [state, setState] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      setLoading(false);
      if (data && data.message) {
        alert("Login successfull.");
      }
      setEmail("");
      setPassword("");
      navigation.navigate("Home");
      console.log("Login Data => ", { email, password });
      getLocalStorageData();
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Error occured. Please try again");
    }
  };

  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>

      <View style={{ marginHorizontal: 20 }}>
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
        btnTitle={"Login"}
        loading={loading}
        handleSubmit={handleSubmit}
      />

      <Text style={styles.linkText}>
        Not a user? Please{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Register
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

export default Login;
