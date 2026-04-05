import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const quizzes = [
  {
    id: "1",
    title: "Memory Verse",
    meta: "20 questions",
    icon: "book" as const,
    type: "quiz",
    hot: true,
  },
  {
    id: "2",
    title: "Complete the Verse",
    meta: "30 questions",
    icon: "pencil" as const,
    type: "quiz",
    hot: false,
  },
  {
    id: "3",
    title: "Bible Characters",
    meta: "25 heroes",
    icon: "people" as const,
    type: "quiz",
    hot: false,
  },
  {
    id: "4",
    title: "Spiritual Warfare",
    meta: "Fight with the Word",
    icon: "shield" as const,
    type: "battle",
    hot: false,
  },
  {
    id: "5",
    title: "12 Hours of Prayer",
    meta: "Daily plan",
    icon: "time" as const,
    type: "plan",
    hot: false,
  },
  {
    id: "6",
    title: "Fasting",
    meta: "Discipline & faith",
    icon: "flame" as const,
    type: "plan",
    hot: false,
  },
];

const typeBadge: Record<string, { label: string; color: string }> = {
  quiz: { label: "Quiz", color: Colors.primary },
  battle: { label: "Battle", color: "#8B5CF6" },
  plan: { label: "Plan", color: "#22c55e" },
};

const QuizIcon = ({ name, hot }: { name: any; hot: boolean }) => (
  <Ionicons
    name={name}
    size={28}
    color={hot ? Colors.primary : Colors.textMuted}
    style={{ marginBottom: 10 }}
  />
);

export default function Home() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.wordmark}>
          Bible<Text style={styles.accent}>Quest</Text>
        </Text>
        <View style={styles.avatar}>
          <Ionicons name="person" size={18} color="#fff" />
        </View>
      </View>

      {/* Hero card */}
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>Daily challenge</Text>
        <Text style={styles.heroTitle}>Memory Verse{"\n"}Challenge</Text>
        <Text style={styles.heroSub}>20 verses · Timed · Today only</Text>
        <TouchableOpacity style={styles.heroBtn}>
          <Text style={styles.heroBtnText}>Start now</Text>
        </TouchableOpacity>
      </View>

      {/* Streak row */}
      <View style={styles.streakRow}>
        {[
          ["7", "Day streak"],
          ["124", "Points"],
          ["12", "Verses learnt"],
        ].map(([num, lbl]) => (
          <View key={lbl} style={styles.streakCard}>
            <Text style={styles.streakNum}>{num}</Text>
            <Text style={styles.streakLbl}>{lbl}</Text>
          </View>
        ))}
      </View>

      {/* Quiz grid */}
      <Text style={styles.sectionTitle}>Choose a quiz</Text>
      <View style={styles.grid}>
        {quizzes.map((q) => (
          <TouchableOpacity
            key={q.id}
            style={[styles.quizCard, q.hot && styles.quizCardHot]}
            onPress={() => {
              if (q.type === "quiz") router.push(`/quiz/${q.id}` as any);
              if (q.type === "battle") router.push(`/battle/${q.id}` as any);
              if (q.type === "plan") router.push(`/plan/${q.id}` as any);
            }}
          >
            {q.hot && (
              <View style={styles.hotBadge}>
                <Text style={styles.hotText}>Hot</Text>
              </View>
            )}
            <QuizIcon name={q.icon} hot={q.hot} />
            <Text style={styles.quizName}>{q.title}</Text>
            <Text style={styles.quizMeta}>{q.meta}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Verse strip */}
      <View style={styles.verseStrip}>
        <Text style={styles.verseText}>
          &quot;Your word is a lamp to my feet and a light to my path.&quot;
        </Text>
        <Text style={styles.verseRef}>Psalm 119:105 · Verse of the day</Text>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 8,
  },
  wordmark: { fontSize: 22, fontWeight: "900", color: Colors.text },
  accent: { color: Colors.primary },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    margin: 16,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 22,
  },
  heroLabel: {
    fontSize: 10,
    color: "#ffffffaa",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 30,
    marginBottom: 6,
  },
  heroSub: { fontSize: 12, color: "#ffffffbb", marginBottom: 18 },
  heroBtn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  heroBtnText: { color: Colors.primary, fontWeight: "700", fontSize: 13 },
  streakRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  streakCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  streakNum: { fontSize: 24, fontWeight: "800", color: Colors.primary },
  streakLbl: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 10,
  },
  quizCard: {
    width: "47%",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
  },
  quizCardHot: {
    backgroundColor: Colors.primaryMuted,
    borderWidth: 1,
    borderColor: Colors.primary + "55",
  },
  hotBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  hotText: { fontSize: 9, fontWeight: "700", color: "#fff" },
  quizName: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  quizMeta: { fontSize: 11, color: Colors.textMuted },
  verseStrip: {
    margin: 16,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
  },
  verseText: {
    fontSize: 12,
    color: "#aaa",
    lineHeight: 20,
    fontStyle: "italic",
  },
  verseRef: {
    fontSize: 11,
    color: Colors.primary,
    marginTop: 8,
    fontWeight: "600",
  },
});
