import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const Sellitem = () => {
  const [fontsLoaded] = useFonts({
    pop: require("../../assets/fonts/Poppins-Regular.ttf"),
    popm: require("../../assets/fonts/Poppins-Medium.ttf"),
    popb: require("../../assets/fonts/Poppins-Bold.ttf"),
  });
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi Goutham 👋</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Sell an Item Card */}
      <View style={styles.card}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Sell an item</Text>
          <Text style={styles.cardSubtitle}>
            Sell anything within your community at best price!
          </Text>
        </View>
        <TouchableOpacity style={styles.sellButton}>
          <Ionicons name="cash-outline" size={20} color="white" />
          <Text style={styles.sellButtonText}>Sell</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
  },
  searchButton: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  sellButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A5ACD",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sellButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default Sellitem;
