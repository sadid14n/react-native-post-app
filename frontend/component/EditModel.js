import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditModel = ({ modalVisible, setModalVisible, post }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Handle Post Update
  const handlePostUpdate = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/v1/post/update-post/${id}`, {
        title,
        description,
      });
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
    setTitle(post?.title);
    setDescription(post?.description);
  }, [post]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Edit Your Post</Text>
              <Text style={styles.modalText}>Title</Text>
              <TextInput
                style={styles.textBox}
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
              <Text style={styles.modalText}>Description</Text>
              <TextInput
                style={styles.textBox}
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={(text) => setDescription(text)}
              />

              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    handlePostUpdate(post && post._id),
                      setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Update</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    // textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textBox: {
    backgroundColor: "lightgray",
    width: "full",
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default EditModel;
