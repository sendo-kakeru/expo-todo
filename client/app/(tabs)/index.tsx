import { useIsPending } from "@/hooks/useIsPending";
import { User } from "@repo/db";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Platform,
} from "react-native";

const API_BASE_URL = Platform.select({
  ios: "http://localhost:8787",
  android: "http://10.0.2.2:8787",
  default: "http://localhost:8787",
});

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const { isPending, startPending, stopPending } = useIsPending();

  async function handlePress() {
    startPending();
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      console.log(JSON.stringify(res));
      if (!res.ok) {
        console.log("ユーザー一覧の取得に失敗しました。");
        return;
      }
      const data: { users: User[] } = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.log("ユーザー取得中にエラー:", error);
      setUsers([]);
    } finally {
      stopPending();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Button
          title="ユーザーを取得する"
          onPress={handlePress}
          color="#841584"
        />
        {isPending ? (
          <Text style={styles.message}>ユーザーを取得中です…</Text>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.email}</Text>
              </View>
            )}
            contentContainerStyle={styles.listContent}
            style={styles.list}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  centerContent: {
    width: "100%",
    alignItems: "center",
  },
  message: {
    marginTop: 16,
    fontSize: 16,
  },
  list: {
    marginTop: 16,
    maxHeight: 300,
    width: "100%",
  },
  listContent: {
    alignItems: "center",
  },
  item: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    width: "90%",
  },
});
