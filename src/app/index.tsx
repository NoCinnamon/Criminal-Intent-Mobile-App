import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { useCallback, useState } from 'react';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  type crimAct = {
    id: string;
    title: string;
    date:string;
    solved: boolean;
  }
  const [criminalAct, setCriminalAct] = useState<crimAct[]>([]);        // waht.....
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('criminalAct').then( (storedAct) => {
        if (storedAct) {
          setCriminalAct(JSON.parse(storedAct) );
        }
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={criminalAct}
        renderItem={({item}) => (
          <View style ={styles.criminalActRow}>
            <View style={styles.rowText}>
              <Pressable onPress={() => 
                router.push({
                  pathname: '/detail-page',
                  params: { id: item.id},
                })
              }>
                <Text style={styles.activity}>{item.title}</Text> 
                <Text style={styles.date}>{item.date}</Text>
              </Pressable>
            </View>
            {item.solved ? (
              <MaterialCommunityIcons name="handcuffs" size={28} color="#000" />
            ): null}
          </View>
        )}

        keyExtractor={(item) => item.id}>
      </FlatList>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  criminalActRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  rowText: {
    flex:1,
  },

  activity: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 24,
  },

  date: {
    fontSize: 18,
    color:'#000',
  }
});
