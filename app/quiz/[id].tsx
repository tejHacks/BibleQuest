import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { questions } from "../../constants/questions";

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const quizData = questions[id as keyof typeof questions];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quizData.questions[current];
  const total = quizData.questions.length;

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === q.answer) setScore((s) => s + 1);

    setTimeout(() => {
      if (current + 1 >= total) {
        setFinished(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1000);
  };

  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultWrap}>
          <View style={styles.resultIcon}>
            <Ionicons name="trophy" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.resultScore}>
            {score} / {total}
          </Text>
          <Text style={styles.resultSub}>
            {score === total
              ? "Perfect score! God bless you 🙌"
              : score >= total / 2
                ? "Great effort! Keep studying the Word."
                : "Keep going — the Word is worth knowing."}
          </Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => {
              setCurrent(0);
              setSelected(null);
              setScore(0);
              setFinished(false);
            }}
          >
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => router.replace("/(tabs)/home")}
          >
            <Text style={styles.homeBtnText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{quizData.title}</Text>
        <Text style={styles.headerCount}>
          {current + 1}/{total}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${((current + 1) / total) * 100}%` },
          ]}
        />
      </View>

      {/* Question */}
      <View style={styles.questionWrap}>
        <Text style={styles.questionLabel}>Question {current + 1}</Text>
        <Text style={styles.questionText}>{q.question}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsWrap}>
        {q.options.map((option, index) => {
          let bgColor = Colors.surface;
          let borderColor = "transparent";

          if (selected !== null) {
            if (index === q.answer) {
              bgColor = "#0f2e1a";
              borderColor = Colors.success;
            } else if (index === selected && selected !== q.answer) {
              bgColor = "#2e0f0f";
              borderColor = "#e74c3c";
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                { backgroundColor: bgColor, borderColor, borderWidth: 1 },
              ]}
              onPress={() => handleAnswer(index)}
            >
              <View style={styles.optionLetter}>
                <Text style={styles.optionLetterText}>
                  {["A", "B", "C", "D"][index]}
                </Text>
              </View>
              <Text style={styles.optionText}>{option}</Text>
              {selected !== null && index === q.answer && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.success}
                />
              )}
              {selected === index && index !== q.answer && (
                <Ionicons name="close-circle" size={20} color="#e74c3c" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 15, fontWeight: "700", color: Colors.text },
  headerCount: { fontSize: 13, color: Colors.textMuted },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  questionWrap: { padding: 24 },
  questionLabel: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.text,
    lineHeight: 28,
  },
  optionsWrap: { paddingHorizontal: 20, gap: 12 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    gap: 12,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLetterText: { color: Colors.text, fontWeight: "700", fontSize: 13 },
  optionText: { flex: 1, color: Colors.text, fontSize: 14, fontWeight: "500" },
  resultWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  resultIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryMuted,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: Colors.text,
    marginBottom: 8,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: "900",
    color: Colors.primary,
    marginBottom: 12,
  },
  resultSub: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  retryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  retryText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  homeBtn: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 40,
    width: "100%",
    alignItems: "center",
  },
  homeBtnText: { color: Colors.textMuted, fontWeight: "600", fontSize: 15 },
});
