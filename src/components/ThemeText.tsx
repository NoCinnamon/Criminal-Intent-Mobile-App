import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

export default function ThemeText({ text }: { text: string }) {
  const { theme } = useTheme();

  return (
    <View>
      <Text style={[styles.buttonText, { color: theme.buttonText }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: "bold",
  },
});
