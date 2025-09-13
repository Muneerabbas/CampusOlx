import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../../assets/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const chatData = [
  {
    id: 1,
    name: "Akshat",
    lastMessage: "Bhai Final Price bolo",
    timestamp: "10:00 AM",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Nishat Sandeep",
    lastMessage: "400rs mein dede bhai!",
    timestamp: "Yesterday",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Harshwardan",
    lastMessage: "Got it. Thanks!",
    timestamp: "Mon",
    avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Radha",
    lastMessage: "Deal Done!",
    timestamp: "Sun",
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Aakash",
    lastMessage: "Bhai isse kam Nahi hoga.",
    timestamp: "Sun",
    avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

const Chat = () => {
  const [fontsLoaded] = useFonts({
    pop: require("../../assets/fonts/Poppins-Regular.ttf"),
    popm: require("../../assets/fonts/Poppins-Medium.ttf"),
    popb: require("../../assets/fonts/Poppins-Bold.ttf"),
    popsb: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderChatItem = (chat) => (
    <TouchableOpacity key={chat.id} style={styles.chatItem} activeOpacity={0.7}>
      <Image source={{ uri: chat.avatarUrl }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{chat.name}</Text>
          <Text style={styles.timestamp}>{chat.timestamp}</Text>
        </View>
        <Text numberOfLines={1} style={styles.lastMessage}>
          {chat.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat List */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {chatData.map(renderChatItem)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  // ---------- HEADER ----------
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "popm",
    color: colors.black,
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 18,
  },

  // ---------- CHAT LIST ----------
  scrollViewContent: {
    paddingVertical: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EAEAEA",
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 15,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontFamily: "popsb",
    color: "#222",
  },
  timestamp: {
    fontSize: 12,
    fontFamily: "popm",
    color: "#999",
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: "pop",
    color: "#666",
  },
});

export default Chat;
