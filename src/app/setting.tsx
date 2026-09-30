import { Pressable, StyleSheet, Text, View } from "react-native";
import { themes, useTheme } from "../theme";


export default function SettingPage() {
  const { theme, setTheme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.themeTitle, { color: theme.text }]}>Pick a Theme</Text>
      {themes.map((item) => (
        <Pressable
          key={item.name}
          style={styles.themeButton}
          onPress={() => setTheme(item)}
        >
          <Text style={[styles.themeButtonText, { color: theme.text }]}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 36,
    justifyContent: "center",
  },

  themeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom:16,
  },

  themeButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: 'transparent',
    shadowColor: "#fff",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },

  themeButtonText : {
    color: "#000",
    fontSize: 24,
  }
});
