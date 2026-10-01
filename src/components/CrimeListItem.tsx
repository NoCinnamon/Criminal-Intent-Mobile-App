import { View, Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";



export type CrimeAct = {
  id: string;
  title: string;
  date: string;
  solved: boolean;
};

export default function CrimeListItem( {crimeAct, onPress}:{crimeAct:CrimeAct, onPress:()=> void} ) {
  const { theme } = useTheme();
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text }]}>
          {crimeAct.title}
        </Text>
        <Text style={[styles.date, { color: theme.text }]}>
          {crimeAct.date}
        </Text>
      </View>
      {crimeAct.solved && (
        <MaterialCommunityIcons
          name="handcuffs"
          size={28}
          color={theme.text}
        />
      )}
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 24,
  },
  date: {
    fontSize: 18,
  },
});