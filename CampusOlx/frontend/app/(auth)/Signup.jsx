import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFonts } from "expo-font";
import colors from "../../assets/constants/colors";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { API_URL } from "../../config";

const Signup = ({ navigation }) => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    pop: require("../../assets/fonts/Poppins-Regular.ttf"),
    popm: require("../../assets/fonts/Poppins-Medium.ttf"),
    popb: require("../../assets/fonts/Poppins-Bold.ttf"),
    popsb: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null); // ✅ added state
  const [isIDloading, setisIDloading] = useState(false);
  if (!fontsLoaded) return null;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const img = {
        uri: asset.uri,
        type: asset.mimeType || "image/jpeg",
        name: asset.fileName || asset.uri.split("/").pop() || "photo.jpg",
      };
      setImage(img);
      return img; // ✅ return picked image
    }
    return null;
  };

  async function handleIDverify() {
    const img = await pickImage();
    if (!img) {
      alert("No image selected!");
      return;
    }

    try {
      setisIDloading(true);
      const formData = new FormData();
      formData.append("idcard", {
        uri: img.uri,
        type: img.type,
        name: img.name,
      });

      const response = await axios.post(
        `${API_URL}/api/idcard/verify-id`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Server response:", response.data);
      alert(response.data.message);
      setisIDloading(false);

      setName(response.data.name);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Upload failed!");
    }
  }

  async function handleSignup() {
    if (!email || !password || !name) {
      alert("Enter all fields");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Server response:", response.data);
      alert("Signup successful!");
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
      } else {
        console.error("Network error:", error.message);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
      <Text style={styles.subheading}>Sign up to get started!</Text>

      {/* Full Name */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#999" />
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={false}
          placeholderTextColor="#999"
        />
        {isIDloading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <TouchableOpacity onPress={handleIDverify}>
            <Ionicons name="id-card-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#999" />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#999" />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ marginLeft: 10 }}
        >
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#999" />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor="#999"
        />
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <View style={styles.bottomText}>
        <Text style={{ fontFamily: "pop" }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/Login")}>
          <Text style={{ fontFamily: "popm", color: colors.primary }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 16,
  },
  heading: { fontFamily: "popsb", fontSize: 28, color: colors.primary },
  subheading: {
    fontFamily: "popm",
    fontSize: 14,
    color: "#999",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  input: { flex: 1, marginLeft: 10, fontFamily: "pop", fontSize: 14 },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontFamily: "popm" },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Signup;
