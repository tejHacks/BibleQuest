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

const plans: Record<
  string,
  {
    title: string;
    subtitle: string;
    color: string;
    icon: any;
    days: {
      day: number;
      title: string;
      scripture: string;
      verse: string;
      reflection: string;
      prayer: string;
    }[];
  }
> = {
  "5": {
    title: "12 Hours of Prayer",
    subtitle: "A full day journey with God",
    color: "#22c55e",
    icon: "time",
    days: [
      {
        day: 1,
        title: "6:00 AM — Wake & Worship",
        scripture: "Psalm 5:3",
        verse:
          "In the morning, Lord, you hear my voice; in the morning I lay my requests before you and wait expectantly.",
        reflection:
          "Start your day by acknowledging God before anything else. Before your phone, before the news — give God the first moment.",
        prayer:
          "Lord, this morning belongs to You. Set my mind on things above. Let my first thoughts be of You.",
      },
      {
        day: 2,
        title: "7:00 AM — Gratitude",
        scripture: "Psalm 100:4",
        verse:
          "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
        reflection:
          "Gratitude shifts your atmosphere. Name three things God has done and let that fuel your worship.",
        prayer:
          "Father, thank You for life, breath and another day. I choose gratitude over complaint today.",
      },
      {
        day: 3,
        title: "9:00 AM — Intercession",
        scripture: "1 Timothy 2:1",
        verse:
          "I urge, then, first of all, that petitions, intercessions and thanksgiving be made for all people.",
        reflection:
          "Pray for others — your family, your city, your nation. Step outside of your own needs and carry others before the throne.",
        prayer:
          "Lord, I lift up those around me. Bring healing, provision and salvation to those I love.",
      },
      {
        day: 4,
        title: "12:00 PM — Midday Pause",
        scripture: "Psalm 55:17",
        verse:
          "Evening, morning and noon I cry out in distress, and he hears my voice.",
        reflection:
          "In the busyness of the day, pause. Even 5 minutes of stillness with God resets your heart and mind.",
        prayer:
          "God, in the middle of this day I come back to You. Still my heart. Let Your peace rule.",
      },
      {
        day: 5,
        title: "3:00 PM — The Hour of Mercy",
        scripture: "Hebrews 4:16",
        verse:
          "Let us then approach God's throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.",
        reflection:
          "3PM is traditionally called the hour of mercy — the hour Jesus died. Come boldly before God and ask for what you need.",
        prayer:
          "Jesus, thank You for the cross. I come boldly — I need Your mercy and grace today.",
      },
      {
        day: 6,
        title: "6:00 PM — Evening Reflection",
        scripture: "Lamentations 3:22-23",
        verse:
          "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning.",
        reflection:
          "Review your day. Where did you see God move? Where did you fall short? Bring it all to Him without condemnation.",
        prayer:
          "Lord, thank You for this day. Forgive where I missed it. I rest in Your mercy tonight.",
      },
      {
        day: 7,
        title: "9:00 PM — Night Watch",
        scripture: "Psalm 63:6",
        verse:
          "On my bed I remember you; I think of you through the watches of the night.",
        reflection:
          "End your day in prayer. Let the last voice you hear be God's. Meditate on His Word as you rest.",
        prayer:
          "Father, I give You this night. Guard my sleep. Let my last thoughts be of Your goodness. Amen.",
      },
    ],
  },
  "6": {
    title: "Fasting Plan",
    subtitle: "Discipline your body, feed your spirit",
    color: Colors.primary,
    icon: "flame",
    days: [
      {
        day: 1,
        title: "Day 1 — Why Are You Fasting?",
        scripture: "Isaiah 58:6",
        verse:
          "Is not this the kind of fasting I have chosen: to loose the chains of injustice and untie the cords of the yoke?",
        reflection:
          "Before you skip a meal, set your intention. Fasting without purpose is just dieting. What are you believing God for?",
        prayer:
          "Lord, I fast with purpose today. This hunger reminds me that You are my source — not food, not comfort, not the world.",
      },
      {
        day: 2,
        title: "Day 2 — Hunger as a Weapon",
        scripture: "Matthew 4:4",
        verse:
          "Man shall not live on bread alone, but on every word that comes from the mouth of God.",
        reflection:
          "Every time you feel hungry today, turn it into a prayer. Let physical hunger drive you to spiritual hunger for the Word.",
        prayer:
          "God, my body wants food but my spirit wants You more. Feed me with Your Word today.",
      },
      {
        day: 3,
        title: "Day 3 — Breaking Strongholds",
        scripture: "Mark 9:29",
        verse: "This kind can come out only by prayer and fasting.",
        reflection:
          "Some battles are not won with smart thinking or good strategy — they require fasting. What stronghold are you targeting?",
        prayer:
          "Lord, by prayer and fasting I come against every stronghold in my life. I declare freedom in Jesus name.",
      },
      {
        day: 4,
        title: "Day 4 — Humility Before God",
        scripture: "Ezra 8:23",
        verse:
          "So we fasted and petitioned our God about this, and he answered our prayer.",
        reflection:
          "Fasting is an act of humility. It says — I cannot do this without You, God. It positions you to receive.",
        prayer:
          "Father, I humble myself before You. I need You. Answer my prayer as I seek Your face.",
      },
      {
        day: 5,
        title: "Day 5 — The Daniel Fast",
        scripture: "Daniel 1:12",
        verse:
          "Please test your servants for ten days: Give us nothing but vegetables to eat and water to drink.",
        reflection:
          "Daniel fasted not to punish himself but to stay undefiled. What are you keeping out of your life alongside the fast?",
        prayer:
          "God, as I fast I also guard what enters my mind and heart. Let me be undefiled and set apart for You.",
      },
      {
        day: 6,
        title: "Day 6 — Fasting with Others",
        scripture: "Joel 2:15-16",
        verse:
          "Blow the trumpet in Zion, declare a holy fast, call a sacred assembly. Gather the people.",
        reflection:
          "Corporate fasting has power. Is there someone you can fast and pray with? Agreement multiplies breakthrough.",
        prayer:
          "Lord, raise up people around me who hunger for You. Let us fast and pray together and see Your glory.",
      },
      {
        day: 7,
        title: "Day 7 — Breaking the Fast Well",
        scripture: "Isaiah 58:8",
        verse:
          "Then your light will break forth like the dawn, and your healing will quickly appear.",
        reflection:
          "Breaking your fast is as important as starting it. End with gratitude and carry the discipline forward beyond the fast.",
        prayer:
          "Father, thank You for sustaining me. What You began in this fast — continue it. Let the breakthrough be lasting.",
      },
    ],
  },
};

