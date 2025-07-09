import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon
          name="home"
          style={styles.iconStyle}
          color={route.name === "Home" && "blue"}
        />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyPosts")}>
        <Icon
          name="info-circle"
          style={styles.iconStyle}
          color={route.name === "MyPosts" && "blue"}
        />
        <Text>My Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <Icon
          name="plus-square"
          style={styles.iconStyle}
          color={route.name === "Post" && "blue"}
        />
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Icon
          name="user"
          style={styles.iconStyle}
          color={route.name === "Account" && "blue"}
        />
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 30,
  },
});

export default FooterMenu;
