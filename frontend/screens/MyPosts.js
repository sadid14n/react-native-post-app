import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FooterMenu from "../component/Menus/FooterMenu";
import { PostContext } from "../context/postContext";
import PostCard from "../component/PostCard";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const getUserPost = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/post/get-user-post");
      setPosts(data?.userPosts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert(error);
    }
  };

  // Delete Posts
  const handleDeletePrompt = (id) => {
    Alert.alert("Attention!", "Are you sure want to delete this post?", [
      {
        text: "Cancell",
        onPress: () => {
          console.log("Cancell");
        },
      },
      {
        text: "Delete",
        onPress: () => {
          handleDeletePost(id);
        },
      },
    ]);
  };

  // Delete posts
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/api/v1/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("MyPosts");
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert(error);
    }
  };

  useEffect(() => {
    getUserPost();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard
          posts={posts}
          myPostScreen={true}
          handleDeletePrompt={handleDeletePrompt}
        />
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

export default MyPosts;
