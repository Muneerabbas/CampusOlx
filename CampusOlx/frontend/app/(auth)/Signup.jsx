import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import colors from "../../assets/constants/colors";
import { useRouter } from "expo-router";

const Signup = ({ navigation }) => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    pop: require("../../assets/fonts/Poppins-Regular.ttf"),
    popm: require("../../assets/fonts/Poppins-Medium.ttf"),
    popb: require("../../assets/fonts/Poppins-Bold.ttf"),
    popsb: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [showPassword, setShowPassword] = useState(false);

  if (!fontsLoaded) return null;

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
          placeholderTextColor="#999"
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#999" />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#999" />
        <TextInput
          placeholder="Password"
          style={styles.input}
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
      <TouchableOpacity style={styles.button}>
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
