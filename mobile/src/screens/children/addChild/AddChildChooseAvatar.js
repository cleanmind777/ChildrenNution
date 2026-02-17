import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useAddChild } from "../../../context/AddChildContext";
import { AddChildContinueButton } from "./components/AddChildContinueButton";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const DESIGN_WIDTH = 440;
const DESIGN_HEIGHT = 956;
const scaleX = SCREEN_WIDTH / DESIGN_WIDTH;
const scaleY = SCREEN_HEIGHT / DESIGN_HEIGHT;

const CARD_WIDTH = SCREEN_WIDTH;
const CARD_HEIGHT = 499;

const COLORS = {
  blueDark: "#083B9A",
  blueCard: "#3F68C7",
  blueLight: "#8CA9F3",
  orange: "#F68B1F",
  white: "#FFFFFF",
  inputBg: "rgba(255,255,255,0.2)",
  textLight: "#E8EEFC",
};

const IMG_RECTANGLE = require("../../../../assets/pic/addChild/rectangle1.png");
const TAKE_PHOTO = require("../../../../assets/pic/addChild/take_photo.png");
const CHOOSE_PHOTO = require("../../../../assets/pic/addChild/choose_photo.png");
const DEFAULT_AVATAR = require("../../../../assets/pic/addChild/select_gender.png");

// Take Photo button: linear-gradient(279.92deg, #0446C2 7.96%, #3F66C6 89.7%); box-shadow: 0px 4px 12.8px 0px #1049BA3D
const TAKE_PHOTO_GRADIENT = ["#0446C2", "#3F66C6"];
const TAKE_PHOTO_GRADIENT_START = { x: 1, y: 1 };
const TAKE_PHOTO_GRADIENT_END = { x: 0, y: 0 };
const TAKE_PHOTO_GRADIENT_LOCATIONS = [0.0796, 0.897];
const TAKE_PHOTO_SHADOW =
  Platform.OS === "ios"
    ? {
        shadowColor: "#1049BA",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.24,
        shadowRadius: 12.8,
      }
    : { elevation: 4 };

export default function AddChildChooseAvatar() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();
  const [notification, setNotification] = useState("");

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      setNotification("Camera permission is required to take a photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) update("avatarUri", result.assets[0].uri);
  };

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) update("avatarUri", result.assets[0].uri);
  };

  const handleNext = () => {
    navigation.navigate("AddChildInputAge");
  };

  const handleSkip = () => {
    navigation.navigate("AddChildInputAge");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContent}>
        <Image
          source={IMG_RECTANGLE}
          style={[styles.cardBg, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
          resizeMode="stretch"
        />

        <View style={styles.cardContentInner}>
          <TouchableOpacity
            style={styles.avatarWrap}
            onPress={choosePhoto}
            activeOpacity={0.8}
          >
            {form.avatarUri ? (
              <Image source={{ uri: form.avatarUri }} style={styles.avatar} />
            ) : (
              <Image source={DEFAULT_AVATAR} style={styles.avatar} />
            )}
          </TouchableOpacity>
          <Text style={styles.questionText}>
            Choose an Avatar for your Child
          </Text>
          <Text style={styles.descriptionText}>
            Select from our predefined avatars or upload your own photo.
          </Text>
          <View style={styles.photoButtonsRow}>
            <TouchableOpacity
              style={styles.takePhotoButtonWrap}
              onPress={takePhoto}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={TAKE_PHOTO_GRADIENT}
                start={TAKE_PHOTO_GRADIENT_START}
                end={TAKE_PHOTO_GRADIENT_END}
                locations={TAKE_PHOTO_GRADIENT_LOCATIONS}
                style={[styles.takePhotoButtonGradient, TAKE_PHOTO_SHADOW]}
              >
                <Image
                  source={TAKE_PHOTO}
                  style={styles.takePhotoButtonImage}
                />
                <Text style={styles.takePhotoButtonText}>Take Photo</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.photoButton}
              onPress={choosePhoto}
              activeOpacity={0.8}
            >
              <Image
                source={CHOOSE_PHOTO}
                style={styles.choosePhotoButtonImage}
              />
              <Text style={styles.photoButtonText}>Choose Photo</Text>
            </TouchableOpacity>
          </View>
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
        <AddChildContinueButton
          onPress={handleNext}
          label="Continue"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.blueDark },
  cardContent: {
    marginTop: 37 * scaleY,
    width: SCREEN_WIDTH,
    minHeight: SCREEN_HEIGHT - 37 * scaleY,
    backgroundColor: COLORS.white,
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  cardBg: {
    position: "absolute",
    top: -32 * scaleY,
    zIndex: 0,
  },
  cardContentInner: {
    width: 378 * scaleX,
    padding: 24,
    gap: 10,
    alignItems: "center",
  },
  questionText: {
    fontFamily: "Futura PT",
    fontWeight: "500", // Demi
    fontStyle: "normal",
    fontSize: 22,
    lineHeight: 22, // 100% of fontSize
    letterSpacing: 0,
    textAlignVertical: "center", // vertical-align: middle
    color: COLORS.blueDark,
    textAlign: "center",
  },
  descriptionText: {
    fontFamily: "Futura PT",
    fontWeight: "400",
    fontStyle: "normal", // Book
    fontSize: 16,
    lineHeight: 16, // 100% of fontSize
    letterSpacing: 0,
    textAlignVertical: "center", // vertical-align: middle
    color: "#6A6A6A",
    textAlign: "center",
  },
  avatarWrap: {
    width: 120 * scaleX,
    height: 120 * scaleX,
    borderRadius: 60 * scaleX,
    backgroundColor: "#eee",
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 120 * scaleX,
    height: 120 * scaleX,
    borderRadius: 60 * scaleX,
  },
  avatarPlaceholder: {
    textAlign: "center",
    color: "#6A6A6A",
    fontSize: 14,
  },
  photoButtonsRow: {
    gap: 50,
    // marginTop: 8,
    flex: 1,
    width: 379 * scaleX,
  },
  takePhotoButtonWrap: {
    flex: 1,
  },
  takePhotoButtonGradient: {
    flexDirection: "row",
    paddingVertical: 6,
    // paddingHorizontal: 6,
    borderRadius: 8,
    gap: 9,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  takePhotoButtonText: {
    fontFamily: "Futura PT",
    fontWeight: "500",
    fontSize: 18,
    color: COLORS.white,
  },
  photoButton: {
    flexDirection: "row",
    paddingVertical: 6,
    // paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    height: 44,
    // top: 8 * scaleY,
  },
  photoButtonText: {
    fontFamily: "Futura PT",
    fontWeight: "500",
    fontSize: 18,
    color: COLORS.blueDark,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 32,
    width: "100%",
    alignItems: "center",
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  skipText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  button: { position: "absolute", bottom: 32 },
  takePhotoButtonImage: {
    width: 30,
    height: 32,
  },
  choosePhotoButtonImage: {
    width: 30,
    height: 30,
  },
});
