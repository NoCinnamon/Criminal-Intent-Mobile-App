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

        unstable_headerRightItems: () => [                              // takes away the background of the pressable button
          {
            type: 'custom',
            hidesSharedBackground: true,
            element: (
              <Pressable style={styles.icons} onPress={() => router.push('/setting-page')}>
                <Ionicons name='settings' size={28} color='#fff' />
              </Pressable>
            ),
          },
        ],
      }}
    >
      <Stack.Screen name='index'
        options={{ 
          title: 'Criminal Intent',
          unstable_headerLeftItems: () => [                              // takes away the background of the pressable button
            {
              type: 'custom',
              hidesSharedBackground: true,
              element: (
                <Pressable style={styles.icons} onPress={() => router.push('/detail-page')}>
                  <Ionicons name='add' size={28} color='#fff' />
                </Pressable>
              ),
            },
          ],
          
          unstable_headerRightItems: () => [                              // takes away the background of the pressable button
            {
              type: 'custom',
              hidesSharedBackground: true,
              element: (
                <Pressable style={styles.icons} onPress={() => router.push('/setting-page')}>
                  <Ionicons name='settings' size={28} color='#fff' />
                </Pressable>
              ),
            },
          ],
          
          
        }}
      />
      <Stack.Screen name='setting-page'
        options={{
          title:'Settings',
          unstable_headerRightItems: () => [],                          // empty header-right array, so the gear icon wont show on setting page
        }}/>

    </Stack>
  );
}

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'row',
    columnGap:20,
  },
});
