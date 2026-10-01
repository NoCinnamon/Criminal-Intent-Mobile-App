import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../theme";

type ThemeButtonProps = {
  name: string;
  onPress: () => void;
};

export default function ThemeButton({ name, onPress }: ThemeButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={[styles.buttonText, { color: theme.text }]}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: "transparent",
    shadowColor: "#fff",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  buttonText: {
    fontSize: 24,
  },
});