export default function PlanScreen() {
  const [activeDay, setActiveDay] = useState(0);

  const planId = "5"; // will be dynamic — we hardcode for now
  const plan = plans[planId];

  const day = plan.days[activeDay];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{plan.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Day selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dayScroll}
        contentContainerStyle={styles.dayScrollContent}
      >
        {plan.days.map((d, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayPill,
              activeDay === index && {
                backgroundColor: plan.color,
                borderColor: plan.color,
              },
            ]}
            onPress={() => setActiveDay(index)}
          >
            <Text
              style={[
                styles.dayPillText,
                activeDay === index && { color: "#fff" },
              ]}
            >
              {d.day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Day title */}
        <View style={styles.dayHeader}>
          <View
            style={[styles.dayIconWrap, { backgroundColor: plan.color + "22" }]}
          >
            <Ionicons name={plan.icon} size={28} color={plan.color} />
          </View>
          <Text style={[styles.dayTitle, { color: plan.color }]}>
            {day.title}
          </Text>
        </View>

        {/* Scripture */}
        <View style={[styles.scriptureCard]}>
          <Text style={[styles.scriptureRef, { color: plan.color }]}>
            {day.scripture}
          </Text>
          <Text style={styles.scriptureText}>&quot;{day.verse}&quot;</Text>
        </View>

        {/* Reflection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bulb" size={16} color={plan.color} />
            <Text style={[styles.sectionTitle, { color: plan.color }]}>
              Reflection
            </Text>
          </View>
          <Text style={styles.sectionText}>{day.reflection}</Text>
        </View>

        {/* Prayer */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="hand-left" size={16} color={plan.color} />
            <Text style={[styles.sectionTitle, { color: plan.color }]}>
              Prayer
            </Text>
          </View>
          <View style={[styles.prayerBox, { borderColor: plan.color + "33" }]}>
            <Text style={styles.prayerText}>{day.prayer}</Text>
          </View>
        </View>

        {/* Nav buttons */}
        <View style={styles.navRow}>
          {activeDay > 0 && (
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => setActiveDay((d) => d - 1)}
            >
              <Ionicons name="arrow-back" size={16} color={Colors.textMuted} />
              <Text style={styles.navBtnText}>Previous</Text>
            </TouchableOpacity>
          )}
          {activeDay < plan.days.length - 1 && (
            <TouchableOpacity
              style={[
                styles.navBtn,
                styles.navBtnNext,
                { backgroundColor: plan.color },
              ]}
              onPress={() => setActiveDay((d) => d + 1)}
            >
              <Text style={[styles.navBtnText, { color: "#fff" }]}>Next</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
          )}
          {activeDay === plan.days.length - 1 && (
            <TouchableOpacity
              style={[
                styles.navBtn,
                styles.navBtnNext,
                { backgroundColor: plan.color },
              ]}
              onPress={() => router.replace("/(tabs)/home")}
            >
              <Text style={[styles.navBtnText, { color: "#fff" }]}>
                Complete plan
              </Text>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: 40 }} />
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
  dayScroll: { maxHeight: 56 },
  dayScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: "center",
    paddingVertical: 8,
  },
  dayPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  dayPillText: { fontSize: 13, fontWeight: "700", color: Colors.textMuted },
  dayHeader: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  dayIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  dayTitle: { fontSize: 18, fontWeight: "800", flex: 1, lineHeight: 26 },
  scriptureCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
  },
  scriptureRef: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  scriptureText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
    fontStyle: "italic",
  },
  section: { paddingHorizontal: 16, marginBottom: 16 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  sectionText: { fontSize: 14, color: Colors.textMuted, lineHeight: 24 },
  prayerBox: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
  },
  prayerText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 24,
    fontStyle: "italic",
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 8,
    gap: 12,
  },
  navBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  navBtnNext: { borderWidth: 0 },
  navBtnText: { fontSize: 14, fontWeight: "700", color: Colors.textMuted },
});
