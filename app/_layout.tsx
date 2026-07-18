import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer>
          <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Dashboard', title: 'Dashboard', headerShown: false }} />
          <Drawer.Screen name="camera" options={{ drawerLabel: 'Camera', title: 'Camera' }} />
          <Drawer.Screen name="contacts" options={{ drawerLabel: 'Contacts', title: 'Contacts' }} />
          <Drawer.Screen name="location" options={{ drawerLabel: 'Location', title: 'Location' }} />
          <Drawer.Screen name="clipboard" options={{ drawerLabel: 'Clipboard', title: 'Clipboard' }} />
          <Drawer.Screen name="settings" options={{ drawerLabel: 'Settings', title: 'Settings' }} />
          <Drawer.Screen name="previewSurway" options={{ drawerLabel: 'Preview Survey', title: 'Preview Survey' }} />
          <Drawer.Screen name="modal" options={{ drawerItemStyle: { display: 'none' } }} />
        </Drawer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
