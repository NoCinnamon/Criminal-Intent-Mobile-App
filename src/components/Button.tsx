import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../theme";

const { theme } = useTheme();

export default function Button({
  buttonName,
  onPress,
}: {
  buttonName: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: theme.button }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: theme.buttonText }]}>
        {buttonName}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});
