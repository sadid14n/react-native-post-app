import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../component/Menus/FooterMenu";
import axios from "axios";

const Account = () => {
  // Global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  // local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState("");
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/v1/auth/profile-update", {
        name,
        email,
        password,
      });
      setState({ ...state, user: data?.updatedUser });
      setPassword("");
      setLoading(false);
      alert(data?.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert(error.response.data.message);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
            }}
            style={{ height: 150, width: 150, borderRadius: 100 }}
          />
        </View>
        <Text style={styles.warnignText}>
          Currently you can only update your name and password
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.inputText}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput style={styles.inputText} value={email} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.inputText}
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Role</Text>
          <TextInput
            style={styles.inputText}
            value={state?.user.role}
            editable={false}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.btnUpdate} onPress={handleUpdate}>
            <Text style={{ fontSize: 16 }}>
              {loading ? "Updating..." : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
    marginTop: 40,
    marginBottom: 40,
  },
  warnignText: {
    color: "orange",
    fontSize: 14,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputTitle: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputText: {
    width: 250,
    fontSize: 16,
    marginLeft: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  btnUpdate: {
    backgroundColor: "orange",
    padding: 10,
    marginTop: 30,
    borderRadius: 6,
    marginLeft: 20,
  },
});

export default Account;
