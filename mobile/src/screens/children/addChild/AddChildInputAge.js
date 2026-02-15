import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text, Snackbar } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
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

const MIN_AGE = 1;
const MAX_AGE = 18;

function dateToYYYYMMDD(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function ageFromBirthday(birthdayDate) {
  const today = new Date();
  let age = today.getFullYear() - birthdayDate.getFullYear();
  const m = today.getMonth() - birthdayDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdayDate.getDate())) age--;
  return age;
}

function defaultPickerDate() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 5);
  return d;
}

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

export default function AddChildInputAge() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();

  const initialDate = (() => {
    if (form.birthday && /^\d{4}-\d{2}-\d{2}$/.test(form.birthday.trim())) {
      const [y, m, d] = form.birthday.trim().split("-").map(Number);
      const parsed = new Date(y, m - 1, d);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return defaultPickerDate();
  })();

  const [pickerDate, setPickerDate] = useState(initialDate);
  const [showPicker, setShowPicker] = useState(false);
  const [notification, setNotification] = useState("");

  const birthdayStr = dateToYYYYMMDD(pickerDate);
  const age = ageFromBirthday(pickerDate);
  const isValidBirthday = age >= MIN_AGE && age <= MAX_AGE;
  const canNext = isValidBirthday;

  const onPickerChange = (event, selectedDate) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (event.type === "set" && selectedDate) {
      setPickerDate(selectedDate);
      update("birthday", dateToYYYYMMDD(selectedDate));
    }
  };

  const handleNext = () => {
    if (!canNext) {
      setNotification(
        `Child's age must be between ${MIN_AGE} and ${MAX_AGE} years.`
      );
      return;
    }
    update("birthday", birthdayStr);
    navigation.navigate("AddChildFoodAllergies");
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
            <View style={styles.avatarWrap}>
              {form.avatarUri ? (
                <Image source={{ uri: form.avatarUri }} style={styles.avatar} />
              ) : (
                <Text style={styles.avatarPlaceholder}>No photo chosen</Text>
              )}
            </View>
            <Text style={styles.questionText}>How old is your child?</Text>
            <Text style={styles.descriptionText}>
              This help us personalize their experience
            </Text>
            <TouchableOpacity
              style={[
                styles.dateButton,
                !isValidBirthday && styles.dateButtonError,
              ]}
              onPress={() => setShowPicker(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.dateButtonText}>{birthdayStr}</Text>
              <Text style={styles.dateButtonHint}>Tap to change</Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={pickerDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onPickerChange}
                maximumDate={new Date()}
                minimumDate={(() => {
                  const d = new Date();
                  d.setFullYear(d.getFullYear() - MAX_AGE);
                  return d;
                })()}
                onTouchCancel={
                  Platform.OS === "ios" ? () => setShowPicker(false) : undefined
                }
              />
            )}
            {Platform.OS === "ios" && showPicker && (
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            )}
            {!isValidBirthday && (
              <Text style={styles.errorText}>
                Age must be between {MIN_AGE} and {MAX_AGE} years.
              </Text>
            )}
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
        <AddChildContinueButton
          onPress={handleNext}
          label="Continue"
          disabled={!canNext}
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
  cardContentInner: {
    width: 378 * scaleX,
    padding: 24,
    gap: 10,
  },
  cardBg: {
    position: "absolute",
    top: -32 * scaleY,
    zIndex: -5,
  },
  avatarWrap: {
    width: 120 * scaleX,
    height: 120 * scaleX,
    borderRadius: 60 * scaleX,
    backgroundColor: "#eee",
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
  dateButton: {
    marginBottom: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#083B9A1A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.blueDark,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8.8,
    elevation: 4,
  },
  dateButtonError: {
    borderColor: "#b00020",
  },
  dateButtonText: {
    fontFamily: "Futura PT",
    fontWeight: "500",
    fontSize: 18,
    color: COLORS.blueDark,
    textAlign: "center",
  },
  dateButtonHint: {
    fontFamily: "Futura PT",
    fontWeight: "400",
    fontSize: 12,
    color: "#6A6A6A",
    textAlign: "center",
    marginTop: 4,
  },
  doneButton: {
    marginTop: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  doneButtonText: {
    fontFamily: "Futura PT",
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.blueDark,
  },
  errorText: {
    color: "#b00020",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 4,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 32,
    width: "100%",
    alignItems: "center",
  },
  button: { position: "absolute", bottom: 32 },
});
