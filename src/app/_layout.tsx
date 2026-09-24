import { Stack, router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#112255',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name='index'
        options={{ 
          title: 'Criminal Intent',
          unstable_headerRightItems: () => [                              // takes away the background of the pressable button
              {
                type: 'custom',
                hidesSharedBackground: true,
                element: (
                  <Pressable onPress={() => router.push('/detail-page')}>
                    <Ionicons name='add' size={28} color='#fff' />
                  </Pressable>
                ),
              },
            ],
        }}
      />
    </Stack>
  );
}

// const styles = StyleSheet.create({

// });
