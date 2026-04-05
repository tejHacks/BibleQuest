/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  name: string;
  avatar: string;
  streak: number;
  lastOpened: string;
  points: number;
  versesLearnt: number;
};

const DEFAULT_USER: User = {
  name: "",
  avatar: "",
  streak: 1,
  lastOpened: new Date().toDateString(),
  points: 0,
  versesLearnt: 0,
};

export function useUser() {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem("biblequest_user");
      if (stored) {
        const parsed: User = JSON.parse(stored);
        const updated = checkStreak(parsed);
        setUser(updated);
        await AsyncStorage.setItem("biblequest_user", JSON.stringify(updated));
      }
    } catch (e) {
      console.log("Error loading user", e);
    } finally {
      setLoading(false);
    }
  };

  const checkStreak = (u: User): User => {
    const today = new Date().toDateString();
    const last = new Date(u.lastOpened).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (last === today) return u;
    if (last === yesterday) {
      return { ...u, streak: u.streak + 1, lastOpened: today };
    }
    return { ...u, streak: 1, lastOpened: today };
  };

  const saveUser = async (updates: Partial<User>) => {
    try {
      const updated = { ...user, ...updates };
      setUser(updated);
      await AsyncStorage.setItem("biblequest_user", JSON.stringify(updated));
    } catch (e) {
      console.log("Error saving user", e);
    }
  };

  const addPoints = async (pts: number) => {
    await saveUser({ points: user.points + pts });
  };

  const addVerse = async () => {
    await saveUser({ versesLearnt: user.versesLearnt + 1 });
  };

  return { user, loading, saveUser, addPoints, addVerse };
}
