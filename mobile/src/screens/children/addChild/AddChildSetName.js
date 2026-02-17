import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAddChild } from "../../../context/AddChildContext";
import AddChildContentCard from "../../../components/AddChildContentCard";
import { AddChildContinueButton } from "./components/AddChildContinueButton";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const DESIGN_WIDTH = 440;
const DESIGN_HEIGHT = 956;
const scaleX = SCREEN_WIDTH / DESIGN_WIDTH;
const scaleY = SCREEN_HEIGHT / DESIGN_HEIGHT;

// Login card (and IMG_RECTANGLE) size for design 440×956
const CARD_WIDTH = SCREEN_WIDTH;
const CARD_HEIGHT = 499;
const CARD_MARGIN_H = ((DESIGN_WIDTH - 407) / 2) * scaleX;

const COLORS = {
  blueDark: "#083B9A",
  blueCard: "#3F68C7",
  blueLight: "#8CA9F3",
  orange: "#F68B1F",
  white: "#FFFFFF",
  inputBg: "rgba(255,255,255,0.2)",
  textLight: "#E8EEFC",
};

// Assets from /assets/pic/auth/login
const IMG_RECTANGLE = require("../../../../assets/pic/addChild/rectangle1.png");
const IMG_CHILD = require("../../../../assets/pic/addChild/setName.png");

export default function AddChildSetName() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();
  const [notification, setNotification] = useState("");
  const canNext = (form.name || "").trim().length > 0;

  const handleNext = () => {
    if (!canNext) {
      setNotification("Please enter the child's name to continue.");
      return;
    }
    navigation.navigate("AddChildSelectGender");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContent}>
        <Image
          source={IMG_RECTANGLE}
          style={[styles.cardBg, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
          resizeMode="stretch"
        />
        <AddChildContentCard>
          <View style={styles.cardContentInner}>
            <Image
              source={IMG_CHILD}
              style={styles.childImage}
              resizeMode="contain"
            />
            <Text style={styles.questionText}>What's your child's name?</Text>
            <Text style={styles.descriptionText}>Let’s get to know them!</Text>
            <TextInput
              value={form.name}
              onChangeText={(v) => update("name", v)}
              mode="outlined"
              style={styles.input}
              placeholder="Enter name here..."
              placeholderTextColor="#6A6A6A"
              outlineColor={COLORS.blueDark}
              activeOutlineColor={COLORS.blueDark}
              theme={{ roundness: 8 }}
              contentStyle={styles.inputContent}
              textColor="#000000"
            />
          </View>
        </AddChildContentCard>

        <Snackbar
          visible={!!notification}
          onDismiss={() => setNotification("")}
          duration={3000}
        >
          {notification}
        </Snackbar>
      </View>
      <View style={styles.buttonWrapper}>
        <AddChildContinueButton onPress={handleNext} label="Continue" disabled={!canNext} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.blueDark },
  title: { fontSize: 20, marginBottom: 20 },
  input: {
    marginBottom: 16,
    backgroundColor: "#083B9A1A",
    borderRadius: 8,
    // Shadow to approximate box-shadow: 0px 4px 17.6px 0px #00000040
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8.8,
    elevation: 4,
  },
  button: { position: "absolute", bottom: 32 },

  cardContent: {
    marginTop: 37 * scaleY,
    width: SCREEN_WIDTH,
    minHeight: SCREEN_HEIGHT - 37 * scaleY,
    backgroundColor: COLORS.white,
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  cardContentInner: {
    width: 378 * scaleX,
    padding: 24,
    gap: 10,
  },
  cardBg: {
    position: "absolute",
    top: -32 * scaleY,
    zIndex: 0,
  },
  childImage: {
    width: 129 * scaleX,
    height: 194 * scaleY,
    alignSelf: "center",
  },
  questionText: {
    fontFamily: "Futura PT",
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 22,
    lineHeight: 22,
    letterSpacing: 0,
    color: COLORS.blueDark,
    textAlign: "center",
  },
  descriptionText: {
    fontFamily: "Futura PT",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    color: "#6A6A6A",
    textAlign: "center",
  },
  inputContent: {
    fontFamily: "Futura PT",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 32,
    width: "100%",
    alignItems: "center",
  },
});
