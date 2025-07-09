import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import EditModel from "./EditModel";
import { useState } from "react";

const PostCard = ({ posts, myPostScreen, handleDeletePrompt }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});

  return (
    <View>
      {myPostScreen && (
        <EditModel
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      <Text style={styles.header}>Total Posts - {posts?.length}</Text>
      {posts?.map((post, i) => (
        <View key={i} style={styles.card}>
          {myPostScreen && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 20,
              }}
            >
              <Text>
                <Icon
                  name="pencil"
                  style={{ color: "darkblue" }}
                  size={18}
                  onPress={() => {
                    setPost(post), setModalVisible(true);
                  }}
                />
              </Text>
              <Text>
                <Icon
                  name="trash"
                  style={{ color: "red" }}
                  size={18}
                  onPress={() => {
                    handleDeletePrompt(post._id);
                  }}
                />
              </Text>
            </View>
          )}
          <Text style={styles.title}>{post?.title}</Text>
          <Text style={styles.des}>{post?.description}</Text>
          <View style={styles.subCard}>
            <Text style={styles.subCardTitle}>@{post?.postedBy?.name}</Text>
            <Text style={styles.subCardTime}>
              {post && moment(post?.createdAt).format("DD-MM-YYYY")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

styles = StyleSheet.create({
  header: {
    color: "green",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  des: {
    color: "gray",
    fontSize: 16,
    paddingTop: 4,
  },
  subCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  subCardTitle: {
    fontWeight: "medium",
  },
});

export default PostCard;
