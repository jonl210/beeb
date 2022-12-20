import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";

const Drawer = createDrawerNavigator();

const MainScreen = () => {
  return (
    <View>
      <Text>Main</Text>
    </View>
  );
};

const TestDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Test" component={MainScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="inverted" />
      <TestDrawer />
    </NavigationContainer>
  );
}
