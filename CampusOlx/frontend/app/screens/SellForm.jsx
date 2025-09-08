import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import colors from "../../assets/constants/colors";

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

  if (!fontsLoaded) return null;

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
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => alert("Open image picker")}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.uploadedImage} />
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
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => alert("Ad Posted Successfully!")}
        >
          <Text style={styles.submitButtonText}>Post Ad</Text>
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
