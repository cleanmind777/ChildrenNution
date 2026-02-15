import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { TextInput, Text, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import api from "../../../config/api";
import { useAddChild } from "../../../context/AddChildContext";
import AddChildContentCard from "./components/AddChildContentCard";
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

export default function AddChildMedicalNotes() {
  const navigation = useNavigation();
  const { form, update, reset } = useAddChild();
  const [notes, setNotes] = useState(form.medicalNotes || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!form.name?.trim()) {
      setError("Please enter the child's name");
      return;
    }
    const birthdayStr = (form.birthday || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdayStr)) {
      setError("Please enter a valid birthday (YYYY-MM-DD)");
      return;
    }
    const [y, m, d] = birthdayStr.split("-").map(Number);
    const birthDate = new Date(y, m - 1, d);
    if (
      isNaN(birthDate.getTime()) ||
      birthDate.getFullYear() !== y ||
      birthDate.getMonth() !== m - 1 ||
      birthDate.getDate() !== d
    ) {
      setError("Please enter a valid birthday (YYYY-MM-DD)");
      return;
    }
    let age = new Date().getFullYear() - birthDate.getFullYear();
    const monthDiff = new Date().getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && new Date().getDate() < birthDate.getDate())
    )
      age--;
    if (age < 1 || age > 18) {
      setError("Child's age must be between 1 and 18 years");
      return;
    }

    setLoading(true);
    setError("");
    update("medicalNotes", notes);

    try {
      const payload = {
        name: form.name.trim(),
        birthday: birthdayStr,
        sex: form.gender,
        food_allergies: Array.isArray(form.foodAllergies)
          ? form.foodAllergies.join(", ") || null
          : form.foodAllergies || null,
        dietary_restrictions: Array.isArray(form.dietaryRestrictions)
          ? form.dietaryRestrictions.join(", ") || null
          : form.dietaryRestrictions || null,
        feeding_preferences: Array.isArray(form.feedingPreferences)
          ? form.feedingPreferences.join(", ") || null
          : form.feedingPreferences || null,
        medical_notes: notes.trim() || null,
      };
      await api.post("/api/children/", payload);
      reset();
      navigation.getParent()?.goBack();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to add child");
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.questionText}>Medical / Other Notes</Text>
            <TextInput
              label="Medical or other notes"
              value={notes}
              onChangeText={setNotes}
              mode="outlined"
              multiline
              numberOfLines={4}
              placeholder="Write here..."
              style={styles.input}
              outlineColor={COLORS.blueDark}
              activeOutlineColor={COLORS.blueDark}
              theme={{ roundness: 8 }}
              contentStyle={styles.inputContent}
            />
          </View>
        </AddChildContentCard>

        <Snackbar
          visible={!!error}
          onDismiss={() => setError("")}
          duration={3000}
        >
          {error}
        </Snackbar>
      </View>
      <View style={styles.buttonWrapper}>
        <AddChildContinueButton
          onPress={handleSave}
          label="Save Child Profile"
          disabled={loading}
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
    height: 615 * scaleY,
    padding: 15,
    gap: 10,
  },
  questionText: {
    fontFamily: "Futura PT",
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 20,
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
    marginBottom: 8,
  },
  input: {
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: "#083B9A1A",
    borderRadius: 10,
    minHeight: 115 * scaleY,
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
  button: { position: "absolute", bottom: 32 },
});
