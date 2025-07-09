import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../component/Menus/FooterMenu";
import { PostContext } from "../context/postContext";
import PostCard from "../component/PostCard";

const Home = () => {
  // Global state
  const [posts, , getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  // refresh controll
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllPosts();
    setRefreshing(false);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PostCard posts={posts} />
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
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
});

export default Home;
