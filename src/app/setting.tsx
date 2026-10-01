import { StyleSheet, Text, View } from "react-native";
import ThemeButton from "../components/ThemeButton";
import { themes, useTheme } from "../theme";


export default function SettingPage() {
  const { theme, setTheme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.themeTitle, { color: theme.text }]}>Pick a Theme</Text>
      {themes.map((item) => (
        <ThemeButton
          key={item.name}
          name={item.name}
          onPress={() => setTheme(item)}
        />
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
});
