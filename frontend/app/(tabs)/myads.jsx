import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
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
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import colors from "../../assets/constants/colors";
import axios from "axios";
import { useRouter } from "expo-router";

import { API_URL } from "../../config";

const { width } = Dimensions.get("window");

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsloading] = useState(true);

  async function fetchData() {
    const id = user.id;
    try {
      setIsloading(true);
      const res = await axios.get(
        `${API_URL}/api/products/getUserproducts/${id}`
      );
      setAds(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const [fontsLoaded] = useFonts({
    pop: require("../../assets/fonts/Poppins-Regular.ttf"),
    popm: require("../../assets/fonts/Poppins-Medium.ttf"),
    popb: require("../../assets/fonts/Poppins-Bold.ttf"),
    popsb: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleAddAd = () => {
    router.navigate("screens/SellForm");
  };

  const handleEditAd = (id) => {
    router.navigate("screens/SellForm");
  };

  const renderAdCard = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Image
        source={{ uri: `${API_URL}${item.images}` }}
        style={styles.image}
      />

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

      <View style={{ flex: 1, justifyContent: "center" }}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : ads.length === 0 ? (
          <Text
            style={[
              styles.heading,
              { textAlign: "center", color: colors.primary },
            ]}
          >
            No Ads found
          </Text>
        ) : (
          <FlatList
            data={ads}
            key={"2-columns"}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            keyExtractor={(item) => item._id} // use Mongo _id
            renderItem={renderAdCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#6200EE"]}
              />
            }
          />
        )}
      </View>

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
