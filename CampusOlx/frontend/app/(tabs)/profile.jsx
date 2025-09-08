import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import colors from "../../assets/constants/colors";
import { useAuth } from "../context/AuthContext";
const Profile = () => {
  const [fontsLoaded] = useFonts({
    pop: require("../../assets/fonts/Poppins-Regular.ttf"),
    popm: require("../../assets/fonts/Poppins-Medium.ttf"),
    popb: require("../../assets/fonts/Poppins-Bold.ttf"),
    popsb: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  const profileOptions = [
    {
      id: "1",
      title: "Edit Profile",
      icon: "create-outline",
      onPress: () => alert("Edit Profile clicked"),
    },
    {
      id: "2",
      title: "Settings",
      icon: "settings-outline",
      onPress: () => alert("Settings clicked"),
    },
    {
      id: "3",
      title: "My Ads",
      icon: "albums-outline",
      onPress: () => alert("My Ads clicked"),
    },
    {
      id: "4",
      title: "Logout",
      icon: "log-out-outline",
      onPress: () => {
        logout();
      },
    },
  ];
  const { logout } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header / Profile Info */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/profile.jpg")}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Nishant Kumar</Text>
          <Text style={styles.email}>nishant@email.com</Text>
        </View>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        {profileOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionCard}
            onPress={option.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name={option.icon}
                size={24}
                color={colors.primary}
                style={{ marginRight: 15 }}
              />
              <Text style={styles.optionText}>{option.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: colors.primary,

    // borderWidth: 1,
    width: "100%",
    padding: 20,
    // borderColor: colors.primary,
    borderRadius: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,

    borderColor: colors.white,
  },
  profileInfo: {
    marginLeft: 20,
  },
  name: {
    fontFamily: "popsb",
    fontSize: 22,
    color: "white",
  },
  email: {
    fontFamily: "popm",
    fontSize: 14,
    color: colors.white,
    marginTop: 4,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    width: "100%",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontFamily: "popm",
    fontSize: 16,
  },
});

export default Profile;
