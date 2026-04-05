import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { useUser } from "../../hooks/useUser";

const avatarOptions = ["🙏", "✝️", "📖", "🔥", "⚔️", "🕊️"];

export default function Profile() {
  const { user, saveUser, loading } = useUser();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name || "");

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Enter your name", "Please enter a name to continue.");
      return;
    }
    await saveUser({ name: name.trim() });
    setEditing(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => setEditing(!editing)}>
            <Ionicons
              name={editing ? "close" : "pencil"}
              size={20}
              color={Colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* Avatar + name */}
        <View style={styles.profileTop}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarEmoji}>{user.avatar || "🙏"}</Text>
          </View>

          {editing ? (
            <View style={styles.editWrap}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={Colors.textDim}
                autoFocus
              />
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.profileName}>
              {user.name || "Set your name"}
            </Text>
          )}

          <Text style={styles.profileSub}>BibleQuest Warrior</Text>
        </View>

        {/* Avatar picker */}
        {editing && (
          <View style={styles.avatarPicker}>
            <Text style={styles.avatarPickerLabel}>Choose your avatar</Text>
            <View style={styles.avatarRow}>
              {avatarOptions.map((a) => (
                <TouchableOpacity
                  key={a}
                  style={[
                    styles.avatarOption,
                    user.avatar === a && styles.avatarOptionActive,
                  ]}
                  onPress={() => saveUser({ avatar: a })}
                >
                  <Text style={styles.avatarOptionText}>{a}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={24} color={Colors.primary} />
            <Text style={styles.statNum}>{user.streak}</Text>
            <Text style={styles.statLbl}>Day streak</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trophy" size={24} color="#F5A623" />
            <Text style={styles.statNum}>{user.points}</Text>
            <Text style={styles.statLbl}>Points</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="book" size={24} color="#22c55e" />
            <Text style={styles.statNum}>{user.versesLearnt}</Text>
            <Text style={styles.statLbl}>Verses learnt</Text>
          </View>
        </View>

        {/* About section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About BibleQuest</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              BibleQuest is built for believers who want to go deeper in the
              Word — through quizzes, spiritual warfare, prayer plans and
              fasting guides.
            </Text>
            <Text style={styles.aboutVerse}>
              &quot;Your word is a lamp to my feet.&quot; — Psalm 119:105
            </Text>
          </View>
        </View>

        {/* Built by */}
        <View style={styles.builtBy}>
          <Text style={styles.builtByText}>Built with faith by</Text>
          <Text style={styles.builtByName}>tejthedev</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { color: Colors.textMuted, fontSize: 14 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  headerTitle: { fontSize: 22, fontWeight: "900", color: Colors.text },
  profileTop: { alignItems: "center", paddingVertical: 24 },
  avatarWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  avatarEmoji: { fontSize: 40 },
  profileName: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 4,
  },
  profileSub: { fontSize: 13, color: Colors.textMuted },
  editWrap: { width: "80%", gap: 10, marginBottom: 8 },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    color: Colors.text,
    fontSize: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  avatarPicker: { paddingHorizontal: 20, marginBottom: 20 },
  avatarPickerLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 12,
    fontWeight: "600",
  },
  avatarRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  avatarOption: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatarOptionActive: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  avatarOptionText: { fontSize: 24 },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 6,
  },
  statNum: { fontSize: 22, fontWeight: "800", color: Colors.text },
  statLbl: { fontSize: 10, color: Colors.textMuted, textAlign: "center" },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },
  aboutCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  aboutText: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 22,
    marginBottom: 12,
  },
  aboutVerse: {
    fontSize: 12,
    color: Colors.primary,
    fontStyle: "italic",
    fontWeight: "600",
  },
  builtBy: { alignItems: "center", paddingVertical: 16 },
  builtByText: { fontSize: 12, color: Colors.textDim },
  builtByName: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.primary,
    marginTop: 2,
  },
});
