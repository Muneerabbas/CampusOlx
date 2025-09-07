import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import colors from "../assets/constants/colors";

const { width } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    pop: require("../assets/fonts/Poppins-Regular.ttf"),
    popm: require("../assets/fonts/Poppins-Medium.ttf"),
    popb: require("../assets/fonts/Poppins-Bold.ttf"),
    popsb: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* Heading */}
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome To</Text>
        <Text style={styles.appName}>Campus OLX</Text>
      </View>

      {/* Image */}
      <Image
        source={require("../assets/images/entryImage.jpg")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Description */}
      <Text style={styles.description}>
        Buy and sell second-hand items easily within PICT campus. Your go-to
        platform for great deals!
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/Signup")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: {
    fontFamily: "popm",
    fontSize: 20,
    color: "#555",
  },
  appName: {
    fontFamily: "popsb",
    fontSize: 32,
    color: colors.primary,
  },
  image: {
    width: width * 0.8,
    height: width * 0.5,
    marginBottom: 25,
  },
  description: {
    fontFamily: "pop",
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
    lineHeight: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "popm",
    fontSize: 16,
  },
});
