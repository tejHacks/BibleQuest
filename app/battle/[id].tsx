import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const battles = [
  {
    struggle: "I feel anxious and overwhelmed",
    icon: "cloud" as const,
    options: [
      {
        verse: "Philippians 4:6-7",
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God.",
        correct: true,
      },
      {
        verse: "John 3:16",
        text: "For God so loved the world that he gave his one and only Son.",
        correct: false,
      },
      {
        verse: "Proverbs 3:5",
        text: "Trust in the Lord with all your heart and lean not on your own understanding.",
        correct: false,
      },
      {
        verse: "Romans 8:28",
        text: "And we know that in all things God works for the good of those who love him.",
        correct: false,
      },
    ],
  },
  {
    struggle: "I feel like giving up",
    icon: "battery-dead" as const,
    options: [
      {
        verse: "John 14:6",
        text: "I am the way, the truth and the life.",
        correct: false,
      },
      {
        verse: "Galatians 6:9",
        text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
        correct: true,
      },
      {
        verse: "Psalm 23:1",
        text: "The Lord is my shepherd, I shall not want.",
        correct: false,
      },
      {
        verse: "Isaiah 40:29",
        text: "He gives strength to the weary and increases the power of the weak.",
        correct: false,
      },
    ],
  },
  {
    struggle: "I am struggling with fear",
    icon: "warning" as const,
    options: [
      {
        verse: "Psalm 91:1",
        text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
        correct: false,
      },
      {
        verse: "Romans 8:31",
        text: "If God is for us, who can be against us?",
        correct: false,
      },
      {
        verse: "2 Timothy 1:7",
        text: "For God has not given us a spirit of fear, but of power, love and a sound mind.",
        correct: true,
      },
      {
        verse: "John 10:10",
        text: "The thief comes only to steal and kill and destroy.",
        correct: false,
      },
    ],
  },
  {
    struggle: "I feel alone and forgotten",
    icon: "person-remove" as const,
    options: [
      {
        verse: "Jeremiah 29:11",
        text: "For I know the plans I have for you, declares the Lord.",
        correct: false,
      },
      {
        verse: "Deuteronomy 31:6",
        text: "Be strong and courageous. The Lord your God goes with you; he will never leave you nor forsake you.",
        correct: true,
      },
      {
        verse: "Matthew 11:28",
        text: "Come to me, all you who are weary and burdened, and I will give you rest.",
        correct: false,
      },
      {
        verse: "Psalm 46:1",
        text: "God is our refuge and strength, an ever-present help in trouble.",
        correct: false,
      },
    ],
  },
  {
    struggle: "I am dealing with temptation",
    icon: "flame" as const,
    options: [
      {
        verse: "James 4:7",
        text: "Submit yourselves to God. Resist the devil and he will flee from you.",
        correct: true,
      },
      {
        verse: "Proverbs 16:3",
        text: "Commit to the Lord whatever you do, and he will establish your plans.",
        correct: false,
      },
      {
        verse: "Psalm 119:105",
        text: "Your word is a lamp to my feet and a light to my path.",
        correct: false,
      },
      {
        verse: "1 John 1:9",
        text: "If we confess our sins, he is faithful and just to forgive us.",
        correct: false,
      },
    ],
  },
];

export default function BattleScreen() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const battle = battles[current];
  const total = battles.length;

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (battle.options[index].correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (current + 1 >= total) {
        setFinished(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1200);
  };

  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultWrap}>
          <View style={styles.resultIcon}>
            <Ionicons name="shield-checkmark" size={52} color="#8B5CF6" />
          </View>
          <Text style={styles.resultTitle}>Battle Complete!</Text>
          <Text style={styles.resultScore}>
            {score}/{total}
          </Text>
          <Text style={styles.resultSub}>
            {score === total
              ? "You fought well! The Word is your weapon."
              : score >= total / 2
                ? "Keep studying the Word — it's your shield."
                : "The Word is alive. Keep hiding it in your heart."}
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
            <Text style={styles.retryText}>Fight again</Text>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Spiritual Warfare</Text>
          <Text style={styles.headerCount}>
            {current + 1}/{total}
          </Text>
        </View>

        {/* Progress */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${((current + 1) / total) * 100}%` },
            ]}
          />
        </View>

        {/* Struggle card */}
        <View style={styles.struggleCard}>
          <View style={styles.struggleIconWrap}>
            <Ionicons name={battle.icon} size={32} color="#8B5CF6" />
          </View>
          <Text style={styles.struggleLabel}>The struggle</Text>
          <Text style={styles.struggleText}>{battle.struggle}</Text>
          <View style={styles.divider} />
          <Text style={styles.instruction}>
            Pick the verse that best fights this battle
          </Text>
        </View>

        {/* Verse options */}
        <View style={styles.optionsWrap}>
          {battle.options.map((option, index) => {
            let borderColor = Colors.border;
            let bgColor = Colors.surface;
            let textColor = Colors.text;
            let refColor = "#8B5CF6";

            if (selected !== null) {
              if (option.correct) {
                borderColor = "#22c55e";
                bgColor = "#0f2e1a";
                refColor = "#22c55e";
              } else if (index === selected && !option.correct) {
                borderColor = "#e74c3c";
                bgColor = "#2e0f0f";
                refColor = "#e74c3c";
                textColor = "#aaa";
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.verseOption,
                  { borderColor, backgroundColor: bgColor },
                ]}
                onPress={() => handleSelect(index)}
              >
                <View style={styles.verseOptionTop}>
                  <Text style={[styles.verseRef, { color: refColor }]}>
                    {option.verse}
                  </Text>
                  {selected !== null && option.correct && (
                    <Ionicons
                      name="shield-checkmark"
                      size={18}
                      color="#22c55e"
                    />
                  )}
                  {selected === index && !option.correct && (
                    <Ionicons name="close-circle" size={18} color="#e74c3c" />
                  )}
                </View>
                <Text style={[styles.verseText, { color: textColor }]}>
                  {option.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
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
    marginBottom: 20,
  },
  progressFill: {
    height: 4,
    backgroundColor: "#8B5CF6",
    borderRadius: 2,
  },
  struggleCard: {
    margin: 16,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#8B5CF633",
    alignItems: "center",
  },
  struggleIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1a1030",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  struggleLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#8B5CF6",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  struggleText: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    textAlign: "center",
    lineHeight: 30,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    width: "100%",
    marginVertical: 16,
  },
  instruction: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: "center",
  },
  optionsWrap: { paddingHorizontal: 16, gap: 12 },
  verseOption: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  verseOptionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  verseRef: {
    fontSize: 12,
    fontWeight: "700",
  },
  verseText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.text,
  },
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
    backgroundColor: "#1a1030",
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
    color: "#8B5CF6",
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
    backgroundColor: "#8B5CF6",
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
