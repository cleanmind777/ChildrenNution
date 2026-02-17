import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
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
const SELECT_GENDER = require("../../../../assets/pic/addChild/select_gender.png");
const BOY = require("../../../../assets/pic/addChild/gender_boy.png");
const GIRL = require("../../../../assets/pic/addChild/gender_girl.png");

export default function AddChildSetName() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();
  const [notification, setNotification] = useState("");
  const canNext = !!form.gender;

  const handleNext = () => {
    if (!canNext) {
      setNotification("Please select a gender to continue.");
      return;
    }
    navigation.navigate("AddChildChooseAvatar");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContent}>
        <Image
          source={IMG_RECTANGLE}
          style={[styles.cardBg, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
          resizeMode="stretch"
        />
        <Image
          source={SELECT_GENDER}
          style={styles.selectGender}
          resizeMode="contain"
        />
        <Text style={styles.questionText}>Select Gender</Text>
        <Text style={styles.descriptionText}>This help us personalize their experience.</Text>
        <View style={styles.genderButtons}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => update("gender", "male")}
            style={[styles.cardOptionWrapper, form.gender === "male" && styles.cardOptionWrapperActive]}
          >
            <AddChildContentCard>
              <View style={styles.boyWrapper}>
                <Image
                  source={BOY}
                  style={styles.boyImage}
                  resizeMode="contain"
                />
                <Text style={styles.boyText}>Boy</Text>
              </View>
            </AddChildContentCard>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => update("gender", "female")}
            style={[styles.cardOptionWrapper, form.gender === "female" && styles.cardOptionWrapperActive]}
          >
            <AddChildContentCard>
              <View style={styles.girlWrapper}>
                <Image
                  source={GIRL}
                  style={styles.girlImage}
                  resizeMode="contain"
                />
                <Text style={styles.girlText}>Girl</Text>
              </View>
            </AddChildContentCard>
          </TouchableOpacity>
        </View>
        

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
    top: 8 * scaleY,
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
    top: 10 * scaleY,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 32,
    width: "100%",
    alignItems: "center",
  },

  genderButtons: {
    flexDirection: "row",
    gap: 13 * scaleX,
    top: 36,
  },
  cardOptionWrapper: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardOptionWrapperActive: {
    borderColor: COLORS.blueDark,
    borderWidth: 3,
    backgroundColor: "rgba(8, 59, 154, 0.08)",
  },
  boyWrapper: {
    // flexDirection: "row",
    width: 184 * scaleX,
    height: 175 * scaleX,
    alignItems: "center",
    gap: 18 * scaleX,
  },
  boyImage: {
    width: 114 * scaleX,
    height: 117 * scaleX,
  },
  boyText: {
    fontFamily: "Futura PT",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 16,
    letterSpacing: 0,
    color: COLORS.blueDark,
  },
  girlWrapper: {
    // flexDirection: "row",
    width: 184 * scaleX,
    height: 175 * scaleX,
    alignItems: "center",
    gap: 18 * scaleX,
  },
  girlImage: {
    width: 114 * scaleX,
    height: 117 * scaleX,
  },
  girlText: {
    fontFamily: "Futura PT",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 16,
    letterSpacing: 0,
    color: COLORS.blueDark,
  },
});
