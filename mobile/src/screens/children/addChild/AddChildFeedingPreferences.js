import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Text, Snackbar, TextInput, Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAddChild } from "../../../context/AddChildContext";
import AddChildContentCard from "../../../components/AddChildContentCard";
import { AddChildContinueButton } from "./components/AddChildContinueButton";
import api from "../../../config/api";

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
const FEEDING_PREFERENCES = require("../../../../assets/pic/addChild/feeding_preferences.png");

const FALLBACK_OPTIONS = [
  "Prefers soft foods",
  "Avoids mixed textures",
  "Avoids crunchy foods",
  "Avoids slippery foods",
  "Sensitive to strong smells",
  "Currently in feeding therapy",
];

export default function AddChildFeedingPreferences() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();

  const [options, setOptions] = useState(FALLBACK_OPTIONS);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [other, setOther] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .get("/api/feeding-preference-options/")
      .then((res) => {
        if (cancelled) return;
        const list = (res.data || []).map((o) =>
          typeof o === "string" ? o : o.label
        );
        if (list.length) setOptions(list);
      })
      .catch(() => {
        if (!cancelled) setOptions(FALLBACK_OPTIONS);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const current = Array.isArray(form.feedingPreferences)
      ? form.feedingPreferences
      : form.feedingPreferences
      ? String(form.feedingPreferences)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    if (!current.length) {
      setSelected([]);
      setOther("");
      return;
    }

    const otherFromValue = current.find((v) => v.startsWith("Other: "));
    if (otherFromValue) {
      setOther(otherFromValue.replace("Other: ", ""));
      setSelected(current.filter((v) => v !== otherFromValue));
    } else {
      setOther("");
      setSelected(current);
    }
  }, []);

  const toggleOption = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleNext = () => {
    let values = [...selected];
    if (other.trim().length > 0) {
      values.push(`Other: ${other.trim()}`);
    }
    update("feedingPreferences", values);
    navigation.navigate("AddChildMedicalNotes");
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
              source={FEEDING_PREFERENCES}
              style={styles.feedingPreferencesImage}
              resizeMode="contain"
            />
            <Text style={styles.questionText}>Feeding Preferences</Text>

            {loading ? (
              <Text style={styles.loading}>Loading options...</Text>
            ) : (
              <ScrollView
                style={styles.optionsScroll}
                contentContainerStyle={styles.optionsContent}
                showsVerticalScrollIndicator={false}
              >
                {options.map((option) => (
                  <View key={option} style={styles.toggleRow}>
                    <Text style={styles.toggleLabel}>{option}</Text>
                    <Switch
                      value={selected.includes(option)}
                      onValueChange={() => toggleOption(option)}
                      color={COLORS.blueDark}
                    />
                  </View>
                ))}

                <Text style={styles.sectionTitle}>Other</Text>
                <View style={styles.toggleRow}>
                  <Text style={styles.toggleLabel}>Other</Text>
                  <Switch
                    value={other.trim().length > 0}
                    onValueChange={(v) => {
                      if (!v) setOther("");
                    }}
                    color={COLORS.blueDark}
                  />
                </View>
                <View style={styles.otherInputWrapper}>
                  <TextInput
                    mode="outlined"
                    label="Other"
                    placeholder="Enter other preference"
                    value={other}
                    onChangeText={setOther}
                    style={styles.otherInput}
                    outlineColor={COLORS.blueDark}
                    activeOutlineColor={COLORS.blueDark}
                    theme={{ roundness: 8 }}
                  />
                </View>
              </ScrollView>
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
  loading: {
    marginTop: 8,
    color: "#6A6A6A",
    fontSize: 14,
    textAlign: "center",
  },
  optionsScroll: {
    maxHeight: 615 * scaleY,
  },
  optionsContent: {
    paddingVertical: 4,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  toggleLabel: {
    fontFamily: "Futura PT",
    fontSize: 15,
    color: COLORS.blueDark,
    flex: 1,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.blueDark,
  },
  otherRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  otherInputWrapper: {
    marginTop: 8,
  },
  otherInput: {
    backgroundColor: "#083B9A1A",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 32,
    width: "100%",
    alignItems: "center",
  },
  button: { position: "absolute", bottom: 32 },
  feedingPreferencesImage: {
    width: 65 * scaleX,
    height: 65 * scaleX,
    alignSelf: "center",
  },
});
