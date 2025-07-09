import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);

  // logout function
  const handleLogout = async () => {
    setState({
      user: null,
      token: "",
    });
    await AsyncStorage.removeItem("@auth");
    alert("Logout Successfully");
  };

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={handleLogout}>
        <Icon name="sign-out" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    paddingRight: 15,
  },
  iconStyle: {
    fontSize: 22,
    color: "red",
  },
});

export default HeaderMenu;
