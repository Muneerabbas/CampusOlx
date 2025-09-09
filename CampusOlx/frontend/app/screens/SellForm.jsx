import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import axios from "axios";
import { API_URL } from "../../config";
import colors from "../../assets/constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../context/AuthContext";

export default function SellForm() {
  const [fontsLoaded] = useFonts({
    pop: require("../../assets/fonts/Poppins-Regular.ttf"),
    popm: require("../../assets/fonts/Poppins-Medium.ttf"),
    popb: require("../../assets/fonts/Poppins-Bold.ttf"),
    popsb: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  if (!fontsLoaded) return null;

  // Pick image and store in proper format
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage({
        uri: asset.uri,
        type: asset.mimeType || "image/jpeg",
        name: asset.fileName || asset.uri.split("/").pop() || "photo.jpg",
      });
    }
  };

  const handleSubmit = async () => {
    if (!title || !desc || !price || !image) {
      alert("Please fill all fields and select an image");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", title);
    formData.append("price", price);
    formData.append("description", desc);
    formData.append("createdBy", user?.id);
    formData.append("file", image); // image object has uri, type, name

    try {
      const response = await axios.post(
        `${API_URL}/api/products/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Server response:", response.data);
      alert("Product posted successfully!");
    } catch (error) {
      console.log(error);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Post an Ad</Text>

        {/* Title */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Item Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. iPhone 14 Pro"
            placeholderTextColor="#aaa"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Description */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            placeholder="Write something about your item..."
            placeholderTextColor="#aaa"
            value={desc}
            onChangeText={setDesc}
            multiline
          />
        </View>

        {/* Price */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="₹ Enter price"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </View>

        {/* Upload Image */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Upload Image</Text>
          <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image.uri }} style={styles.uploadedImage} />
            ) : (
              <Ionicons
                name="camera-outline"
                size={40}
                color={colors.primary}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Post Ad</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.submitButton, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Post Ad</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    padding: 16,
  },
  heading: {
    fontFamily: "popsb",
    fontSize: 26,
    color: colors.primary,
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "popm",
    fontSize: 14,
    marginBottom: 8,
    color: "#444",
  },
  input: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 12,
    fontFamily: "pop",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  uploadBox: {
    height: 150,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontFamily: "popm",
    fontSize: 16,
  },
});
