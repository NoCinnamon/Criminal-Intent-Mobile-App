import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Checkbox } from "expo-checkbox";
import * as Crypto from "expo-crypto";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "../components/Button";
import ThemeText from "../components/ThemeText";
import { useTheme } from "../theme";

function formatDate(date: Date) {
  const week = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${week} ${month} ${date.getDate()} ${date.getFullYear()}`.toLocaleUpperCase();
}

export default function Detail() {
  const { theme } = useTheme();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [userImage, setUserImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams<{ id?: string }>();
  useEffect(() => {
    if (!id) {
      return;
    }

    AsyncStorage.getItem("criminalAct").then((storedAct) => {
      if (!storedAct) {
        return;
      }
      const list = JSON.parse(storedAct);
      const item = list.find((crime: { id: string }) => crime.id === id);
      if (!item) {
        return;
      }

      setTitle(item.title);
      setUserImage(item.userImage);
      setDetails(item.details ?? "");
      setDate(new Date(item.date));
      setChecked(item.solved);
    });
  }, [id]);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      console.log(result); // assets is the array, and the first item’s uri is the file address
      setUserImage(result.assets[0].uri);
    } else {
      Alert.alert("You did not select any image.");
    }
  };

  const takePhoto = async () => {
    let getPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!getPermission.granted) {
      Alert.alert("Permission to access the camera is required.");
      return; // stops the camera from opening when the user says no.
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      setUserImage(result.assets[0].uri);
    }
  };

  const choosePhoto = () => {
    Alert.alert("Add a photo", undefined, [
      { text: "Use camera", onPress: takePhoto },
      { text: "Choose from library", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topArea}>
          <View style={styles.topLeft}>
            <View style={styles.imageBox}>
              {userImage ? (
                <Image source={{ uri: userImage }} style={styles.image} />
              ) : null}
            </View>
            <Pressable style={styles.cameraButton} onPress={choosePhoto}>
              <Ionicons name="camera" size={28} color={theme.text} />
            </Pressable>
          </View>

          <View style={styles.titleArea}>
            <ThemeText text="Title" />
            <TextInput
              style={[styles.titleInput, { color: theme.text }]}
              placeholder="Title"
              placeholderTextColor={theme.text}
              value={title}
              onChangeText={setTitle}
            ></TextInput>
          </View>
        </View>

        <ThemeText text="Detail" />
        <TextInput
          style={[styles.detailInput, { color: theme.text }]}
          placeholder="What happend?"
          placeholderTextColor={theme.text}
          value={details}
          onChangeText={setDetails}
        ></TextInput>

        <Button
          buttonName={formatDate(date)}
          onPress={toggleDatePicker}
        ></Button>

        {showPicker && (
          <DateTimePicker
            mode="date"
            value={date}
            display="spinner"
            onValueChange={(_event, selectedDate) => {
              setDate(selectedDate);
            }}
          />
        )}
        {!showPicker && <Pressable onPress={toggleDatePicker}></Pressable>}

        <View style={styles.checkBoxArea}>
          <Checkbox
            style={styles.checkBox}
            value={isChecked}
            onValueChange={setChecked}
            color={theme.button}
          />
          <Text style={[styles.solvedText, { color: theme.text }]}>Solved</Text>

        </View>

        <Button
          buttonName="Save"
          onPress={async () => {
            const storedAct = await AsyncStorage.getItem("criminalAct"); //getItem is a method on the AsyncStorage object
            let list = [];
            if (storedAct) {
              list = JSON.parse(storedAct);
            }
            const nextList = [
              ...list, // 必须有，'...list' copies every item already in list into the new array, then the new crime is added after those copies.
              {
                id: Crypto.randomUUID(),
                title,
                userImage,
                details,
                date: new Date().toISOString(),
                solved: isChecked,
              },
            ];
            await AsyncStorage.setItem("criminalAct", JSON.stringify(nextList));
            Alert.alert("Saved");
          }}
        ></Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  topArea: {
    flexDirection: "row",
    width: "100%",
  },

  topLeft: {
    alignItems: "flex-end",
  },

  cameraButton: {
    marginTop: 8,
    width: 100,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#E4E4E4",
    alignItems: "center",
    justifyContent: "center",
  },

  imageBox: {
    width: 120,
    height: 120,
    backgroundColor: "#D3D3D3",
  },

  image: {
    width: 120,
    height: 120,
  },

  titleArea: {
    flex: 1,
    marginLeft: 16,
  },

  titleInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingVertical: 4,
    marginLeft: 16,
  },

  detailInput: {
    marginTop: 8,
    height: 100,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    padding: 8,
    fontSize: 16,
    textAlignVertical: "top",
  },

  checkBoxArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },

  checkBox: {
    marginRight: 8,
  },

  solvedText: {
    fontSize: 16,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
});
