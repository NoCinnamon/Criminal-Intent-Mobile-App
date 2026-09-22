import { Text, View, StyleSheet, FlatList } from "react-native";

const DATA = [
  { id: '1', title: 'Criminal Activity 4' },
  { id: '2', title: 'Criminal Activity 2' },
]

export default function Index() {
  return (
    
    <View style={styles.container}>
      <FlatList 
        data={DATA}
        renderItem={({item}) => <Text style={styles.activity}>{item.title}</Text> }
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

  activity: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});
