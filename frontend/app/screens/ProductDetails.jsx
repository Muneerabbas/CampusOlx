import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import colors from "../../assets/constants/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "../../config";

const { width } = Dimensions.get("window");

const AdsDetails = () => {
  const { id } = useLocalSearchParams(); // product id passed from navigation
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    pop: require("../../assets/fonts/Poppins-Regular.ttf"),
    popm: require("../../assets/fonts/Poppins-Medium.ttf"),
    popb: require("../../assets/fonts/Poppins-Bold.ttf"),
    popsb: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });
  if (!fontsLoaded) return null;

  async function fetchProduct() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/api/products/get/${id}`);
      setProduct(res.data);
      console.log(res.data);
    } catch (error) {
      alert("Failed to fetch product details");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontFamily: "popm", fontSize: 16 }}>
          Product not found
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ad Details</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image
          source={{ uri: `${API_URL}${product.images}` }}
          style={styles.productImage}
        />

        {/* Product Name */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Text style={styles.productName}>{product.name}</Text>

          <Text style={styles.priceText}>₹ {product.price}</Text>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {product.description || "No description provided"}
        </Text>

        {/* Seller Info */}
        <Text style={styles.sectionTitle}>Seller Info</Text>
        <View style={styles.sellerBox}>
          <Ionicons
            name="person-circle-outline"
            size={40}
            color={colors.primary}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.sellerName}>
              {product.createdBy?.name || "Unknown Seller"}
            </Text>
            <Text style={styles.sellerEmail}>
              {product.createdBy?.email || "No email available"}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Contact Seller</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "popm",
    fontSize: 18,
  },
  productImage: {
    width: width,
    height: width * 0.7,
    resizeMode: "cover",
  },

  priceText: {
    color: "#fff",
    fontFamily: "popm",
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,0.7)",

    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 16,
    borderRadius: 8,
  },
  productName: {
    fontFamily: "popm",
    fontSize: 22,
    padding: 16,
    color: colors.black,
  },
  sectionTitle: {
    fontFamily: "popm",
    fontSize: 16,
    marginTop: 10,
    marginHorizontal: 16,
    marginBottom: 0,
    color: colors.black,
  },
  description: {
    fontFamily: "pop",
    fontSize: 12,
    lineHeight: 20,
    color: colors.lighter,
    marginHorizontal: 16,
  },
  sellerBox: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
  },
  sellerName: {
    fontFamily: "popm",
    fontSize: 15,
    color: colors.black,
  },
  sellerEmail: {
    fontFamily: "pop",
    fontSize: 13,
    color: colors.lighter,
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    borderRadius: 30,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "popm",
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default AdsDetails;
