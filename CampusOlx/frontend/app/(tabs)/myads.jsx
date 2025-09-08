import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import colors from "../../assets/constants/colors";

const { width } = Dimensions.get("window");

const MyAds = () => {
  const [ads, setAds] = useState([
    {
      id: "1",
      name: "King Size Bed",
      price: "₹14,060",
      image:
        "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "2",
      name: "iPad 10th Gen",
      price: "₹23,000",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdc0FVrl0qqj44bOntkQfgt_CB6xfiER6OiCATskR7CwLaicnE7fnqLz4WRA6ZBubfFkE&usqp=CAU",
    },
  ]);

  const [fontsLoaded] = useFonts({
    pop: require("../../assets/fonts/Poppins-Regular.ttf"),
    popm: require("../../assets/fonts/Poppins-Medium.ttf"),
    popb: require("../../assets/fonts/Poppins-Bold.ttf"),
    popsb: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  // Add new ad (dummy)
  const handleAddAd = () => {
    alert("New Ad added!");
  };

  // Edit ad (dummy)
  const handleEditAd = (id) => {
    alert("Edit Ad ID: " + id);
  };

  const renderAdCard = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {/* Edit button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEditAd(item.id)}
      >
        <Ionicons name="create-outline" size={20} color="#fff" />
      </TouchableOpacity>
      {/* Price Tag */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
      {/* Name Overlay */}
      <View style={styles.nameOverlay}>
        <Text style={styles.nameText} numberOfLines={1}>
          {item.name}
        </Text>
        <Ionicons
          name="chevron-forward-circle"
          size={24}
          color="#fff"
          style={{ marginLeft: 5 }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Ads</Text>

      <FlatList
        data={ads}
        key={"2-columns"}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id}
        renderItem={renderAdCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddAd}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  heading: {
    fontFamily: "popm",
    fontSize: 24,
    color: colors.black,
    marginBottom: 20,
  },
  card: {
    width: (width - 60) / 2,
    height: 240,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginBottom: 18,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  priceContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  priceText: {
    color: "#fff",
    fontFamily: "popm",
    fontSize: 13,
  },
  nameOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  nameText: {
    color: "#fff",
    fontFamily: "popm",
    fontSize: 15,
    flex: 1,
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: colors.primary,
    padding: 6,
    borderRadius: 20,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default MyAds;
