import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CrimeListItem, { CrimeAct } from "../components/CrimeListItem";
import { useTheme } from "../theme";

export default function Index() {
  const [criminalAct, setCriminalAct] = useState<CrimeAct[]>([]); // waht.....
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("criminalAct").then((storedAct) => {
        if (storedAct) {
          setCriminalAct(JSON.parse(storedAct));
        }
      });
    }, []),
  );

  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={criminalAct}
        renderItem={({ item }) => (
          <CrimeListItem
            crimeAct={item}
            onPress={() =>
              router.push({
                pathname: "/detail",
                params: { id: item.id },
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
