import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FooterMenu from "../component/Menus/FooterMenu";
import Icon from "react-native-vector-icons/FontAwesome";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { PostContext } from "../context/postContext";

const Post = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  // global state
  const [posts, setPosts] = useContext(PostContext);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleChnage = (name, value) => {
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handlePostCreate = async () => {
    try {
      if (!post.title || !post.description) {
        return alert("Please add title and description");
      }
      setLoading(true);
      const { data } = await axios.post("/api/v1/post/create-post", post);
      // global post
      setPosts([data?.post, ...posts]);
      console.log(data?.post);
      setLoading(false);
      alert(data?.message);
      navigation.navigate("Home");
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
          <Text style={styles.heading}>Create a Post</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Add a post title"
            value={post.title}
            onChangeText={(text) => handleChnage("title", text)}
          />

          <TextInput
            style={styles.inputBox}
            placeholder="Add a post description"
            name="description"
            multiline={true}
            numberOfLines={5}
            value={post.description}
            onChangeText={(text) => handleChnage("description", text)}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.createBtn} onPress={handlePostCreate}>
            <Text style={styles.btnText}>
              <Icon name="plus-square" size={18} /> Create Post
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    width: 350,
    borderRadius: 5,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 16,
  },
  createBtn: {
    backgroundColor: "yellow",
    marginTop: 40,
    width: 250,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
});

export default Post;
