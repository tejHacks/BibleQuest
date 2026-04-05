/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

export default function Splash() {
  const dot1 = useRef(new Animated.Value(0.2)).current;
  const dot2 = useRef(new Animated.Value(0.2)).current;
  const dot3 = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const pulse = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.2,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ).start();

    pulse(dot1, 0);
    pulse(dot2, 200);
    pulse(dot3, 400);

    const timer = setTimeout(() => router.replace("/(tabs)/home"), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="book" size={44} color="#fff" />
      </View>
      <Text style={styles.wordmark}>
        Bible<Text style={styles.accent}>Quest</Text>
      </Text>
      <Text style={styles.tagline}>Know the Word. Live the Word.</Text>
      <View style={styles.dotsRow}>
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View key={i} style={[styles.dot, { opacity: dot }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: 90,
    height: 90,
    backgroundColor: Colors.primary,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  wordmark: {
    fontSize: 36,
    fontWeight: "900",
    color: Colors.text,
    letterSpacing: -1,
  },
  accent: { color: Colors.primary },
  tagline: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 8,
    letterSpacing: 1,
  },
  dotsRow: { flexDirection: "row", gap: 8, marginTop: 60 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
});
