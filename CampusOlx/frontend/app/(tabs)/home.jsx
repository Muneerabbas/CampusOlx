import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import colors from "../../assets/constants/colors";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "../../config";
import { useState } from "react";
import { useEffect } from "react";
const { width } = Dimensions.get("window");

const Home = () => {
  const [fontsLoaded] = useFonts({
    pop: require("../../assets/fonts/Poppins-Regular.ttf"),
    popm: require("../../assets/fonts/Poppins-Medium.ttf"),
    popb: require("../../assets/fonts/Poppins-Bold.ttf"),
    popsb: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  // const products = [
  //   {
  //     id: "1",
  //     name: "King Size Bed",
  //     price: "₹14,060",
  //     image:
  //       "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: "2",
  //     name: "iPad 10th Gen",
  //     price: "₹23,000",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdc0FVrl0qqj44bOntkQfgt_CB6xfiER6OiCATskR7CwLaicnE7fnqLz4WRA6ZBubfFkE&usqp=CAU",
  //   },
  //   {
  //     id: "3",
  //     name: "Hero Cycle",
  //     price: "₹2,320",
  //     image:
  //       "https://content.jdmagicbox.com/v2/comp/mumbai/j1/022pxx22.xx22.210129000514.k6j1/catalogue/eddie-cycling-andheri-east-mumbai-bicycle-dealers-r2w6ibghl1.jpg",
  //   },
  //   {
  //     id: "4",
  //     name: "Sony Smart TV",
  //     price: "₹11,200",
  //     image:
  //       "https://5.imimg.com/data5/SELLER/Default/2023/9/348611051/SA/CE/EX/66697248/used-led-tv-500x500.jpeg",
  //   },
  //   {
  //     id: "5",
  //     name: "iPhone 15",
  //     price: "₹71,990",
  //     image: "https://apollo.olx.in/v1/files/i7yjga7168s93-IN/image",
  //   },
  //   {
  //     id: "6",
  //     name: "LG Refrigerator",
  //     price: "₹34,990",
  //     image:
  //       "https://i.redd.it/grateful-i-was-able-to-buy-a-second-hand-fridge-for-our-v0-zbgyk3g2uw1f1.jpg?width=1080&format=pjpg&auto=webp&s=724ee6ca222a3e6b9120b5f1bfac701abac7e19e",
  //   },
  //   {
  //     id: "7",
  //     name: "Dell Inspiron Laptop",
  //     price: "₹54,500",
  //     image:
  //       "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3520/media-gallery/in3520-cnb-05000ff090-sl.psd?fmt=pjpg&pscan=auto&scl=1&wid=4330&hei=2877&qlt=100,1&resMode=sharp2&size=4330,2877&chrss=full",
  //   },
  //   {
  //     id: "8",
  //     name: "Bose Bluetooth Speaker",
  //     price: "₹18,500",
  //     image: "https://apollo.olx.in/v1/files/8h7ozkuonvxi-IN/image",
  //   },
  //   {
  //     id: "9",
  //     name: "Samsung Galaxy Watch",
  //     price: "₹27,999",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBqj9QkR8RKxjrmaanFgY_AguYP7k8XFCz1g&s",
  //   },
  // ];
  const [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    try {
      setIsloading(true);
      const res = await axios.get(`${API_URL}/api/products/get`);
      setProducts(res.data);

      // setIsloading(false);
    } catch (error) {
      alert(error);
    } finally {
      setIsloading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };
  const handleSell = () => {
    fetchData();
    router.navigate("screens/SellForm");
  };
  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.8}
      onPress={() => alert("Nothing will happen as app is under Progress!")}
    >
      <Image
        source={{ uri: `${API_URL}${item.images}` }}
        style={styles.productImage}
      />
      {/* Price Tag */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
      {/* Overlay */}
      <View style={styles.productOverlay}>
        <Text style={styles.productName} numberOfLines={1}>
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>
          Hi {user?.name} <Text style={styles.handEmoji}>👋</Text>
        </Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Sell an item card */}
      <View style={styles.sellCard}>
        <View>
          <Text style={styles.sellTitle}>Sell an item</Text>
          <Text style={styles.sellDescription}>
            Sell anything within your community at best price!
          </Text>
        </View>
        <TouchableOpacity style={styles.sellButton} onPress={handleSell}>
          <Ionicons name="camera-outline" size={20} color="white" />
          <Text style={styles.sellButtonText}> Sell</Text>
        </TouchableOpacity>
      </View>

      {/* Recently posted */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recently posted</Text>
      </View>

      {/* Product Grid */}

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={products}
          key={"2-columns"}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item) => item._id}
          renderItem={renderProductCard}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#6200EE"]}
            />
          }
        />
      )}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingText: {
    fontFamily: "popm",
    fontSize: 24,
  },
  handEmoji: {
    fontSize: 20,
  },
  sellCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderColor: "#c1c1c1",
    borderWidth: 1,
    marginBottom: 20,
  },
  sellTitle: {
    fontSize: 18,
    fontFamily: "popsb",
    marginBottom: 5,
  },
  sellDescription: {
    fontSize: 12,
    fontFamily: "pop",
    color: colors.lighter,
    width: width * 0.5,
  },
  sellButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  sellButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "popm",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "popsb",
  },
  productCard: {
    width: (width - 60) / 2,
    height: 240,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginBottom: 18,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  productName: {
    color: "white",
    fontFamily: "popm",
    fontSize: 15,
    flex: 1,
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
    color: "white",
    fontFamily: "popm",
    fontSize: 13,
  },
});

export default Home;
