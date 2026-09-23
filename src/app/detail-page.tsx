import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function formatDate(date: Date) {
  const week = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${week} ${month} ${date.getDate()} ${date.getFullYear()}`.toLocaleUpperCase();
}

export default function DetailPage() {
  // const dateOnButton = formatDate(new Date());     
  const [date, setDate] = useState( new Date() );
  const [showPicker, setShowPicker] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [title, setTitle] = useState("");
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }


  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.topLeft}>
          <View style={styles.imageBox}></View>
          <Pressable style={styles.cameraButton}>
            <Ionicons name="camera" size={28} color="#000" />
          </Pressable>
        </View>

        <View style={styles.titleArea}>
          <Text style={styles.title}>Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            placeholderTextColor="#9A9A9A"
            value={title}
            onChangeText={setTitle}
          ></TextInput>
        </View>
      </View>

      <Text style={styles.detailsTitle}>Details</Text>
      <TextInput
        style={styles.detailInput}
        placeholder="What happend?"
        placeholderTextColor="#9A9A9A"
      ></TextInput>

      <Pressable style={styles.button} onPress={toggleDatePicker}>
        <Text style={styles.buttonText}>{formatDate(date)}</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          mode='date'
          value={date}
          display='spinner'
          onValueChange={(_event, selectedDate) => {     // _ignore the event
            setDate(selectedDate);
            // setShowPicker(false);
          }}
          />
      )}
      {!showPicker && (
        <Pressable onPress={toggleDatePicker}></Pressable>
      )}

      <View style={styles.checkBoxArea}>
        <Checkbox
          style={styles.checkBox}
          value={isChecked}
          onValueChange={setChecked}
        />
        <Text style={styles.solvedText}>Solved</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={async () => {
          const storedAct = await AsyncStorage.getItem("criminalAct");
          let list = [];
          if (storedAct) {
            list = JSON.parse(storedAct);
          }
          const nextList = [
            ...list,                  // 必须有，'...list' copies every item already in list into the new array, then the new crime is added after those copies.
            {
              id: Date.now().toString(),
              title,
              date: new Date().toISOString(),
              solved: isChecked,
            },
          ];
          await AsyncStorage.setItem("criminalAct", JSON.stringify(nextList));
          router.back();
        }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
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

  titleArea: {
    flex: 1,
    marginLeft: 16,
  },

  title: {
    fontSize: 18,
    marginLeft: 16,
    marginTop: 90,
    fontWeight: "bold",
  },

  titleInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingVertical: 4,
    marginLeft: 16,
  },

  detailsTitle: {
    fontSize: 18,
    marginTop: 24,
    fontWeight: "bold",
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

  button: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#112255",
    paddingVertical: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
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
    color: "#000",
  },
});
